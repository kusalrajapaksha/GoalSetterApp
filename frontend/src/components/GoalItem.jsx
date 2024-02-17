import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <h3 className='goalText'>{goal.text}</h3>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
      ❌
      </button>
    </div>
  )
}

export default GoalItem
