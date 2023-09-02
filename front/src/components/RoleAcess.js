import { Navigate, Outlet } from "react-router-dom";
import jwt from "jwt-decode";

function getCookie(key) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

const RoleAccess = ({ roles = [] }) => {
  const token = getCookie("_auth");

  const user = jwt(token);

  console.log(user);
  return !roles.length || roles.includes(user?.TypeId) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default RoleAccess;
