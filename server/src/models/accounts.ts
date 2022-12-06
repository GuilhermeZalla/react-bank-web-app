import { Schema, model, Types } from 'mongoose';

interface AccountInterface{
     balance: Number;
     user: Types.ObjectId;
     transactions: [Types.ObjectId]
};

const accountSchema = new Schema<AccountInterface>({
    balance:{
        type: Number,
        default: 100,
        required: false
     },
     user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
     },
     transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
     }]
});

export const Account = model<AccountInterface>('Account', accountSchema, 'accounts');
