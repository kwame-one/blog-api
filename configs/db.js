const mongoose = require('mongoose');
// const config = require('../configs/app')

const connect = async () => {
    await mongoose.connect(process.env.DB_URL)
}

module.exports = connect;