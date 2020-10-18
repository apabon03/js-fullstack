const { Router } = require('express');
const router = Router();
const { unlink } = require('fs-extra'); //importa solo el método
const path = require('path');

const Books = require('../models/Books');

router.get('/', async (req, res) => {
    const book = await Books.find();
    res.json(book);
});

router.post('/', async (req, res) =>{
    const { title, author, isbn } = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newBook = new Books( {title, author , isbn, imagePath} );
    await newBook.save();
    res.send({ message: "Book saved!"});
});

router.delete('/:id', async (req, res) => {
    const book = await Books.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./backend/public'+book.imagePath));
    res.json({ message: "Book deleted!" });
    
})

module.exports = router;