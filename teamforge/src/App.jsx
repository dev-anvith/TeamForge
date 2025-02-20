import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import TeamForgeLanding from './Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <TeamForgeLanding></TeamForgeLanding>
    </>
  )
}

export default App
