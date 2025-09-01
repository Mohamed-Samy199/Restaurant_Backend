import { verifyToken } from "../utils/Securty/token.js";


export const verifyTableAccess = (req, res, next) => {
    const { token, table } = req.headers;

    if (!token || !table) {
        return res.status(403).json({ message: "Missing token or table number" });
    }

    const data = verifyToken({token});

    if (!data || data.tableNumber != table) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.tableNumber = parseInt(table);
    next();
};
