const { register, login } = require("../controllers/user_controller");
const { getAllUser } = require('../controllers/user_controller');

const router = require("express").Router();

router.post('/register', register);
router.post('/login', login);
router.get('/allUser/:id', getAllUser);
module.exports = router;