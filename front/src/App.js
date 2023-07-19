import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Connexion from "./Page/Connection";
import Error from "./Page/Error";
import Slot from "./Page/Slot";
import { RequireAuth } from "react-auth-kit";
import { AuthProvider } from "react-auth-kit";

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
          <Route path="/" element={<Connexion />} />
          <Route path="/*" element={<Error />} />
          <Route
            path="/slot"
            element={
              <RequireAuth loginPath="/connexion">
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
