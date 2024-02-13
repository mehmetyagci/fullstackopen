import React, { useState } from 'react';

const StatisticLine = ({ name, count }) => <div> {name} {count} </div>

const Statistics = (props) => {
  console.log('Statistics')

  if (props.allFeedbacks.length === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  const goodFeedbacksCount = props.allFeedbacks.filter(feedback => feedback === 'G').length;
  console.log('goodFeedbacksCount', goodFeedbacksCount)
  const neutralFeedbacksCount = props.allFeedbacks.filter(feedback => feedback === 'N').length;
  console.log('neutralFeedbacksCount', neutralFeedbacksCount)
  const badFeedbacksCount = props.allFeedbacks.filter(feedback => feedback === 'B').length;
  console.log('badFeedbacksCount', badFeedbacksCount)
// name, count
  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine  name="good"  count={goodFeedbacksCount} /> 
      <StatisticLine  name="neutral"  count={neutralFeedbacksCount} /> 
      <StatisticLine  name="bad"  count={badFeedbacksCount} /> 
      <div> all {props.allFeedbacks.length}</div> 
      <div> average {(goodFeedbacksCount + (-1*badFeedbacksCount)) / props.allFeedbacks.length}</div> 
      <div> positive {(goodFeedbacksCount / props.allFeedbacks.length)*100} %</div> 
    </div>
  )
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [allFeedbacks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    setAll(allFeedbacks.concat('G'))
    console.log('good before', good)
    const updatedGood = good + 1
    setGood(updatedGood)
    console.log('good after', good)
    setTotal(updatedGood + neutral + bad) 
  }

  const handleNeutralClick = () => {
    setAll(allFeedbacks.concat('N'))
    console.log('neutral before', neutral)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    console.log('neutral after', neutral)
    setTotal(good + updatedNeutral + bad) 
  }


  const handleBadClick = () => {
    setAll(allFeedbacks.concat('B'))
    console.log('bad before', bad)
    const updatedBad = bad + 1
    setBad(updatedBad)
    console.log('bad after', bad)
    setTotal(good + neutral + updatedBad) 
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Statistics allFeedbacks={allFeedbacks} />
  </div>
  )
}

export default App