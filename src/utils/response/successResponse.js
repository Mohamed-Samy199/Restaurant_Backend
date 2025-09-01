

export const successResponse = ({res = ""  , message = "Done" , data = {} , status = 200}={}) => {
    return res.status(status).json({message , data : {...data}});
}

// export const successResponse = ({ res = null, message = "Done", data = {}, status = 200 } = {}) => {
//     if (res) {
//         return res.status(status).json({ message, data: { ...data } });
//     }
//     return { message, status, data: { ...data } };
// }
