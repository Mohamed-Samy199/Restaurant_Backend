import { roles } from "../Middelware/authuntication.js";

// export const endPoint = {
//     user : roles.User,
//     admin : roles.Admin
// }

export const endPoint = {
    admin: [roles.Admin],
    employee: [roles.Employee],
    user: [roles.User],
}

