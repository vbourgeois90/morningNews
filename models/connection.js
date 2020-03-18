var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://admin:mongopassword@clustervb-etqlb.azure.mongodb.net/newmorning-news?authSource=admin&replicaSet=ClusterVB-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
    options,
    function(err){
        console.log(err);
    }
)

module.exports = mongoose;