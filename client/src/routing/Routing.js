import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import PublicLayout from '../public/PublicLayout';
import PrivateLayout from '../private/PrivateLayout';
import Error404 from '../pages/Error404';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={ <PublicLayout /> }>
              <Route index element= { <SignIn /> } />
              <Route path="signin" element= { <SignIn /> } />
              <Route path="signup" element= { <SignUp /> } />
          </Route>
          <Route path="/control" element= { <PrivateLayout /> } >
              <Route index element = { <Home /> } />
              <Route path="home/:id" element = { <Home /> } />
          </Route>
          <Route path="*" element = { <Error404/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing;