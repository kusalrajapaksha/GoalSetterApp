const express = require('express')
const router = express.Router()
const {getGoals, setGoals, updateGoals, deleteGoals} = require('../controllers/goalController')



//--get request
router.get('/', getGoals)

//--post request
router.post('/', setGoals)

//--put request
router.put('/:id', updateGoals)

//--delete request
router.delete('/:id', deleteGoals)

module.exports = router