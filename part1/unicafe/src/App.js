import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Value = ({ type, value }) => (
  <p>
    {type} {value}
  </p>
)

const Statistics = ({ good, neutral, bad }) => {
  const average = ( good - bad ) / ( good + neutral + bad );
  const positiveRate = ( good / ( good + neutral + bad ) ) * 100;

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h2>statistics</h2>
      <Value type="good" value={good} />
      <Value type="neutral" value={neutral} />
      <Value type="bad" value={bad} />
      <Value type="average" value={average} />
      <Value type="positive" value={positiveRate + "%"} />
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increment = (value, setValue) => () => {
    setValue(value + 1);
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={increment(good, setGood)} text="good" />
      <Button onClick={increment(neutral, setNeutral)} text="neutral" />
      <Button onClick={increment(bad, setBad)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App