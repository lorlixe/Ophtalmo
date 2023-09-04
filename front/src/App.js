import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Connexion from "./Page/Connection";
import Error from "./Page/Error";
import Slot from "./Page/Slot";
import NewSlot from "./Page/NewSlot";
import { RequireAuth } from "react-auth-kit";
import { AuthProvider } from "react-auth-kit";
import RoleAccess from "./Components/RoleAcess";

function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={true}
    >
      <Router>
        <Routes>
          <Route element={<RoleAccess roles={[1]}></RoleAccess>}>
            <Route
              path="/admin/newSlot"
              element={
                <RequireAuth loginPath="/slot">
                  <NewSlot />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="/" element={<Connexion />} />
          <Route path="/*" element={<Error />} />
          <Route
            path="/slot"
            element={
              <RequireAuth loginPath="/">
                <Slot />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
