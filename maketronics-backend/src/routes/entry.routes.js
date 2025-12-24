const router = require("express").Router();
const controller = require("../controllers/entry.controller");

router.post("/", controller.createEntry);
router.get("/", controller.getEntries);

module.exports = router;


