class ErrorExtender extends Error { // "Eroor" from app.js
    // error-> object -> message,stack, 
    constructor(message, statusCode) { 
      //  child constructor parent constructor should be calledfirst    
      // object => error
      super(message); // super => referencing to "Error" in app.js 
      // error=> statucode ,status
      this.statusCode = statusCode;
      statusCode = "" + statusCode;
      this.status = `${statusCode.startsWith('4') ? "client error" : "server error"}`;
      //  error operational
      // {}
      this.isknown = true;
    }
  }
  module.exports = ErrorExtender;

 
  // all client error starts with 4 like 404 etc 
  // all server error starts with 5 like 500 etc 