function isAdmin(req, res, next) {
    if (req.user && req.user.role === "Admin") 
    {
        next();
    }
    else
    {
        res.status(403).send({ message: "Access denied. Only admin users can execute this action. "});
    }
}

module.exports = { isAdmin };