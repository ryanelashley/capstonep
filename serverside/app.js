const express = require('express');
const app = express();
const bodyParser  = require('body-parser');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json());
const mongoose = require('mongoose');
const Proposal = require('./models/proposal')
//connect and display the status 
mongoose.connect('mongodb://127.0.0.1:27017/IT6203', { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => { console.log("connected"); })
    .catch(() => { console.log("error connecting"); });

//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
    console.log('This line is always called');
    res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); //allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

app.post('/addProposal', (req, res, next) => {
    const proposal=new Proposal(req.body);
    proposal.save()
    //in case of success
    .then(() => { console.log('Success'+ proposal);})
    //if error
    .catch(err => {console.log('Error:' + err);});
    console.log("Submitted Proposal for mentor: ")//+ proposalSubmit.section1.contactName);
    res.status(201).json('Message from Server: Proposal Submitted for mentor:') //+ proposalSubmit.section1.contactName);
});

//in the app.get() method below we add a path for the students API 
app.get('/getAllProposals', (req, res, next) => {
    //call mongoose method find (MongoDB)
    const proposals= Proposal.find() 
    //if data is returned, send data as a response 
    .then(data => 
        {
            console.log("DB data: " + data);
            res.status(200).json(data);
        })
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}'+ err);
    res.status(500).json(err);
    });
    
}); 

app.get('/getProposal/:id', (req, res, next) => {
    //call mongoose method findOne (MongoDB db.Students.findOne())
    //var o_id = new ObjectId(req.params.id);
    Proposal.findOne({_id: req.params.id}) 
        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data);
            
        })
        //if error, send internal server error
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});

//serve incoming put requests to /students 
app.put('/proposal/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new first and last names
        Proposal.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                section1: req.body.section1,
                section2: req.body.section2,
            }}, 
            {new:true} 
        ) 
        .then((data) => { 
            if (data) { //what was updated 
                console.log("testtttt"+ data); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

app.delete("/deleteProposal/:id", (req, res, next) => {
    Proposal.deleteOne({ _id: req.params.id })
    .then(result => {        
        console.log(result);
        res.status(200).json("Deleted!");
    })
    .catch(err => {
        console.log('Error: ${err}'+ err);
        res.status(500).json(err);
    });
});

//to use this middleware in other parts of the application
module.exports=app;