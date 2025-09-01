import tableModel from "../../../DB/Models/table.model.js";
import { paginate } from "../../../utils/paginate/paginate.js";
import { generateToke } from "../../../utils/Securty/token.js";
import QRCode from "qrcode";

export const allTables = async (parent, args) => {
    const tables = await tableModel.find({}).sort({ createdAt: -1 }).populate([
        {
            path: "createdBy"
        }
    ]);

    return {
        message: "menu list",
        status: 200,
        data: tables
    }
}

export const allTablesByPagination = async (parent, args) => {
    const { skip, limit } = paginate(args.page, args.limit);

    const totalCount = await tableModel.countDocuments();
    const tables = await tableModel.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate([
            {
                path: "createdBy"
            }
        ]);

    return {
        message: "menu list by pagination",
        status: 200,
        totalCount,
        data: tables
    }
}

export const tableById = async (parent, args) => {
    const table = await tableModel.findById(args.id).populate([
        {
            path: "createdBy"
        }
    ])
    if (!table) {
        return { message: "table not found", status: 404 }
    }
    return {
        message: "table",
        status: 200,
        data: table
    }
}

export const generateQR = async (perant, args) => {
    const { tableNumber } = args;
    if (!tableNumber) return next(new Error("table number is requird", { cause: 400 }));

    const tableToken = generateToke({ payload: { tableNumber }, expiresIn: 60 });
    const qrURL = `http://localhost:3000/menu?table=${tableNumber}&token=${tableToken}`;
    //const qrURL = `http://localhost:5000/menu/qrcode?table=${tableNumber}&token=${tableToken}`;

    const qrCodeImage = await QRCode.toDataURL(qrURL);

    return {
        message: "table",
        status: 200,
        qrCodeImage,
        qrURL
    }
}

export const fixedQR = async (perant, args) => {
    const qrcode = `http://localhost:3000/menu`;
    const qrCodeImage = await QRCode.toDataURL(qrcode);

    return {
        message: "qrcode",
        status: 200,
        qrCodeImage
    }
}