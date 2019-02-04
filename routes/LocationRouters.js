const express = require('express');
const app = express();
const LocationRouter = express.Router();

const LocationModel = require('../model/LocationModel');

LocationRouter.route('/add').post(function(req, res){
    const loca = new LocationModel(req.body);
    loca.save()
    .then(loca =>{
        res.json('Server added successfully');
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
});

LocationRouter.route('/location_list').get(function(req, res){
    LocationModel.find(function(err, loca){
        if(err){
            console.log(err);
        }
        else{
            res.json(loca);
        }
    });
});

LocationRouter.route('/update/:id').post(function(req, res){
    LocationModel.findById(req.params.id, function(err, location){
        if(!location)
            res.status(404).send("data is not found");
        else
            location.Name_Lo = req.body.Name_Lo;
            location.Address = req.body.Address;

            location.save().then(location => {
                res.json('Updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

module.exports = LocationRouter;
