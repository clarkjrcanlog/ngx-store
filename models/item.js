const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const ItemSchema = mongoose.Schema({
    itemName: {type: String, required: true},
    itemDesc: {type: String, required: true},
    itemQuan: {type: Number, required: true},
    itemPrice: {type: Number, required: true},
    status: {type: Boolean, required: true},
    date: {type: Date, required: true},
    createdBy: {type: Number, required: true}

})

const Item = module.exports = mongoose.model('Item', ItemSchema);

module.exports.addNewItem = async (data, cb) => {
    Item.create(data, (err, createResult) => {
        if (err) {
            console.log(err);
            return cb({ success: false, message: err.message })
        } else {
            return cb({ success: true, message: 'Item added!', data: createResult });
        }
    })

}

module.exports.updateItem = (id, newData, cb) => {
    const filter = { _id: id };
    // const update = { data: newData };
    return Item.findOneAndUpdate(filter, newData)
        .then(updatedDocument => {
            if (updatedDocument) {
                console.log(`Successfully updated document that had the form: ${updatedDocument}.`)
                return cb({ success: true, message: "   success" });
            } else {
                console.log("No document matches the provided query.")
                return cb({ success: false, message: "ID not found!" });
            }
            return updatedDocument
        })
        .catch(err => console.error(`Failed to find and update document: ${err}`))
}