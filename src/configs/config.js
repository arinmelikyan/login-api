import dotenv from 'dotenv';
import env from 'env-var';

dotenv.config();

export const mongoURL = env.get('MONGO_URI').asString();
export const port = env.get('PORT').asString();
export const userTokenSecret = env.get('USER_TOKEN_SECRET').asString();