import { BrowserRouter as Router, Route, Routes,Link} from 'react-router'
import './App.css'
import Detalle from './components/Detalle'
import Favoritos from './components/Favoritos'
import Home from './components/Home'
import Informativa from './components/Informativa'
import Original from './components/Original'

function App() {

  return (
    <>
      <Router>
        <nav className='c-menu'>
          <Link to ="/">Home</Link>
          <Link to ="/favoritos">Favoritos</Link>
          <Link to ="/informativa">Informativa</Link>
          <Link to ="/original">Original</Link>
        </nav>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/detalle/:detalle' element={<Detalle/>}/>
          <Route path='/favoritos' element={<Favoritos/>}/>
          <Route path='/informativa' element={<Informativa/>}/>
          <Route path='/original' element={<Original/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
