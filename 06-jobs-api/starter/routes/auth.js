const express = require("express")
const router = express.Router()

const { login, register } = require("../controllers/auth")
const authMiddleWare = require("../middleware/authentication")

router.post("/register", register)
router.post("/login", authMiddleWare, login)

module.exports = router;