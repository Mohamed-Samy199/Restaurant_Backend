import tableModel from "../../DB/Models/table.model.js";
import { successResponse } from "../../utils/response/successResponse.js";
import QRCode from "qrcode";
import { generateToke } from "../../utils/Securty/token.js";
import menuModel from "../../DB/Models/menu.model.js";

export const addTable = async (req, res, next) => {
    const { tableNumber } = req.body;

    const qrURL = `http://localhost:5000/category/qrcode?table=${tableNumber}`;
    const qrCodeImage = await QRCode.toDataURL(qrURL);

    const table = await tableModel.create({ tableNumber, qrcode: qrCodeImage, createdBy: req.user._id });
    return successResponse({ res, status: 201, data: { table } });
}


export const updateTable = async (req, res, next) => {
    const { tableId } = req.params;
    const { tableNumber, active } = req.body;

    const table = await tableModel.findById(tableId);

    if (!table) {
        return next(new Error("table not found", { cause: 404 }));
    }
    if (tableNumber) {
        const qrURL = `http://localhost:5000/category/qrcode?table=${tableNumber}`;
        table.qrcode = await QRCode.toDataURL(qrURL);
        table.tableNumber = tableNumber;
    }

    if (active) table.active = active;

    await table.save();
    return successResponse({ res, data: { table } })
}

export const deleteTable = async (req, res, next) => {
    const { tableId } = req.params;

    if (!await tableModel.findById(tableId)) {
        return next(new Error("table not found", { cause: 404 }));
    }

    await tableModel.findByIdAndDelete(tableId);
    return successResponse({ res });
}






// export const generateQR = async (req, res, next) => {
//     const { tableNumber } = req.params;
//     if (!tableNumber) return next(new Error("table number is requird", { cause: 400 }));

//     const tableToken = generateToke({ payload: { tableNumber }, expiresIn: 60 * 60  });
//     const qrURL = `http://localhost:5000/category/qrcode?table=${tableNumber}&token=${tableToken}`;
//     const qrCodeImage = await QRCode.toDataURL(qrURL);

//     return res.status(200).json({ message: "Done", qrCodeImage, qrURL });
// }
// export const getMenuForTable = async (req, res) => {
//     const menu = await menuModel.find(); 
//     res.status(200).json({ menu });
// };