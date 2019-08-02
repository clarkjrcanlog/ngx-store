const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


const SaleSchema = mongoose.Schema({
    customerId: {type: Number, required: true},
    items: { type: Array, required: true},
    date: {type: Date, required: true},
    totalPrice: {type: Number, required: true}
})

const Sale = module.exports = mongoose.model('Sale', SaleSchema);

module.exports.addNewSale = async (data, cb) => {
    Sale.create(data, (err, createResult) => {
        if (err) {
            console.log(err);
            return cb({ success: false, message: err.message })
        } else {
            return cb({ success: true, message: 'new sale added!', data: createResult });
        }
    })

}


