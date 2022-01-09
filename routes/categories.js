const router = require('express').Router();
const upload = require('../utils/fileuploads');
const cloudinary = require('../utils/cloudinary');
const Category = require("../models/category");
const mongoose = require("mongoose")


// Getting all categories
router.get('/', (req, res, next) => {
    Category.find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    image: doc.image,
                    request: {
                            type: 'GET',
                            url: process.env.URL+"/api/category"+doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
        }
    )
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


// Add new product ... admin only
router.post('/',upload.single('image'), async (req, res, next) => {
    try{
        const image = await cloudinary.uploader.upload(req.file.path);
        const category = new Category({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            image: image.secure_url,
            cloudinary_id: image.public_id
        });
        category
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created category successfully',
                createdlog : {
                    _id: result.id,
                    name: result.name,
                    image: result.image,
                    cloudinary_id:result.cloudinary_id,
                    request: {
                      type: 'GET',
                      url: process.env.URL+"/api/category/"+result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    } catch(err){
        console.log(err);
    }
});

//deleting payments(only admin)
router.delete('/:categoryId',async (req, res, next) => {
    try{
        const id = req.params.categoryId;
    let category = await Category.findById(id);
    await cloudinary.uploader.destroy(category.cloudinary_id);
    Category.deleteOne({_id: id})
    .exec()
    .then(result=> {
        res.status(200).json({
            message: "Category removed"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    } catch(err){
        console.log(err)
    }
});

module.exports = router;