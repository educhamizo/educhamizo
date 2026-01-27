# Proyecto Final: Gestión de Hermandades y Épocas Históricas

Este repositorio contiene la base de datos de mi proyecto de fin de módulo, enfocado en el mundo cofrade y su contexto histórico. El trabajo se divide en dos partes: una implementación relacional en **MySQL** y otra no relacional en **MongoDB (NoSQLBooster)**.

## 💾 Parte 1: MySQL
El diseño está pensado para controlar no solo los datos básicos de las hermandades, sino también su evolución histórica y la participación real de las personas en las procesiones.

### Puntos clave del desarrollo:
* **Lógica de División:** He resuelto consultas complejas de tipo "Para todo" (como encontrar sedes que han albergado a todas las hermandades de un tipo) usando doble `NOT EXISTS`.
* **Consultas de Agregación:** Uso avanzado de `GROUP BY` y `HAVING` para filtrar hermandades por cuotas medias y conteos de hermanos.
* **Control de Máximos:** Implementación de subconsultas correlacionadas para sacar registros específicos (como el hermano con el número más alto de cada corporación).
* **Vistas:** He creado vistas con `LEFT JOIN` para asegurar que las sedes se muestren aunque no tengan hermandades asignadas actualmente.

## 🍃 Parte 2: MongoDB (NoSQL)
Aquí he trabajado con estructuras de documentos anidados, tratando de aprovechar la flexibilidad de los arrays para los hitos y los personajes relevantes.

### Lo más destacado:
* **Consultas en Arrays:** Filtrado específico con `$elemMatch`, `$size` y `$all` para manejar las listas de hermanos y sedes anteriores.
* **Agregaciones (Pipelines):** Uso de `$unwind` para desglosar arrays de personajes y volver a agrupar con `$group` para sacar estadísticas por rol o estado.
* **Doble Negación en NoSQL:** Para las consultas de "todos los elementos del array deben cumplir X", he aplicado la lógica de `$not` con `$elemMatch` y `$exists`.
* **Proyección de Índices:** Uso de `$slice` y `$arrayElemAt` para obtener posiciones exactas dentro de los arrays (como la última sede conocida).

## 🛠️ Cómo usar este repo
1. **MySQL:** Importar el `.sql` adjunto. El script ya incluye los `ALTER TABLE` para las restricciones y el `INSERT` de datos de prueba.
2. **MongoDB:** Las consultas están diseñadas para ejecutarse en NoSQLBooster sobre las colecciones de `epocas`, `hermandades` y `personas`.
