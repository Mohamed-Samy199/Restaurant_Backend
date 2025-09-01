// import express from 'express';
// import axios from 'axios';

import axios from "axios";

// const router = express.Router();

// const BASE_URL = 'https://accept.paymob.com/api';

// router.post('/pay', async (req, res, next) => {
//     const { amount, items, customer } = req.body;

//     try {
//         // 1- Get auth_token
//         const authRes = await axios.post(`${BASE_URL}/auth/tokens`, {
//             api_key: process.env.PAYMOB_API_KEY,
//         });
//         const token = authRes.data.token;

//         // 2- Create Order
//         const orderRes = await axios.post(`${BASE_URL}/ecommerce/orders`, {
//             auth_token: token,
//             delivery_needed: false,
//             amount_cents: amount * 100,
//             currency: 'EGP',
//             items,
//         });

//         const orderId = orderRes.data.id;

//         // 3- Payment Key
//         const paymentKeyRes = await axios.post(`${BASE_URL}/acceptance/payment_keys`, {
//             auth_token: token,
//             amount_cents: amount * 100,
//             expiration: 3600,
//             order_id: orderId,
//             billing_data: {
//                 apartment: "NA",
//                 email: customer.email,
//                 floor: "NA",
//                 first_name: customer.first_name,
//                 street: "NA",
//                 building: "NA",
//                 phone_number: customer.phone,
//                 shipping_method: "NA",
//                 postal_code: "NA",
//                 city: customer.city || "Cairo",
//                 country: "EG",
//                 last_name: customer.last_name,
//                 state: "Cairo",
//             },
//             currency: "EGP",
//             integration_id: parseInt(process.env.PAYMOB_INTEGRATION_ID),
//         });

//         const paymentToken = paymentKeyRes.data.token;

//         // 4- Return URL to redirect
//         const paymentUrl = `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${paymentToken}`;

//         res.json({ url: paymentUrl });

//     } catch (error) {
//         console.error(error.response?.data || error.message);
//         next(new Error('فشل الربط ببوابة الدفع'));
//     }
// });

// export default router;


const PAYMOB_API_KEY = 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RZMk5qRXlMQ0p1WVcxbElqb2lNVGMxTlRBeE56TTNNQzQzTlRRM016WWlmUS5rYXNLMVJSbUJaNTlacWNFa295TDNpTHA2UXozMXFYM09mZGhISUFKQVBOTHRtM0FuQjZmb3NJOHIzLUhTNVJtNGtXRnlvbnBWSU5ZSGx2SVFyeW9Bdw==';
const PAYMOB_INTEGRATION_ID = "4541789";
//const PAYMOB_API_URL = process.env.PAYMOB_API_URL;
const PAYMOB_IFRAME_ID = "833205";

const BASE_URL = 'https://accept.paymob.com/api';

async function getAuthToken() {
    const response = await axios.post(`${BASE_URL}/auth/tokens`, {
        api_key: PAYMOB_API_KEY,
    });
    return response.data.token;
}


async function createOrder(authToken, amount) {
    const response = await axios.post(
        `${BASE_URL}/ecommerce/orders`,
        {
            auth_token: authToken,
            delivery_needed: "false",
            amount_cents: amount * 100, 
            currency: "EGP",
            items: [],
        }
    );
    return response.data.id; 
}


async function createPaymentKey(authToken, orderId, amount) {
    const response = await axios.post(
        `${BASE_URL}/acceptance/payment_keys`,
        {
            auth_token: authToken,
            amount_cents: amount * 100,
            expiration: 3600,
            order_id: orderId,
            billing_data: {
                first_name: "Customer",
                last_name: "User",
                phone_number: "01000000000",
                email: "customer@example.com",
                country: "Na",
                city: "Na",
                street: "Na",
                building: "Na",
                floor: "Na",
                apartment: "Na",
            },
            currency: "EGP",
            integration_id: PAYMOB_INTEGRATION_ID,
        }
    );
    return response.data.token; 
}


export async function createPayment(req, res) {
    try {
        const { amount } = req.body; 

        const authToken = await getAuthToken();
        const orderId = await createOrder(authToken, amount);
        const paymentKey = await createPaymentKey(authToken, orderId, amount);

        
        const iframeUrl = `https://accept.paymobsolutions.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;
        res.status(200).json({ success: true, iframeUrl });
    } catch (error) {
        console.error("Error creating payment:", error.message);
        res.status(500).json({ success: false, error: error });
    }
}