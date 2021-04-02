import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    createdAt: String,
});

export default mongoose.model('user', userSchema, 'users');