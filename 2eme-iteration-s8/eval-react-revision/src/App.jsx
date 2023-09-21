import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MovieList from './component/MovieList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MovieList />
    </>
  )
}

export default App
