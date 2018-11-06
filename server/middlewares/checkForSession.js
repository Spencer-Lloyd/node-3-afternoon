// figure out what module. is and breakdown the function formating
module.exports = function( req, res, next ) {
    const { session } = req;
  
    if ( !session.user ) {
      session.user = { username: '', cart: [], total: 0.00 };
    } 
    
    next();
  };