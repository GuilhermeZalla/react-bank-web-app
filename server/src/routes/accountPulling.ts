import { Router } from 'express';
import { Transactions } from './../models/transactions';
import { Account } from './../models/accounts';
import { User } from '../models/user';
const router = Router();
let date = new Date();

interface AccountTransaction {
    amount: Number;
    creditedAt: String;
};

class Transaction implements AccountTransaction {
    amount: Number;
    creditedAt: String;
    id: Number;
    date: String;
    constructor(amount: Number, name: String) {
        this.date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        this.id = Number((Math.random() * (999999 - 100000) + 100000).toFixed(0));
        this.amount = amount;
        this.creditedAt = name;
    };

    createTransaction() {
        return {
            amount: this.amount,
            creditedAt: this.creditedAt,
            id: this.id,
            date: this.date
        }
    }
};

// GET

router.get('/:username', async (req, res) => {
    try {
        let user = await User.findOne({ username: req.params.username }).lean();
        let account = await Account.aggregate([{ $match: { user: user?._id } }]);
        res.json({ username: req.params.username, balance: account[0].balance });
    } catch (err) {
        res.json({ message: 'Not possible to get account' });
        console.error(err);
    };
});

router.get('/registered/:username', async (req, res) => {
    try {
        let user = await User.findOne({ username: req.params.username }).lean();
        res.json(user);
    } catch (err) {
        res.json({ message: 'User not found ' });
        console.error(err);
    };
});

router.get('/transaction/:username', async (req, res) => {
    try {
        let user = await User.findOne({ username: req.params.username }).lean();
        let account = await Account.findOne({ user: user?._id }).lean();
        let transactions = await Transactions.find({ account: account?._id }).lean();
        res.json(transactions);
    } catch (err) {
        res.sendStatus(404);
    }
});

// PATCH

router.patch('/update-balance/:username/:current_user/:balance/:amount', async (req, res) => {
    let users = [req.params.username, req.params.current_user];
    console.log(req.params.amount);
    try {
        let current_user = await User.findOne({ username: req.params.current_user }).lean();
        let user = await User.findOne({ username: req.params.username }).lean();

        let currentBalance = await Account.findOne({ user: user?._id }).lean();
        let currentBalance2 = await Account.findOne({ user: current_user?._id }).lean();

        // update the balance for the current user (cash-out) and for the user who will receive a new balance (cash-in)

        await Account.findOneAndUpdate({ user: current_user?._id }, { balance: `${(Number(currentBalance2?.balance) - Number(req.params.amount))}` }).lean();
        await Account.findOneAndUpdate({ user: user?._id }, { balance: `${(Number(currentBalance?.balance) + Number(req.params.balance))}` }).lean();

        // register a new transaction

        let usernamesid = await User.find({ username: { $in: users } });
        let transaction = new Transaction(Number(req.params.balance), req.params.username).createTransaction();

        await Transactions.create({
            debitedAccountId: usernamesid[1],
            creditedAccountId: usernamesid[0],
            amount: transaction.amount,
            creditedAt: transaction.creditedAt,
            id: transaction.id,
            date: transaction.date
        });

        res.json({ message: `User ${req.params.username} balance was updated` });

    } catch (err) {
        res.json({ message: 'User not found' });
        console.error(err);
    };
});

export default router;