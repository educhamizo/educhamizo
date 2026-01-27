db.epocas.find({})

// Muestra el nombre y las sedes anteriores de las hermandades fundadas entre durante el siglo XVI y que se hayan establecido alguna vez en la 
// calle Antonio Susillo

db.hermandades.find({fundacion:{$gte:1500,$lte:1600},sedes_anteriores:{$regex:/Antonio Susillo/i}},{_id:1,sedes_anteriores:1});

// Los distintos roles que quedan registrados en la coleccion épocas

db.epocas.distinct("personajes_relevantes.rol");

// Devolver cuántas personas pertenecen a La Macarena y, como mínimo, a otra hermandad más

db.personas.countDocuments({"hermano de.hermandad":/La Macarena/i,"hermano de.1": {$exists:true}});

// Para la hermandad más reciente, devolver nombre y personas hermanas

db.hermandades.find({},{_id:1,personas_hermanas:1}).sort({fundacion:-1}).limit(1);

// Devolver los datos para aquellas épocas con personajes cuyos roles terminaran en "-or"

db.epocas.find({"personajes_relevantes.rol":/or$/i});

// A todas las personas que pertenezcan a más de una hermandad, añade un campo llamado jartible_cofrade con el valor 

db.personas.updateMany({"hermano de.1":{$exists:true}},{$set:{jartible_cofrade:true}});

// Para la era de la transición, busca el personaje "Curro" y cambia su estado a null, además de actualizar su rol a "Mascota Exposición Universal de
// Sevilla".

db.epocas.updateOne({_id:"Era de la Transición","personajes_relevantes.nombre":"Curro"},{$set:{"personajes_relevantes.$.estado":null,
"personajes_relevantes.$.rol":"Mascota Exposición Universal de Sevilla"}});

// Retroceder la línea de tiempo para la Edad Antigua en 100 años y añadir un nuevo hito 

db.epocas.updateMany({_id: "Edad Antigua"},{$inc: {año_inicio:-100},$push: {hitos_clave:"Desarrollo de la civilización Tartesia"}});

// Devolver el nombre de las personas que estén apuntadas a 3 hermandades, entre ellas Las Cigarreras y El Amor. En esta última deberá
// tener número de hermano menor a 50, y su tercera hermandad no podrá ser ni La Macarena ni El Silencio

db.personas.find({$and: [{"hermano de": { $size: 3 } },{"hermano de.hermandad": {$all: [/Las Cigarreras/i, /El Amor/i]}},
{"hermano de": {$elemMatch: {"hermandad": /El Amor/i,"numero_hermano": {$lt: 50}}}},
{"hermano de.hermandad": {$nin: [/La Macarena/i, /El Silencio/i]}}]},{_id:false,nombre:true});

// Añadir (sin duplicados) a las épocas que comiencen por "Edad", y que no tengan personaje relevante con rol "Rey", 
// un personaje de nombre unknown y categoría "rey"

db.epocas.updateMany({_id: /^Edad/ ,"personajes_relevantes.rol": { $ne: "Rey"}},
{$addToSet: {"personajes_relevantes": {"nombre": "unknown","rol": "Rey"}}});

// El número de personas que hay entre las hermandades de San Gonzalo y La Macarena con antigüedad menor a 50

db.personas.aggregate([
    {$unwind: "$hermano de" },
    {$match: {$and: [{ "hermano de.hermandad": { $in: [/San Gonzalo/i, /La Macarena/i] } },{ "hermano de.numero_hermano": { $lt: 50 } }]}},
    {$count: "resultado"}
    ]);

// Las distintas hermandades que figuran en la colección personas, más concretamente las que tienen en su nombre un artículo

db.personas.aggregate([
    {$unwind: "$hermano de"},
    {$match: {$or: [{"hermano de.hermandad": /^La /i},{"hermano de.hermandad": /^El /i}]}},
    {$group: { _id: "$hermano de.hermandad"}},
    {$project: {_id: 1}}
    ]);
  
// Los distintos roles que quedan registrados en la coleccion épocas y la cantidad que hay de cada uno, quedándonos con el segundo y tercer rol más
// repetido

db.epocas.aggregate([
    {$unwind:"$personajes_relevantes"},
    {$group: {_id:"$personajes_relevantes.rol", total:{$sum: 1}}},
    {$sort: {total: -1 }},
    {$skip: 1},
    {$limit: 2}
    ]);

// Devuelve el porcentaje de hermanos de cada hermandad con respecto al total de personas registradas, además de los nombres de cada hermano
// para cada hermandad

db.personas.aggregate([
    {$unwind:"$hermano de"},
    {$group: {_id:"$hermano de.hermandad",total_hermanos:{$sum: 1},lista_nombres:{$push: "$nombre"}}},
    {$project: {hermandad:"$_id",total_hermanos:1,lista_nombres:1,porcentaje:{$multiply: [{$divide: ["$total_hermanos",15]},100]},_id:0}}
    ]);

// Calcular el siglo de fundación de cada hermandad y luego contar cuántas hay por cada siglo

db.hermandades.aggregate([
    {$match: {fundacion:{$ne: null }}},
    {$project: {siglo:{$ceil:{$divide: ["$fundacion",100]}},nombre:"$_id"}},
    {$group: {_id:"$siglo",total:{$sum: 1},nombres:{$push: "$nombre"}}}
    ]);