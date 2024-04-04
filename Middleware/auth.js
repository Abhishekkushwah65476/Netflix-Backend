const jwt = require('jsonwebtoken')
// const User =require('../Middleware/auth')

module.exports = middlewares = {
    authenticateToken: async (req, res, next) => {
      try {
        const token = req.headers["token"];
        // console.log(req.params)
      
        if (!token) {
          return res.status(404).json
          ({ 
              success:false,
              message:"user not login",
              data:[]
          });
        }
  
        try {
          const decoded = jwt.verify(token, process.env.securitykey);
          req.user = decoded;
          //  console.log("decoded",decoded);
        } catch (err) {
          
          let error_code=461
          
          return res.status(error_code).json
          ({ 
              success:false,
              message:err.message,
              data:[]
          });
        }
        
        return next();
  
      } catch (err) {
  
        return response.returnFalse(req, res, res.translate('validation_error_message'), {err});
        
      }
    },
  
  };