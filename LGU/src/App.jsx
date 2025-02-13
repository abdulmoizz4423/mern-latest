import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import Deposit from './Deposit'
import Welcome from './Welcome'

import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Withdrawal from './Withdrawal'
import Sendemail from './Sendemail'
import Sendsms from './Sendsms'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register'   element={<Signup />}>  </Route>
          <Route path='/send-email'   element={<Sendemail />}>  </Route>
          <Route path='/send-sms'   element={<Sendsms />}>  </Route>
          <Route path='/login'   element={<Login />}>  </Route> 
          <Route path='/home'   element={<Home />}>  </Route>   
          <Route path='/deposit'   element={<Deposit />}>  </Route>   
          <Route path='/withdrawal'   element={<Withdrawal />}>  </Route>   
          <Route path='/'   element={<Welcome />}>  </Route>   
                          
        </Routes>
      </BrowserRouter>
      
    </div>
      
  )
}
export default App

