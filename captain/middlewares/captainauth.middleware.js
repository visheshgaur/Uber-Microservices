const jwt = require("jsonwebtoken");

const authcaptain = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "captain not authenticated"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.captain = decoded;

        next();

    } catch (error) {
        

        if (
            error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError"
        ) {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }

        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = authcaptain;