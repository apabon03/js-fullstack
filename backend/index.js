if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const { urlencoded } = require('express');
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

//inicializaciones

const app = express();
require('./database');

//settings
app.set('port', process.env.PORT || 3000); //como darle un valor a una variable; PROCESS... para puerto definido por heroku


//middlewares
app.use(morgan('dev'));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

app.use(multer({ storage }).single('image'));
app.use(express.urlencoded({extended: false})); //interpreta la entrada de datos de formularios como json
app.use(express.json()); //entiendo las peticiones AJAX que me envíen al servidor
app.use(cors());

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/books', require('./routes/books'));

//start the server
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});