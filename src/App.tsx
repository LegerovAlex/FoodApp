import { useState } from 'react'
import { Button } from './components/Button/Button'
import './styles/main.scss'



function App() {
  const [text, setText] = useState("asd")

   function handleclick() {
    setText("SUKA")
   }


  return (
    <>
    <Button size='big'  onClick={handleclick} >{text}</Button>
    </>
  )
}

export default App
