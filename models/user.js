const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
    id:         { type: Number, required: true },
    username:   { type: String, required: true },
    password:   { type: String, required: true },
    role:       { type: String, required: true },
});

const User = module.exports =  mongoose.model('User', UserSchema);

const getUserById = module.exports.getUserById = (id, cb) => {
    User.aggregate([
        { $match: { id:id } }
    ], (err, getUserByUsername) => {
        if(err) return cb({ success:false, message:err.message });
        if(getUserByUsername.length){
            return cb({ success:true, data:getUserByUsername[0] });
        }else{
            return cb({ success:false, message: "User not found!" });
        }
    });
}

const getUserByUsername = module.exports.getUserByUsername = (username, cb) => {
    User.aggregate([
        { $match: { username:username } }
    ], (err, getUserByUsername) => {
        if(err) return cb({ success:false, message:err.message });
        if(getUserByUsername.length){
            return cb({ success:true, data:getUserByUsername[0] });
        }else{
            return cb({ success:false, message: "User not found!" });
        }
    });
}

//experimental
const RandomId = () => {
    return Math.floor(Math.random() * 1000);
}

//experimental
const RandomUserId = async (cb) => {
    let ID = RandomId();
    return await getUserById( ID, response => {
        if(response.success){
            RandomUserId(cb);
        }else{
            return cb({ success:true, id:ID, message: "User ID is available" });
        }
    })
}

module.exports.AddUser = async (data, cb) => {
    getUserByUsername(data.username, async response => {
        if(response.success){
            return cb({ success:false, message: "Username already exists! "});
        }else{
            await RandomUserId( response => {
                data.id = response.id;
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(data.password, salt, (err, hash) => {
                        if(err) return cb({ success:false, message: err.message });
                        data.password = hash;
                        // data.role = 'user';
                        User.create(data, (err, createResult) => {
                            if(err){
                                return cb({ success:false, message:err.message })
                            }else{
                                data.password = undefined;
                                return cb({ success:true,  message: 'User added!', data: createResult });
                            }
                        })
                    })
                })
            });
        }
    })
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports.Authenticate = (data, cb) => {
    User.getUserByUsername(data.username, response => {
        if(response.success){
            User.comparePassword(data.password, response.data.password, (err, success) => {
                if(err) return cb({success: false, message: err.message });
                if(success){
                    response.data.password = undefined;
                    const token = jwt.sign(response.data, config.secret, { expiresIn: 604800 });
                    return cb({ success: true, data: { token: `Bearer ${token}`, user: response.data } });
                } else {
                    return cb({success: false, message: 'Incorrect password!'});
                }
            });
        }else{
            return cb(response);
        }
    });
}