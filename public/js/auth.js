// Middleware to protect pages
function ensureAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // User is authenticated, continue
    }
    res.redirect("/login"); // Redirect to login if not authenticated
}

module.exports = { ensureAuthenticated };
