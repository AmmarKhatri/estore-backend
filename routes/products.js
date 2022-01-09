const router = require('express').Router();
const checkToken = require("../auth/token_validation");
const Product = require('../models/product');
const mongoose = require('mongoose');

// Getting all products
router.get('/',checkToken, (req, res, next) => {
    Product.find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    _id: doc._id,
                    description: doc.description,
                    image: doc.image,
                    category:doc.category,
                    rate: doc.rate,
                    availability: doc.availability,
                    request: {
                            type: 'GET',
                            url: "http://89.40.11.242:8000/logs/safetynet@safe123/"+doc._id
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
router.post('/',checkToken, (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        rate: req.body.rate,
        availability: req.body.availability,
    });
    product
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created log successfully',
            createdlog : {
                _id: result.id,
                description: result.description,
                image: result.image,
                category: result.category,
                rate: result.rate,
                availability: result.availability,
                request: {
                  type: 'GET',
                  url: "http://89.40.11.242:8000/logs/safetynet@safe123/"+result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

// Patching products (admin only)  
router.patch("/:prodId",checkToken, (req, res, next) => {
    const id = req.params.prodId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Product.patch({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product updated',
            request: {ref: 'GET', url: "http://89.40.11.242:8000/logs/safetynet@safe123/"+id}
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

//Get individual payment
router.get('/:prodID',checkToken, (req, res, next) => {
    const id = req.params.prodID;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET ALL',
                    url: 'http://89.40.11.242:8000/logs/safetynet@safe123'
                }
            });
        } else{
                res.status(404).json({message: "No valid entry found for provided ID"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

//deleting payments(only admin)
router.delete('/:prodId',checkToken, (req, res, next) => {
    const id = req.params.prodId;
    Product.remove({_id: id})
    .exec()
    .then(result=> {
        res.status(200).json({
            message: "Product Deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

module.exports = router;
