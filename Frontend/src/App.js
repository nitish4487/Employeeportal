
import './style/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Admin from './component/Admin';
import Home from './component/Home';
import './style/Home.css';
import Msignup from './component/Msignup'
import Esignup from './component/Esignup';
import Esign from './component/Esign';
import Msign from './component/Msign';
import Employee from './component/Employee';
import EmployeePL from './component/EmployeePL';
import Applyleave from './component/Applyleave';
function App() {
  return (
    <div >
      <Router>
        <div className='container-fluid'>
          <Routes>
            <Route exact path='/Esignup' element={<Esignup />}></Route>
            <Route exact path='/Applyleave' element={<Applyleave />}></Route>
            <Route exact path='/Msignup' element={<Msignup />}></Route>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/Esign' element={<Esign />}></Route>
            <Route exact path='/Msign' element={<Msign />}></Route>
            <Route exact path='/EmployeePage' element={<EmployeePL />}></Route>
            <Route path='/EmployeeDashboard' element={<Employee />}></Route>
            <Route path='/AdminPage' element={<Admin />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
