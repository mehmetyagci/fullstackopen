import React, { useState } from 'react';

const StatisticLine = ({ name, count, sign }) => <tr><td>{name}</td><td>{count}</td><td>{sign}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
  console.log('Statistics')
  console.log('good',good)
  console.log('neutral',neutral)
  console.log('bad',bad)

  const totalFeedbacks = good + neutral + bad;

  if (totalFeedbacks === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  const averageFeedbacks = (good - bad) / totalFeedbacks;
  const positivePercentageFeedbacks = (good / totalFeedbacks) * 100;

  return (
    <div>
      <h1>statistics</h1>
      <table>
          <tbody>
            <StatisticLine  name="good"       count={good}  sign=""  /> 
            <StatisticLine  name="neutral"    count={neutral} sign=""/> 
            <StatisticLine  name="bad"        count={bad} sign=""/> 
            <StatisticLine  name="all"        count={totalFeedbacks} sign="" /> 
            <StatisticLine  name="average"    count={averageFeedbacks} sign=""/> 
            <StatisticLine  name="positive"   count={positivePercentageFeedbacks} sign="%"   /> 
          </tbody>
      </table>
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

  const handleFeedbackClick = (feedbackType) => {
    console.log('handleFeedbackClick->feedbackType', feedbackType);
    switch (feedbackType) {
      case 'good':
        console.log('good before', good)
        const updatedGood = good + 1
        console.log('updatedGood', updatedGood)
        setGood(updatedGood)
        console.log('good after', good)
        break;
      case 'neutral':
        console.log('neutral before', neutral)
        const updatedNeutral = neutral + 1
        setNeutral(updatedNeutral)
        console.log('neutral after', neutral)
        break;
      case 'bad':
        console.log('bad before', bad)
        const updatedBad = bad + 1
        setBad(updatedBad)
        console.log('bad after', bad)
        break;
        default:
          break;
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleFeedbackClick('good')} text="Good" />
      <Button handleClick={() => handleFeedbackClick('neutral')} text="Neutral" />
      <Button handleClick={() => handleFeedbackClick('bad')} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
  </div>
  )
}

export default App