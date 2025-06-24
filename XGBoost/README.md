# Predicción de Ingresos (>50K) con XGBoost en R

Este proyecto construye un modelo de clasificación binaria para predecir si una persona gana más de $50,000 anuales utilizando datos del censo (Adult Dataset de OpenML).

## 📁 Dataset

- Fuente: OpenML ID 1590
- Variables: edad, educación, ocupación, estado civil, etc.
- Target: ingreso anual >$50K

## ⚙️ Herramientas

- Lenguaje: R
- Librerías: `xgboost`, `dplyr`, `ggplot2`, `OpenML`

## 📊 Resultados

- **Precisión en test**: 82.9%
- **AUC ROC**: 0.88
- Variables más influyentes: estado civil, educación, ocupación

## 📈 Visualizaciones

- Histograma de ingresos por edad
- Comparativa de ingresos por nivel educativo

## ▶️ Cómo correr el proyecto

1. Instala las librerías requeridas
2. Ejecuta el archivo `PrediccionIngresos.Rmd`
3. Se generará un PDF o HTML con el análisis completo

---

¡Puedes usar este README directamente o pedir que te lo personalice más!

¿Quieres que te cree el archivo o lo exporte por ti?

