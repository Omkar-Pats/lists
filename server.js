const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

// Body parser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Conct to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.us(express.static('client/build'));

    app.get('/', function(req, res){
      res.redirect('/todo');
   });

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    });

}

app.listen(function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
})

//require('./api/items')(app, {});
//app.listen(port, () => console.log('Server started at ' ));
//console.log('test')

