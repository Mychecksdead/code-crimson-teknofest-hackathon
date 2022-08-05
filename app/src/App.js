import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './Components/Nav';
import Info from './Components/Info';
import Bags from './Components/Info';


function App() {
  return (
    <Router>
      <div className="App">
        <Nav></Nav>
        <Routes>
          <Route exact path='/' exact element={
            <Info></Info>
          }></Route>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
