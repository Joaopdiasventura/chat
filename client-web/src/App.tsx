import { BrowserRouter, Routes, Route,} from 'react-router-dom'
import { Enter } from './pages/enter'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/enter" element={<Enter />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
