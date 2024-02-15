const express = require('express')
const router = express.Router()
const {getGoals, setGoals, updateGoals, deleteGoals} = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')


//--get request
router.get('/',protect, getGoals)

//--post request
router.post('/',protect, setGoals)

//--put request
router.put('/:id',protect, updateGoals)

//--delete request
router.delete('/:id',protect, deleteGoals)

module.exports = router