import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

data = pd.read_csv('carbon_footprint_dataset_balanced.csv')
print(data.head())

X = data[['Material', 'Weight (kg)', 'Transport Distance (km)', 'Region']]
Y = data['Net CO₂ Saved (kg)']

print(X.shape, Y.shape)

categorical_features = ['Material', 'Region']
numeric_features = ['Weight (kg)', 'Transport Distance (km)']

# Transformer
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(drop='first'), categorical_features),
        ('num', StandardScaler(), numeric_features)
    ])

print(X.head())

# Histograms for distribution of features
sns.histplot(X['Weight (kg)'], kde=True)
plt.title("Distribution of Weight")
plt.show()
sns.histplot(X['Material'], kde=True)
plt.title("Distribution of materials")
plt.show()
sns.histplot(X['Transport Distance (km)'], kde=True)
plt.title("Distribution of transporting distances")
plt.show()
sns.histplot(X['Region'], kde=True)
plt.title("Distribution of regions")
plt.show()

# Bar plots for categorical features
sns.barplot(x='Material', y='Net CO₂ Saved (kg)', data=data)
plt.title("Avg CO₂ Saved by Material")
plt.show()

# Avg CO2 saved by Region
sns.barplot(x='Region', y='Net CO₂ Saved (kg)', data=data)
plt.title("Avg CO₂ Saved by Region")
plt.show()

# Scatterplots
sns.scatterplot(x='Weight (kg)', y='Net CO₂ Saved (kg)', data=data)
plt.title("Weight vs CO₂ Saved")
plt.show()

sns.scatterplot(x='Transport Distance (km)', y='Net CO₂ Saved (kg)', data=data)
plt.title("Transport Distance vs CO₂ Saved")
plt.show()

# Heat maps for correlation
numeric_cols = data.select_dtypes(include='number')
corr = numeric_cols.corr()

sns.heatmap(corr, annot=True, cmap='coolwarm')
plt.title("Correlation Matrix")
plt.show()

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=2, stratify=Y)

from sklearn.linear_model import LinearRegression

lr_model = Pipeline(steps=[('preprocessor', preprocessor),
                           {'regressor': LinearRegression()}])
lr_model.fit(X_train, Y_train)

from sklearn import svm

svr_model = Pipeline(steps=[("preprocessor", preprocessor),
                            ("svr_regressor", svm.SVR(kernel="rbf"))])
svr_model.fit(X_train, Y_train)

from sklearn.tree import DecisionTreeRegressor

dt_modle = Pipeline(steps=[("preprocessor", preprocessor),
                     {"decision_tree_regressor", DecisionTreeRegressor(random_state=2)}])
dt_modle.fit(X_train, Y_train)

from xgboost import XGBRegressor

xbg_model = Pipeline(steps=[('preprocessor', preprocessor),
                            {'xbg_regressor', XGBRegressor()}])
xbg_model.fit(X_train, Y_train)




