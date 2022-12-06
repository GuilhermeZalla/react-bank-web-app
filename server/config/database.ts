const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/bankdatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`Connected to mongo database`)).catch((err: any) => console.error(err));