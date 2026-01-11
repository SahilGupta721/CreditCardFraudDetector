# AI-ML Project: Credit Card Fraud Detection

![Python](https://img.shields.io/badge/Python-3.10+-blue)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.2.2-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## **Overview**

This project implements a **Credit Card Fraud Detection System** using a machine learning approach. The system detects fraudulent transactions in a highly imbalanced dataset using a **Random Forest Classifier** with threshold tuning for optimal precision and recall.

The model is trained on the publicly available [Credit Card Fraud dataset](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud), which contains **284,807 transactions** with **28 anonymized features (V1–V28)**, `Time`, `Amount`, and a target `Class` (0 = normal, 1 = fraud).

---

## **Project Structure**

```
AI-ML-Project/
│
├─ backend/
│   ├─ ai_model/
│   │   ├─ ai-model.py           # Python script to train and evaluate the model
│   │   ├─ fraud_model.pkl       # Serialized trained model (~361 MB)
│   │   ├─ scale.pkl             # StandardScaler for preprocessing
│   │   └─ creditcard.csv        # Sample dataset for testing
│   ├─ controller/
│   │   └─ transaction.py        # Handles transaction processing
│   ├─ core/
│   │   └─ database.py           # Database connection utility
│   ├─ routes/
│   │   └─ transaction_routes.py # API endpoints for transactions
│   └─ main.py                   # FastAPI main entrypoint
│
├─ frontend/
│   ├─ src/
│   │   └─ app/                  # React components
│   ├─ node_modules/
│   └─ package.json
│
└─ .gitignore
```

---

## **Model Details**

- **Algorithm:** Random Forest Classifier  
- **Features:** 28 PCA components (V1–V28), `Time`, `Amount`  
- **Target:** `Class` (0 = Normal, 1 = Fraud)  
- **Preprocessing:** StandardScaler for normalization  
- **Imbalanced Handling:** SMOTEENN for oversampling minority class  
- **Evaluation Metrics:** Precision, Recall, F1-score

**Confusion Matrix (Threshold 0.2)**:
```
[[56857    7]
 [   15    83]]
```

---

## **Setup & Installation**

1. Clone the repository:
```bash
git clone https://github.com/SahilGupta721/AI-ML-Project.git
cd AI-ML-Project
```

2. Set up the Python virtual environment:
```bash
python -m venv virtual-env
source virtual-env/Scripts/activate   # Windows
# or
source virtual-env/bin/activate       # Mac/Linux
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the model script for evaluation or training:
```bash
cd backend/ai_model
python ai-model.py
```

---

## **Usage**

- **Loading the model in Python**:
```python
import joblib

model = joblib.load('fraud_model.pkl')
scaler = joblib.load('scale.pkl')
```

- **Predicting on new transaction data**:
```python
import pandas as pd

# Load new transaction data
new_data = pd.read_csv('new_transactions.csv')
new_scaled = scaler.transform(new_data)
predictions = model.predict(new_scaled)
```

- **API Integration**: Use the FastAPI backend to expose endpoints for predictions. The `transaction_routes.py` handles requests.

---

## **Notes**

- The dataset is highly imbalanced; threshold tuning is recommended for precision/recall trade-off.
- Large files (`fraud_model.pkl`) may exceed GitHub file limits; consider using Git LFS.
- The project uses Python 3.10+, Scikit-Learn, Imbalanced-learn, and FastAPI.

---

## **License**

This project is licensed under the MIT License.

---

## **References**
- [Credit Card Fraud Detection Dataset - Kaggle](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud)
- [Scikit-learn Documentation](https://scikit-learn.org/stable/)
- [Imbalanced-learn Documentation](https://imbalanced-learn.org/stable/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

