import cartModel from "../../DB/Models/cart.model.js";
import menuModel from "../../DB/Models/menu.model.js";
import orderModel from "../../DB/Models/order.model.js";
import { successResponse } from "../../utils/response/successResponse.js";
import { deleteItemFromCart, empatyCart } from "../Cart/cart.controller.js";
import axios from "axios";


export const createOrder = async (req, res, next) => {
    const { details, address, phoneCustom, source, paymentType } = req.body;

    const userId = req.user?._id;
    const { tableNumber } = req.params;

    if (!userId && !tableNumber) {
        return next(new Error("Unauthorized: user or table is required", { cause: 401 }));
    }

    if (!req.body.menus) {
        const cart = await cartModel.findOne({ ...(userId ? { userId } : { tableNumber }) });

        if (!cart?.menus?.length) {
            return next(new Error("cart is empty", { cause: 400 }));
        }

        req.body.isCart = true;
        req.body.menus = cart.menus;
    }

    const menuIds = [];
    const finalMenusList = [];
    let supTotale = 0;

    for (let menu of req.body.menus) {
        const checkMenu = await menuModel.findOne({ _id: menu.menuId });

        if (!checkMenu) {
            return next(new Error(`Invalid menu with id ${menu.menuId}`, { cause: 400 }));
        }

        if (req.body.isCart && menu.toObject) {
            menu = menu.toObject();
        }

        menu.menu = checkMenu._id;
        menu.name = checkMenu.name;
        menu.finalPrice = menu.quntity * checkMenu.finalPrice.toFixed(2);

        finalMenusList.push(menu);
        menuIds.push(menu.menuId);
        supTotale += menu.finalPrice;
    }

    const orderData = {
        ...(userId ? { userId } : { tableNumber }),
        userId: userId || undefined,
        tableNumber: tableNumber || undefined,
        address,
        phoneCustom,
        count: finalMenusList.length,
        details,
        source,
        menus: finalMenusList,
        supTotale,
        finalPrice: supTotale,
        paymentType,
        status: paymentType === "card" ? "waitPayment" : "placed"
    };

    const order = await orderModel.create(orderData);

    for (const menu of req.body.menus) {
        await menuModel.updateOne(
            { _id: menu.menuId },
            { $inc: { stock: -parseInt(menu.quntity) } }
        );
    }

    if (req.body.isCart) {
        await empatyCart({ userId, tableNumber });
    } else {
        await deleteItemFromCart({ menuIds, userId, tableNumber });
    }
    await sendTelegramMessage({ source, tableNumber, userId, finalMenusList, supTotale, phoneCustom, address, details });
    return successResponse({ res, status: 201, data: { order } });
};

export const cancelOrder = async (req, res, next) => {
    const { tableNumber } = req.params;
    const { reason, orderId } = req.body;

    const userId = req.user?._id;

    const filter = tableNumber
        ? { _id: orderId, tableNumber }
        : { _id: orderId, userId };

    const order = await orderModel.findOne(filter);
    if (!order) {
        return next(new Error("In-valid order id", { cause: 400 }));
    }

    if (
        (order?.status !== "placed" && order.paymentType === "cash") ||
        (order?.status !== "waitPayment" && order.paymentType === "card")
    ) {
        return next(new Error(`Cannot cancel order after status changed to ${order.status}`, { cause: 400 }));
    }

    const cancelOrder = await orderModel.updateOne(
        { _id: order._id },
        {
            status: "cancel",
            reason,
            updatedBy: userId || undefined,
        }
    );

    if (!cancelOrder.matchedCount) {
        return next(new Error("Failed to cancel order", { cause: 400 }));
    }

    for (const menu of order.menus) {
        await menuModel.updateOne(
            { _id: menu.menuId },
            { $inc: { stock: parseInt(menu.quntity) } }
        );
    }

    return res.status(200).json({ message: "Done" });
};

export const updateOrderStatusByAdmin = async (req, res, next) => {
    const { status } = req.body;
    const { orderId } = req.params;

    if (!await orderModel.findById(orderId)) {
        return next(new Error("invalid id order", { cause: 400 }));
    }
    const cancelOrder = await orderModel.updateOne({ _id: orderId }, { status, updatedBy: req.user._id });
    if (!cancelOrder.matchedCount) {
        return next(new Error("fail to update order", { cause: 400 }));
    }
    return successResponse({ res });
};

const sendTelegramMessage = async ({ source, tableNumber, userId, finalMenusList, supTotale, phoneCustom, address, details }) => {
    const botToken = "8462088156:AAGrRwPjpbok_Eio4Q2KsAjedTX0lbyaS8U";
    const chatId = "6383147470";

    const text = `<b>📦 تم استلام طلب جديد</b>\n\n🧾 <b>المصدر:</b> ${source === "delivary" ? "(دليفري) توصيل خارجي" : "طلب في المطعم"}
    \n🧑‍💼 ${source === "delivary"
            ? `<b>جاري توصيل الطلب للعميل</b>\n📞 رقم التليفون: ${phoneCustom}\n🏠 العنوان: ${address || "غير محدد"}\n📝 تفاصيل إضافية: ${details || "لا يوجد"}`
            : `<b>طلب ترابيزة رقم</b> ${tableNumber}`
        }
    \n\n🍽️ <b>الطلبات:</b>\n${finalMenusList.map(m => `- ${m.name} ×${m.quntity}`).join('\n')}
    \n\n💰 <b>الإجمالي:</b> ${supTotale.toFixed(2)} جنيه`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    await axios.post(url, {
        chat_id: chatId,
        text: text,
        parse_mode: "HTML"
    });
};