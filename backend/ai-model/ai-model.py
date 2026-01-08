from sklearn.preprocessing import StandardScaler
from sklearn.metrics import r2_score
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np

X=pd.read_csv('creditcard.csv')
base_time = np.datetime64("2022-05-17T08:00:00")
X["Timestamp"] = base_time + pd.to_timedelta(X["Time"], unit="s")
print(X.head(5))

#mapping the status as normal or fraud as in class column it's just 0 or 1
X["Status"] = X["Class"].map({0: "Normal", 1: "Fraud"})
print(X.head(4))