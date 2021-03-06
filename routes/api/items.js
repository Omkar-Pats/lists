const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/item.js');

//@route POST api/items
//@desc create a post
// @access Public
router.post('/', (req,res) => {
    const newItem = new Item({
        name: req.body.name   
    });
    newItem.save().then(item =>res.json(item));
       
});
//@route DELETE api/items/:id
//@desc create a post
// @access Public
router.delete('/:id', (req,res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))   
    .catch(err => res.status(404).json({success: false}));     
});
//@route get api/items
//@desc get a post
// @access Public
router.get('/api/items', (req,res) => {
    Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
});

module.exports = router;