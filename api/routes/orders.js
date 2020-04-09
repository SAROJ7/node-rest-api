const express = require('express');
const router = express.Router();



//Handle incoming GET request to /orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were Fetched'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId : req.body.productId,
        quantity : req.body.quantity
    };

    res.status(201).json({
        message: 'Orders were created',
        orderProduct : order
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId + ' is special.'
    });
});

router.post('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if (id === 'special'){
        res.status(200).json({
            message : 'This is a special post.'
        });
    } else {
        res.status(200).json({
            message : 'Order Posted',
            OrderID : req.params.orderId
        });
    }
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: req.params.orderId +' is deleted'
    });
});

module.exports = router;