const Joi = require('joi');
const mongoose = require('mongoose');


const Rental = mongoose.model('Rental', new mongoose.Schema({
//customising parameter in sub-documents- we need to do this since we might not need all the parameters
    customer : { 
       type : new mongoose.Schema({
        name : { 
            type : String, 
            required : true, 
            minlength : 5 ,
            maxlength : 50},
        isGold : {
            type : Boolean,
            default : false
        },
        phone : { 
            type : String, 
            required : true, 
            minlength : 5 , 
            maxlength : 50}
       }),
       required : true
        },

    movie : {
      type : new mongoose.Schema({
        title : { 
            type : String, 
            required : true, 
             minlength : 5 ,
             maxlength : 255,
             trim : true
            },
        dailyRentalRate : {
            type : Number,
            required : true,
            min : 0,
            max : 255
        }    
        }),
      required : true
    },

    dateOut : {
        type : Date,
        required : true,
        default : Date.now()
    },

    dateReturned : {
        type : Date   
    },

    rentalFee : {
        type : Number,
        min : 0   
    }

}));

//validate the request body
function validateRental(rental){
    const schema = Joi.object({ 
        customerId : Joi.objectId().required(),
         movieId : Joi.objectId().required()
    });
    
    return schema.validate(rental);
}


exports.Rental = Rental;
exports.validate = validateRental;