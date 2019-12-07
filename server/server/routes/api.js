const express = require("express");
const router = express.Router();
const Transaction = require("../../model/Transaction");


router.get("/transactions", function(req, res) {
  Transaction.find({}, function(err, transactions) {
    res.send(transactions);
  });
});

router.post("/transaction", async function(req, res) {
  const transaction = new Transaction({
    date:req.body.date,
    amount: req.body.amount,
    category: req.body.category,
    vendor: req.body.vendor
  });
  transaction.save();
  res.end();
});

router.delete("/transaction", async function(req, res) {
  let transaction = req.data ;
  transaction = await Transaction.find(transaction);
  let transactionId = transaction[0]._id
  await Transaction.findByIdAndDelete(transactionId)
  res.end();
});

module.exports = router;
