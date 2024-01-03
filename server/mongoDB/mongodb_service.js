const mongoose = require('mongoose');

class MongoDB {

    connectDB() {
        mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log("Connection to the database is successful");
        }).catch((error) => {
            console.log(error.message);
        });
    }
};

module.exports = MongoDB;