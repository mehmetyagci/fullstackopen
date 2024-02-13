import React, { useState } from 'react';

const MostVoted = ( {anecdotes, points} ) => {
  console.log('MostVoted')

  const maxPoint = Math.max(...points);
  console.log('maxPoint', maxPoint);

  const maxPointIndex = points.indexOf(maxPoint);
  console.log('maxPointIndex', maxPointIndex);

  if (maxPoint === 0) {
    return (
      <div>
      </div>
    )
  }
return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[maxPointIndex]}</p>
        <p>has {maxPoint} votes</p> 
      </div>
    )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  const handleNextAnecdote = () => {
    console.log('handleNextAnecdote');
    let randomNumber = Math.floor(Math.random() * anecdotes.length);  
    console.log('randomNumber', randomNumber)
    setSelected(randomNumber)
  };

  const handleVote = () => {
    console.log('handleVote');
    let randomAnecdote = document.getElementById('anecdote').textContent;  
    let itemIndex = anecdotes.indexOf(randomAnecdote);
    console.log('itemIndex', itemIndex)
    const copy = [...points ]
    copy[itemIndex] += 1 
    console.log('copy:', copy)
    console.log('copy type:', typeof copy);
    setPoints(copy)
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div id="anecdote">{anecdotes[selected]}</div>
      has {points[selected]} vote(s)
      <br/>
      <Button handleClick={() => handleVote()} text="vote" />
      <Button handleClick={() => handleNextAnecdote()} text="next anecdote" />
      <MostVoted anecdotes={anecdotes} points={points} />
    </div>
  )
}

export default App
