import { Schema, model, Types } from 'mongoose';

interface UserInterface{
    username: string;
    password: string;
    account: Types.ObjectId;
};

const userSchema = new Schema<UserInterface>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }
})

export const User = model<UserInterface>('User', userSchema, 'users');
