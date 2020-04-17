const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Order = require('../models/order');
const Product = require('../models/product');


//Handle incoming GET request to /orders
router.get('/', (req, res, next) => {
    Order
        .find()
        .select('product quantity _id')
        .exec()
        .then(docs => {
            res.status(201).json({
                count: docs.length,
                Orders : docs.map(doc => {
                    return {
                        ID : doc._id,
                        Product : doc.product,
                        Quantity : doc.quantity,
                        request : {
                            type:'GET',
                            url: 'http://localhost:3000/orders/'+doc._id
                        }
                    }
                })  
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        });
});
router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message : 'Product not Found'
                })
            }
            const order = new Order({
                _id : mongoose.Types.ObjectId(),
                quantity : req.body.quantity,
                product :req.body.productId
        
            });
            return order.save()
        }).then(result => {
            console.log(result);
            res.status(201).json({
                message : 'Order Stored',
                CreatedOrder : {
                    ID : result._id,
                    Product : result.product,
                    Quantity : result.quantity
                },
                request: {
                    type :'Get',
                    url:'http://localhost:3000/orders/'+result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message : 'Invalid Product ID', 
                error : err
            });
        });    
});

router.get('/:orderId', (req, res, next) => {
    Order
    .findById(req.params.orderId)
        .select('quantity product _id')
        .exec()
        .then(order => {
            if (!order){ return res.status(404).json({ message : 'No Order with such ID'})}
            res.status(200).json({
                Order : order,
                request : {
                    type : 'GET',
                    url: "http://localhost:3000/orders"
                }
            });
        }).
        catch(err => {
            res.status(500).json({
                message : "Invalid order type",
                error: err
            })
        });

});



router.delete('/:orderId', (req, res, next) => {
    Order.remove(_id = req.params.orderId)
        .exec()
        .then(result => {
            res.status(200).json({
                message : "Order Deleted",
                request : {
                    type : 'POST',
                    url : 'http://localhost:3000/orders',
                    body : { productId : 'ID', quantity : 'Number'}   
                } 
            });
        })
        .catch(err => {
            res.status(500).json({
                message : 'Invalid order type',
                error : err
            })
        });
});

module.exports = router;