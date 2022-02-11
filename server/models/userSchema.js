const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
  pan : {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
  tokens : [
      {
          token : {
            type: String,
            required: true
          }
      }
  ]
});


userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id : this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token : token})
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}

userSchema.methods.addMessage = async function (time) {
  console.log("time",time)
  try {
    this.time = time;
    await this.save();
    return this.time;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("USER", userSchema);

module.exports = User;
