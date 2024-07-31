const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth_controllers");
const validate = require("../middleware/validate_middleware");
const signupSchema = require("../validators/auth_validator");

const authMiddleware = require("../middleware/auth_middleware");

router.route("/").get(authcontrollers.home);
router.route("/register").post(validate(signupSchema), authcontrollers.register);
router.route("/login").post(authcontrollers.login);

router.route("/user").get(authMiddleware, authcontrollers.user);

module.exports = router;
