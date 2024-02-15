const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')
const User = require('../model/userModel')

// @desc    Get goals
// @route   Get /api/goals
// @access  private
const getGoals = asyncHandler(async (req,res) => {

    const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
})

// @desc    Set goals
// @route   POST /api/goals
// @access  private
const setGoals = asyncHandler(async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error("Please add a text field")
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  private
const updateGoals = asyncHandler(async (req,res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the goal user id
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true
        })

    res.status(200).json(updatedGoal)
})

// @desc    Delete goals
// @route   DELETE /api/goals/:id
// @access  private
const deleteGoals =asyncHandler(async (req,res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the goal user id
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.deleteOne()
       
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}