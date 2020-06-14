"use strict";
if (process.env.mongoURL) {
    const mongoose = require('mongoose');
    await mongoose.connect(process.env.mongoURL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'mlab connection error:'));
    db.once('open', function () {
        console.log('mlab  connected!');
    });

    module.exports = {
        mongoose
    };

}