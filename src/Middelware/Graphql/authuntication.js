import userModel from "../../DB/Models/user.model.js";
import { verifyToken } from "../../utils/Securty/token.js";


export const roles = {
    User: "User",
    Admin: "Admin",
    Employee: "Employee"
}

export const auth = async ({ authorization, accessRole = [] } = {}) => {

    const [bearer, token] = authorization?.split(" ") || [];
    if (!bearer || !token) {
        throw new Error("missing token");
    }
    let signature = '';
    switch (signature) {
        case "System":
            signature = process.env.ADMIN_REFRESH_TOKEN_KEY;
            break;

        case "Employee":
            signature = process.env.EMPLOYEE_REFRESH_TOKEN_KEY;
            break;

        case "Bearer":
            signature = process.env.USER_REFRESH_TOKEN_KEY;
            break

        default:
            break;
    }
    const decode = verifyToken({ token });
    if (!decode?.id) {
        throw new Error("In-valid token payload");
    };
    const user = await userModel.findById(decode.id).select("userName role email")
    if (!user) {
        throw new Error("user not register");
    }
    if (!accessRole.includes(user.role)) {
        throw new Error("Not authorized user");
    }
    return user;
}