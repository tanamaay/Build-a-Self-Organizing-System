const router = require("express").Router();
const controller = require("../controllers/analytics.controller");

router.get("/", controller.getAnalytics);

module.exports = router;
