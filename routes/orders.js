const router = require('express').Router();
const checkToken = require("../auth/token_validation");
const Order = require('../models/order');
const mongoose = require('mongoose');
const { response } = require('../app');

router.get('/',checkToken,(req,res,next) => {
    Order.find()
    .exec().then(result => {
        const response = {
            count: result.length,
            response: result.map(doc => {
                return {
                    _orderid: doc._orderid,
                    _id: doc._id,
                    order: doc.order,
                    total: doc.total,
                    createdAt: doc.createdAt,
                    Address: doc.Address,
                    request: {
                        type: 'GET',
                        url: "http://89.40.11.242:8000/logs/safetynet@safe123/"+doc._orderid
                }
            }
        })
        }
        res.status(200).json(response);
    }
    ).catch(
        err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
    );
});