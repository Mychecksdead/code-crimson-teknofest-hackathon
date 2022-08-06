import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PortAdminInfo from './Components/PortAdminInfo';
import Info from './Components/Info';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' exact element={
            <Info></Info>
          }></Route>
          <Route exact path='/portadmin' exact element={
            <PortAdminInfo></PortAdminInfo>
          }></Route>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
