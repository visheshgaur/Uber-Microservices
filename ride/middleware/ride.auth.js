const axios=require("axios")

const authUser=async(req,res,next)=>{
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not found"
            });
        }

        const response = await axios.get(
            process.env.BASE_URL,
            {
                headers: {
                    Cookie: `token=${token}`
                }
            }
        );

        req.user = response.data.user;
        next();

    } catch (error) {
        console.log("AUTH ERROR:", error.response?.data || error.message);

        return res.status(
            error.response?.status || 500
        ).json({
            message: error.response?.data?.message || "Internal server error"
        });
    }
}

module.exports=authUser