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
      <h2>statistics</h2>
      <Value type="good" value={good} />
      <Value type="neutral" value={neutral} />
      <Value type="bad" value={bad} />
    </div>
  )
}

export default App