import userModel from "../../DB/Models/user.model.js";
import { successResponse } from "../../utils/response/successResponse.js";
import { compare, hash } from "../../utils/Securty/hash&compary.js";
import { generateToke } from "../../utils/Securty/token.js";


export const register = async (req, res, next) => {
    const { userName, email, password } = req.body;
    if (await userModel.findOne({ email: email.toLowerCase() })) {
        return next(new Error("user aleardy exist!", { cause: 401 }));
    }

    const hashPassword = hash({ plaintext: password });
    const user = await userModel.create({ userName, email, password: hashPassword });
    return successResponse({ res, status: 201, data: { user } })
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
        return next(new Error("not found user", { cause: 404 }));
    }

    if (!compare({ plaintext: password, hashValue: user.password })) {
        return next(new Error("In-valid login data", { cause: 409 }));
    }

    if ((email.toString() === "ahmedkarem1192000@gmail.com") || (email.toString() ===  "mooh246samy@gmail.com")) {
        user.role = "Admin";
    }
    
    const access_token = generateToke({ payload: { id: user._id, role: user.role, userName: user.userName }, expiresIn: 60 * 60 * 24 * 7 })

    user.isConfirmed = true;
    await user.save();

    return successResponse({ res, data: { access_token } });
};

export const updateUserToAdmin = async (req, res, next) => {
    const { email } = req.body;
    if (!await userModel.findOne({ email })) {
        return next(new Error("user not found", { cause: 404 }));
    }
    const admin = await userModel.findOneAndUpdate({ email }, { role: "Admin" }, { new: true });
    if (!admin) {
        return next(new Error("user not found or update", { cause: 409 }));
    }
    return res.status(200).json({ message: "Done", newAdmin: admin.role });
};

export const updateUserToEmployee = async (req, res, next) => {
    const { email } = req.body;
    if (!await userModel.findOne({ email })) {
        return next(new Error("user not found", { cause: 404 }));
    }
    const employee = await userModel.findOneAndUpdate({ email }, { role: "Employee" }, { new: true });
    if (!employee) {
        return next(new Error("user not found or update", { cause: 409 }));
    }
    return res.status(200).json({ message: "Done", newEmployee: employee.role });
};

export const updateAdminToUser = async (req, res, next) => {
    const { email } = req.body;
    if (!await userModel.findOne({ email })) {
        return next(new Error("user not found", { cause: 404 }));
    }
    const user = await userModel.findOneAndUpdate({ email, role: "Admin" }, { role: "User" }, { new: true });
    if (!user) {
        return next(new Error("user not found or update", { cause: 409 }));
    }
    return res.status(200).json({ message: "Done", user: user.role });
}

export const deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    if (!userId) {
        return next(new Error("not found user", { cause: 404 }));
    };

    if (req.user._id.toString() === userId.toString()) {
        return next(new Error("can't delete user", { cause: 401 }));
    }

    await userModel.findByIdAndDelete(userId);
    return successResponse({ res });
}