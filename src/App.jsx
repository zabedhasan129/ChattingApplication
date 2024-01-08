import React from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { ToastContainer  } from 'react-toastify';
import Home from "./pages/Home";
import ForgotPassword from "./components/ForgotPassword";
import RootLayout from "./components/RootLayout";
import Message from "./pages/Message";
import Notification from "./pages/Notification";
import Setting from "./pages/Setting";
import Logout from "./pages/Logout";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
          path="/"
          element={<Registration/>}
        />
        <Route
          path="/login"
          element={<Login/>}
        />
        <Route
          path="/forgotpassword"
          element={<ForgotPassword/>}
        />

      <Route
        path="/"
        element={<RootLayout/>}
        >
        <Route
          path="/home"
          element={<Home/>}
        />
        <Route
          path="/message"
          element={<Message/>}
        />
        <Route
          path="/notification"
          element={<Notification/>}
        />
        <Route
          path="/setting"
          element={<Setting/>}
        />
        <Route
          path="/logout"
          element={<Logout/>}
        />
        
      </Route>

        
        
        
    </Route>
  )
);

function App() {
  
    return (
    <>
       <RouterProvider router={router} />
       <ToastContainer/>
    </>
  )
}

export default App
