import { nanoid } from "nanoid";
import categoryModel from "../../DB/Models/category.model.js";
import cloudinary from '../../utils/imageReload/cloudinary.js'
import menuModel from "../../DB/Models/menu.model.js";
import { successResponse } from "../../utils/response/successResponse.js";
import Qrcode from "qrcode";

export const qrcodeMenu = async (req, res, next) => {
    const menuURL = `https://hadrmoot.vercel.app/menu`;
    const qrCodeURL = await Qrcode.toDataURL(menuURL);
    return res.status(200).json({
        message: "Menu QR Generated Successfully",
        qrCode: qrCodeURL
    });
};

export const addMenu = async (req, res, next) => {
    const { name, descraption, price, discount } = req.body;
    const { categoryId } = req.params;

    if (!await categoryModel.findById(categoryId)) {
        return next(new Error(`not found this category`, { cause: 404 }));
    }

    if (req.body.price) {
        req.body.finalPrice = Number.parseFloat(price - (price * ((discount || 0) / 100))).toFixed(2);
    }

    req.body.customId = nanoid(6);
    try {
        const folderPath = `${process.env.APP_NAME}/menu/${req.body.customId}/${name}`.trim();

        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: folderPath,
            format: "webp",
            transformation: [{ flags: "lossy" }]
        });

        req.body.image = { secure_url, public_id };
    } catch (error) {
        console.error("Cloudinary error:", error);
        return next(new Error(error.message || "Cloudinary upload failed"));
    }

    req.body.descraption = descraption;
    req.body.createdBy = req.user._id;
    req.body.categoryId = categoryId;

    const menu = await menuModel.create(req.body);
    if (!menu) {
        return next(new Error("can't menu added!", { cause: 400 }))
    }

    return successResponse({ res, status: 201, data: { menu } });
};

export const updateMenu = async (req, res, next) => {
    const { menuId, categoryId } = req.params;
    const { name, descraption, price, discount, stock } = req.body;

    if (!await categoryModel.findById(categoryId)) {
        return next(new Error("not found category", { cause: 404 }));
    }
    const menu = await menuModel.findById(menuId);

    if (!menu) {
        return next(new Error("not found menu", { cause: 404 }));
    }

    if (name) menu.name = name;
    if (descraption) menu.descraption = descraption;

    if (price) {
        menu.price = price;
        const calcDiscount = discount || menu.discount || 0;
        menu.finalPrice = Number.parseFloat(price - (price * calcDiscount / 100)).toFixed(2);
    }
    if (discount !== undefined) menu.discount = discount;
    if (stock) menu.stock = stock;

    if (categoryId && menu.categoryId.toString() !== categoryId) {
        menu.categoryId = categoryId;
    }


    if (req.file) {
        await cloudinary.uploader.destroy(menu.image.public_id);
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: `${process.env.APP_NAME}/menu/${menu.customId}/${menu.name}`,
            format: "webp",
            flags: "lossy"
        });
        menu.image = { secure_url, public_id }
    }

    menu.updatedBy = req.user._id;
    await menu.save();

    return successResponse({ res, data: { menu } });

};

export const deleteMenu = async (req, res, next) => {
    const { menuId, categoryId } = req.params;

    if (!await categoryModel.findById(categoryId)) {
        return next(new Error("not found category", { cause: 404 }));
    }
    const menu = await menuModel.findById(menuId);

    if (menu?.image?.public_id) {
        await cloudinary.uploader.destroy(menu.image.public_id);
    }

    await menuModel.findByIdAndDelete(menuId);
    return successResponse({ res });
};