const dog = require("./dog")
const dogs = require("./dogs")
const temperament = require("./temperaments")
const { Router } = require('express');

const router = Router();

router.use("/dogs", dogs)
router.use("/dog", dog)
router.use("/temperament", temperament)

module.exports = router;