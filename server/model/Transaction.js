const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    date : Date,
    amount: Number,
    category: String,
    vendor: String
})
const Transaction = mongoose.model("transction", transactionSchema)
module.exports = Transaction