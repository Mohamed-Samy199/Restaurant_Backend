import bcrypt from "bcryptjs";


export const hash = ({plaintext , salt = +process.env.SALT} = {}) => {
    const hashResult = bcrypt.hashSync(plaintext , salt);
    return hashResult;
}

export const compare = ({plaintext , hashValue}={}) => {
    const match = bcrypt.compare(plaintext , hashValue);
    return match;
}