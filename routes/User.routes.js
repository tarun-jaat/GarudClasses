const express = require("express")
const router = express.Router()
const {login} =require("../Controllers/Auth.controller")


//user login route
router.post("/login", login)

module.exports = router;