import { roles } from "../../Middelware/authuntication.js";

export const endPoint = {
    user : roles.User,
    admin : roles.Admin,
    employee : roles.Employee
}