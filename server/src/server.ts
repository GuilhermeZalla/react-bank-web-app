import { app } from "./app";

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Connected to ${port}`);
});

process.on('SIGINT', () => {
    server.close();
    console.log(`App exterminated.`);
});