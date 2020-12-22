var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var randomstring = require("randomstring")

module.exports = {

    hash: async (password)=>{

        return new Promise((resolve, reject) => {
            
            bcrypt.genSalt(10, function (err, salt) {
    
                bcrypt.hash(password, salt, function (err, hash) {
                    // Store hash in your password DB.
                    if(err){
                        reject(err)
                    }
                    resolve(hash)
                })
            })

        })

    },

    compare: async (password, hash)=>{

        // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
        return bcrypt.compare(password, hash)
    },

    
    signJWT: async (payload, key, expiresIn)=>{
        return new Promise((resolve, reject)=>{
            jwt.sign(payload, key, { expiresIn: expiresIn }, function (err, token) {
                // console.log(token);
                if(err){
                    reject(err)
                }
                resolve(token)
            })

        })
    },

    verifyJWT: async (token, key, isIgnoreExpiration = false)=>{
        return new Promise((resolve, reject) => {
            jwt.verify(token, key, { ignoreExpiration: isIgnoreExpiration }, function (err, decoded) {
                // console.log(decoded.foo) // bar
                if(err){
                    reject(err)
                }
                resolve(decoded)
            })

        })
    },

    randomString: (length)=>{
        return randomstring.generate(length)
    },

    getCurrentSecondsPlus: (secondsPlus) => {
        let currentSeconds = Math.floor(new Date() / 1000)
        return currentSeconds + secondsPlus
    },

    isCurrentSecondsExceed: (seconds) =>{

        let currentSeconds = Math.floor(new Date() / 1000)
        return currentSeconds > seconds
    }

}