import mongoose from 'mongoose';
import { mongoURL } from './config.js';

(async() => {
    await mongoose.connect(mongoURL, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('connected to mongodb');
        }
    })
})();