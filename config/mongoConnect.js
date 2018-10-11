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

 const PORT = process.env.PORT || 3000;

    module.exports = {
        URI, 
        PORT
    }