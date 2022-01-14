const mongoose = require('mongoose');
const Database = process.env.DB;
mongoose.connect( Database ,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      
    }).then(() => { console.log("Conn sucess"); })
    .catch((err) => { console.log(err); });