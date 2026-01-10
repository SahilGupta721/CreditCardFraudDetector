from sklearn.preprocessing import StandardScaler
from imblearn.combine import SMOTEENN
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score
import joblib

X=pd.read_csv('creditcard.csv')
base_time = np.datetime64("2022-05-17T08:00:00")
X["Timestamp"] = base_time + pd.to_timedelta(X["Time"], unit="s")

#mapping the status as normal or fraud as in class column it's just 0 or 1
X["Status"] = X["Class"].map({0: "Normal", 1: "Fraud"})

#Generating userID
n_rows = len(X)
X["UserID"] = ["USR-" + str(i+1).zfill(5) for i in range(n_rows)]

merchants = ["Starbucks Coffee", "Electronics World", "Amazon", "Walmart", "Apple Store"]
locations = ["New York, NY", "Seattle, WA", "Los Angeles, CA", "Toronto, ON", "London, UK"]

# adding columns like Location and Merchant
X["Merchant"] = np.random.choice(merchants, size=n_rows)
X["Location"] = np.random.choice(locations, size=n_rows)

#making model ready to train
y=X['Class']

X=X.drop(['Timestamp', 'Status', 'UserID', 'Merchant', 'Location','Class'],axis=1)

X_train,X_test, y_train, y_test=train_test_split(X,y,random_state=42,test_size=0.2)

# Scaling data
scale=StandardScaler()
scale.fit(X_train[['Time','Amount']])
X_train[["Time", "Amount"]] = scale.transform(X_train[["Time", "Amount"]])
X_test[["Time", "Amount"]] = scale.transform(X_test[["Time", "Amount"]])

#Oversampling the data
smote_enn = SMOTEENN(random_state=42)

X_train_res, y_train_res = smote_enn.fit_resample(X_train, y_train)

model=RandomForestClassifier(
    n_estimators=2000,   
    random_state=42,
    n_jobs=-1,
    class_weight="balanced" )
model.fit(X_train_res,y_train_res)

# Fraud probability (Risk Score)
y_pred_proba_normal = model.predict_proba(X_test)[:, 0]
y_pred_proba_fraud = model.predict_proba(X_test)[:, 1]

# Convert probability → class
y_pred_class = (y_pred_proba_fraud > 0.2).astype(int)
# Confusion matrix
cm = confusion_matrix(y_test, y_pred_class)
print("Confusion Matrix:\n", cm)

# Precision, Recall, F1
precision = precision_score(y_test, y_pred_class)
recall = recall_score(y_test, y_pred_class)
f1 = f1_score(y_test, y_pred_class)

print(f"Precision: {precision:.4f}, Recall: {recall:.4f}, F1: {f1:.4f}")

# Saving  trained model
joblib.dump(model, "fraud_model.pkl")

# Saving the scale too
joblib.dump(scale, "scale.pkl")
