const express = require("express");
const router = express.Router();



// guest btn to mainInterface
router.get("/guestUser", (req, res) => {
  res.redirect("/mainInterface")
})

// exit btn to homePage
router.get("/exit-guest", (req, res) => {
  res.redirect("/")
} )








module.exports = router;