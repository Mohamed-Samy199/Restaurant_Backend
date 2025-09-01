import jwt from 'jsonwebtoken';

export const generateToke = ({ payload, signature = process.env.TOKEN_SIGNATURE, expiresIn = 60 * 60 * 24 } = {}) => {
    const token = jwt.sign(payload, signature, { expiresIn: +expiresIn });
    return token;
}

export const verifyToken = ({token , signature = process.env.TOKEN_SIGNATURE}={}) => {
    const decode = jwt.verify(token , signature);
    return decode;
}