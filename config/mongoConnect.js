/**
 * ========================
 * 
 * CONFIG DE CONEXIÓN
 * 
 * ========================
 */

 const URI = "mongodb://localhost/ingles";

/**
 * ========================
 * 
 * CONFIG PUERTO
 * 
 * ========================
 */

 const PORT = process.env.PORT || 3001;

    module.exports = {
        URI, 
        PORT
    }