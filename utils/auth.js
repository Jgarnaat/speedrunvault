const withAuth = (req, res, next) => {
    // If the user is not logged in, the request will go to defined login route 
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;