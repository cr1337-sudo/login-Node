const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new Schema({
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   }
})

//Metodop propio del modelo que recibe un pw, lo encripta y lo devuelve encriptado
userSchema.methods.encryptPassword = (password) => {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

//Metodo que recibe la contraseña en el login, la desencripta y la compara con la contraseña en la DB
userSchema.methods.comparePassword = function (password) {
   return bcrypt.compareSync(password, this.password)
}

module.exports = model("User", userSchema);