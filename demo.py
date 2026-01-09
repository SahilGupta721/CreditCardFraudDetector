import pandas as pd
import joblib
from backend.core.database import database_transaction_pred, database_transaction_raw

# Load model & scaler once
model = joblib.load("backend/ai_model/fraud_model.pkl")
scale = joblib.load("backend/ai_model/scale.pkl")

def get_predictions():
    docs = list(database_transaction_raw.find({}))
    if not docs:
        return []

    df = pd.DataFrame(docs)

    features = ['Time'] + [f'V{i}' for i in range(1,29)] + ['Amount']
    X_new = df[features]
    X_new[['Time','Amount']] = scale.transform(X_new[['Time','Amount']])

    y_pred_proba_fraud = model.predict_proba(X_new)[:, 1]
    y_pred_class = (y_pred_proba_fraud > 0.5).astype(int)

    df['PredictedClass'] = y_pred_class
    df['FraudProbability'] = y_pred_proba_fraud

    # Store predictions
    database_transaction_pred.insert_many(df.to_dict(orient="records"))

    # Return relevant fields for dashboard
    return df[["UserID", "Merchant", "Amount", "PredictedClass", "FraudProbability"]].to_dict(orient="records")
print(get_predictions())