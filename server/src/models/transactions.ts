import { Schema, model, Types } from 'mongoose';

interface TransactionsInterface{
    debitedAccountId: Types.ObjectId;
    creditedAccountId: Types.ObjectId;
    amount: Number;
    creditedAt: String,
    id: Number,
    date: String,
    account: Types.ObjectId
};

const transactionSchema = new Schema<TransactionsInterface>({
      debitedAccountId: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: 'Account'
      },
      creditedAccountId: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: 'Account'
      },
      amount: {
         type: Number,
         default: 0.00,
         required: true
      },
      creditedAt: {
         type: String,
         required: true
      },
      id: {
         type: Number,
         required: true
      },
      date: {
         type: String,
         required: true
      },
      account: {
         type: Schema.Types.ObjectId,
         ref: 'Account'
      }
});

export const Transactions = model<TransactionsInterface>('Transaction', transactionSchema, 'transactions');