import { Router } from 'express';
import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from '../models/user';
import { Account } from '../models/accounts';
const router = Router();
const regex = /[0-9]/;
const header = JSON.stringify({
    'alg': 'HS256',
    'typ': 'JWT'
});
let user: any;

// POST

router.post('/:username/:password', (req, res) => {
    if (req.params.username.length >= 3 && (req.params.password.length >= 8 && regex.test(req.params.password) && /[A-Z]/.test(req.params.password))) {
        bcrypt.hash(req.params.password, 10, (err, hash) => {
            User.create({ username: req.params.username, password: hash }).then(res => Account.create({ user: res._id }));
        });
        res.json({ message: "User created" });
    } else {
        res.json({ message: "Not registered" });
    };
});

// GET

router.get('/validation/:username/:password', async (req, res) => {
    try {
        user = await User.findOne({ username: req.params.username });
        if (user.length !== 0) {
            const result = await bcrypt.compare(req.params.password, user['password']);
            if (result) {
                let payload = JSON.stringify({
                    'username': `${req.params.username}`,
                    'password': `${req.params.password}`
                });
                const baseHeader = Buffer.from(header).toString('base64').replace(/=/g, '');
                const basePayload = Buffer.from(payload).toString('base64').replace(/=/g, '');
                const secret = `new-username-access-${req.params.username}-today`;
                const data = baseHeader + '.' + basePayload;
                const signature = crypto.createHmac('sha256', secret).update(data).digest('base64');
                const url = signature.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
                res.json({ message: "User found", token: url });
            } else {
                res.json({ message: "Invalid password" });
            };
        };
    } catch (err) {
        res.json({ message: "User not found" });
    }
});

router.get('/verify/:username', async (req, res) => {
    try {
        user = await User.findOne({ username: req.params.username }).lean();
        if (user) {
            res.json({ message: true });
        } else {
            res.json({ message: false });
        };
    } catch (err) {
        res.json({ message: 'Username validation was not possible' });
    };
});

export default router;