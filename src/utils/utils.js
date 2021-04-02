import jwt from 'jsonwebtoken';
import { userTokenSecret } from '../configs/config.js';

export default class Utils {
    static signJWTToken(data) {
        const payload = { id: data._id };

        let token = jwt.sign(payload, userTokenSecret);

        return { token };
    }

    static verifyJWTToken(token) {
        try {
            return jwt.verify(token, userTokenSecret);
        } catch (e) {
            return null;
        }
    }
}    