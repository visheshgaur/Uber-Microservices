const jwt = require("jsonwebtoken");

const authuser = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        if(decoded.role!="user"){
            return res.status(401).json({
                message:"captains are not allowed"
            })
        }

        req.user = decoded;

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

module.exports = authuser;