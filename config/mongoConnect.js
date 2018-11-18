
/**
 * ========================
 * 
 * CONFIG PUERTO
 * 
 * ========================
 */

 const PORT = process.env.PORT || 3000;

   



/**
 * ========================
 * 
 * ENTORNO
 * 
 * ========================
 */


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * ========================
 * 
 * CONFIG DB
 * 
 * ========================
 */

     URI = "mongodb://juanDev:sistemas-2018@ds151393.mlab.com:51393/ingles";

module.exports = {
   PORT,
    URI
}

