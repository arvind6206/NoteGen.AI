import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
    try {

        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({
                msg: "Token not found"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded.id;

        next();

    } catch (error) {

        return res.status(401).json({
            msg: "Invalid Token"
        });

    }
}

export default authMiddleware;