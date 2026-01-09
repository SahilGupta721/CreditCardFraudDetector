# import joblib 
# import pandas as pd
# model=joblib.load('backend/ai_model/fraud_model.pkl')
# scale=joblib.load('backend/ai_model/scale.pkl')

# df = pd.DataFrame([
#     {
#         "Time": 0, "V1": -1.35, "V2": -0.07, "V3": 2.53, "V4": 1.37, "V5": -0.33,
#         "V6": 0.46, "V7": 0.23, "V8": 0.09, "V9": 0.36, "V10": 0.09,
#         "V11": -0.55, "V12": -0.61, "V13": -0.99, "V14": -0.31,
#         "V15": 1.46, "V16": -0.47, "V17": 0.20, "V18": 0.02,
#         "V19": 0.40, "V20": 0.25, "V21": -0.01, "V22": 0.27,
#         "V23": -0.11, "V24": 0.06, "V25": 0.12, "V26": -0.18,
#         "V27": 0.13, "V28": -0.02, "Amount": 149.62,
#         "Timestamp": pd.Timestamp("2022-05-17T08:00:00Z"),
#         "UserID": "USR-00001",
#         "Merchant": "Amazon",
#         "Location": "Toronto, ON",
#         "ActualClass": 0
#     },
#     {
#         "Time": 1, "V1": 1.19, "V2": 0.26, "V3": 0.16, "V4": 0.44, "V5": 0.06,
#         "V6": -0.08, "V7": -0.07, "V8": 0.08, "V9": -0.25, "V10": -0.16,
#         "V11": 1.61, "V12": 1.06, "V13": 0.48, "V14": -0.14,
#         "V15": 0.63, "V16": 0.46, "V17": -0.11, "V18": -0.18,
#         "V19": -0.14, "V20": -0.06, "V21": -0.22, "V22": -0.63,
#         "V23": 0.10, "V24": -0.33, "V25": 0.16, "V26": 0.12,
#         "V27": -0.00, "V28": 0.01, "Amount": 2.69,
#         "Timestamp": pd.Timestamp("2022-05-17T08:00:01Z"),
#         "UserID": "USR-00002",
#         "Merchant": "Starbucks Coffee",
#         "Location": "New York, NY",
#         "ActualClass": 0
#     },
#     {
#         "Time": 2, "V1": -2.4, "V2": 1.9, "V3": -3.8, "V4": 2.5, "V5": -1.6,
#         "V6": -0.8, "V7": 2.1, "V8": -0.5, "V9": -2.4, "V10": -3.1,
#         "V11": 2.9, "V12": -4.5, "V13": -0.9, "V14": -6.1,
#         "V15": 0.1, "V16": -3.7, "V17": -4.9, "V18": -1.8,
#         "V19": 0.3, "V20": 1.9, "V21": 0.8, "V22": -0.6,
#         "V23": 0.2, "V24": -1.1, "V25": 0.4, "V26": -0.3,
#         "V27": 0.6, "V28": -0.2, "Amount": 1899.99,
#         "Timestamp": pd.Timestamp("2022-05-17T08:00:02Z"),
#         "UserID": "USR-00003",
#         "Merchant": "Apple Store",
#         "Location": "Los Angeles, CA",
#         "ActualClass": 1
#     }
# ])
# X_pred = df.drop(
#     columns=["Timestamp", "UserID", "Merchant", "Location", "ActualClass"],
#     errors="ignore"
# )
# X_pred[["Time", "Amount"]] = scale.transform(
#     X_pred[["Time", "Amount"]]
# )

# df["PredictedClass"] = model.predict(X_pred)
# df["FraudProbability"] = model.predict_proba(X_pred)[:, 1]
# print(df)