"""
The motive of make_prediction() to generate predicted values from some already existed data in MongoDB, so once we got the predicted values that
output gonna be used for our frontend dashboard, since predicted values are already stored inside collection so we don't 
wanna insert same documents again, instead we get all documents to populate frontend

"""
import pandas as pd
import joblib
from core.database import database_transaction_pred, database_transaction_raw
from fastapi import UploadFile
from fastapi.responses import StreamingResponse
from io import BytesIO
from fastapi.responses import StreamingResponse

# Load model & scaler once
model = joblib.load("ai_model/fraud_model.pkl")
scale = joblib.load("ai_model/scale.pkl")

def make_predictions():
    docs = list(database_transaction_raw.find({}))
    if not docs:
        return []

    df = pd.DataFrame(docs)

    features = ['Time'] + [f'V{i}' for i in range(1,29)] + ['Amount']
    X_new = df[features]
    X_new[['Time','Amount']] = scale.transform(X_new[['Time','Amount']])

    y_pred_proba_fraud = model.predict_proba(X_new)[:, 1]
    #When the proability is more than 0.5 we will flag as fraud in terms of credit card transaction
    y_pred_class = (y_pred_proba_fraud > 0.5).astype(int)

    df['PredictedClass'] = y_pred_class
    df['FraudProbability'] = y_pred_proba_fraud

    # Storing predictions 
    #database_transaction_pred.insert_many(df.to_dict(orient="records"))

    # Return relevant fields for dashboard
    return df[["UserID", "Merchant", "Amount", "PredictedClass", "FraudProbability"]].to_dict(orient="records") #converts dataframe into JSON format

async def file_pred(file:UploadFile):
    
    content=await file.read()
    df=pd.read_excel(BytesIO(content))
    features = ['Time'] + [f'V{i}' for i in range(1,29)] + ['Amount']
    X_new = df[features]
    X_new[['Time','Amount']] = scale.transform(X_new[['Time','Amount']])

    y_pred_proba_fraud = model.predict_proba(X_new)[:, 1]
    #When the proability is more than 0.5 we will flag as fraud in terms of credit card transaction
    y_pred_class = (y_pred_proba_fraud > 0.5).astype(int)

    df['PredictedClass'] = y_pred_class
    df['FraudProbability'] = y_pred_proba_fraud
    output = BytesIO()
    df.to_excel(output, index=False)
    output.seek(0)  
    
    #Calculating KPIs
    
    total_transactions = len(df)
    fraud_count = int((df['PredictedClass'] == 1).sum())
    fraud_rate = round((fraud_count / total_transactions) * 100, 2)
    
    #Sending file to the frontend

    #temporarily saves Pandas DataFrame to disk so another API endpoint can use
    df.to_pickle("temp_last_prediction.pkl")
    return {
        "kpis": {
            "total_transactions": total_transactions,
            "fraud_count": fraud_count,
            "fraud_rate": fraud_rate,
            "model_version": "v1.0.0-rf-smote"
        }

}

def download_prediction():
    df = pd.read_pickle("temp_last_prediction.pkl")

    output = BytesIO()
    df.to_excel(output, index=False)
    output.seek(0)

    return StreamingResponse(
        output,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=predicted_transactions.xlsx"}
    )