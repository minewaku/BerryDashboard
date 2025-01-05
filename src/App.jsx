import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from '~/layouts/';
import Dashboard from '~/layouts/components/Dashboard';
import { Posts, Login, Register, Logout, Test } from '~/pages';
import { AuthRoute, ProtectedRoute } from './routes';
import { store } from '~/store/redux/store';
import { useContext } from 'react';
import { ThemeContext } from '~/store/context';

const App = () => {
   const { theme } = useContext(ThemeContext);
   console.log('auth: ', store.getState().auth);

   return (
      <div className={`${theme.mode} ${theme.theme}`}>
         <BrowserRouter>
            <Routes>
               <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<DefaultLayout />}>
                     <Route index element={<Dashboard />} />
                     <Route path="/posts" element={<Posts />} />

                     <Route path="/logout" element={<Logout />} />
                  </Route>
               </Route>

               <Route element={<AuthRoute />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
               </Route>

               <Route path="/test" element={<Test />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
};

export default App;
