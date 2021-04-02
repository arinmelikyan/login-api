import User from '../models/User.js';
import Utils from '../utils/utils.js';

export class UserController {
    static async register(req, res) {
        const userData = req.body;

        const user = new User(userData);

        try {
            const registeredUser = await user.save();
            const tokenInfo = await Utils.signJWTToken(registeredUser);
            return res.status(200).send({ accessToken: tokenInfo.token, registeredUser });
        } catch(e) {
            console.log(e);
        }
    } 

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                res.status(401).send('No user with such email');
            }

            if (password !== user.password) {
                res.status(401).send('Invalid password');
            }

            const tokenInfo = Utils.signJWTToken(user);

            return res.status(200).send({ accessToken: tokenInfo.token, user });
        } catch(e) {
            console.log(e);
        }
    }

    async checkSession(req, res, next) {
        try {
            const token = req.headers['authorization'].replace('Bearer ', '');
            const payload = await Utils.verifyJWTToken(token);

            if (!payload || !token || token === 'null') {
                return res.status(401).send('Unauthorized request');
            };

            return res.status(200).json({
                success: true,
            });

        } catch (e) {
            next(e);
        }
    }

    static async getUsers(req, res) {
        const token = req.headers['authorization'].replace('Bearer ', '');
        const payload = await Utils.verifyJWTToken(token);

        try {
            const users = await User.find({});

            if (!payload || !token || token === 'null') {
                return res.status(401).send('Unauthorized request');
            }
            
            return res.status(200).send({ success: true, users });
        } catch(e) {
            console.log(e);
        }
    }
}