const mongoose = require('mongoose');

process.env.MONGODB_URI;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true//no lance un error por pantalla

})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));