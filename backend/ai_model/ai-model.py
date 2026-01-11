from sklearn.preprocessing import StandardScaler
from imblearn.combine import SMOTEENN
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score
import pandas as pd
import numpy as np
import joblib

# Load data
X = pd.read_csv("creditcard.csv")

# Add synthetic fields for dashboard realism
base_time = np.datetime64("2022-05-17T08:00:00")
X["Timestamp"] = base_time + pd.to_timedelta(X["Time"], unit="s")
X["Status"] = X["Class"].map({0: "Normal", 1: "Fraud"})

n_rows = len(X)
X["UserID"] = ["USR-" + str(i + 1).zfill(5) for i in range(n_rows)]

merchants = ["Starbucks Coffee", "Electronics World", "Amazon", "Walmart", "Apple Store"]
locations = ["New York, NY", "Seattle, WA", "Los Angeles, CA", "Toronto, ON", "London, UK"]

X["Merchant"] = np.random.choice(merchants, size=n_rows)
X["Location"] = np.random.choice(locations, size=n_rows)

# Target
y = X["Class"]

# Drop non-ML columns
X = X.drop(["Timestamp", "Status", "UserID", "Merchant", "Location", "Class"], axis=1)

# Stratified split (keep real imbalance in test set)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Scale numeric features
scale = StandardScaler()
scale.fit(X_train[["Time", "Amount"]])
X_train[["Time", "Amount"]] = scale.transform(X_train[["Time", "Amount"]])
X_test[["Time", "Amount"]] = scale.transform(X_test[["Time", "Amount"]])

# Balance only training data
smote_enn = SMOTEENN(random_state=42)
X_train_res, y_train_res = smote_enn.fit_resample(X_train, y_train)

# Train model
model = RandomForestClassifier(
    n_estimators=2000,
    random_state=42,
    n_jobs=-1,
    class_weight="balanced"
)
model.fit(X_train_res, y_train_res)

# Probabilities
y_prob = model.predict_proba(X_test)[:, 1]

# Tune threshold
print("\nThreshold tuning:")
for t in [0.005, 0.01, 0.03, 0.05, 0.1, 0.2]:
    preds = (y_prob > t).astype(int)
    p = precision_score(y_test, preds, zero_division=0)
    r = recall_score(y_test, preds)
    f = f1_score(y_test, preds)
    print(f"t={t:<6} flagged={preds.sum():<6} precision={p:.3f} recall={r:.3f} f1={f:.3f}")

# Choosing a  threshold
THRESHOLD = 0.2
y_pred_class = (y_prob > THRESHOLD).astype(int)

# Final evaluation
cm = confusion_matrix(y_test, y_pred_class)
print("\nConfusion Matrix:\n", cm)

precision = precision_score(y_test, y_pred_class, zero_division=0)
recall = recall_score(y_test, y_pred_class)
f1 = f1_score(y_test, y_pred_class)

print(f"\nFinal @ {THRESHOLD}: Precision={precision:.4f}, Recall={recall:.4f}, F1={f1:.4f}")

# Save artifacts
joblib.dump(model, "fraud_model.pkl")
joblib.dump(scale, "scale.pkl")
