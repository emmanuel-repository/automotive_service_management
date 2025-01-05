import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  const dataSession = localStorage.getItem('sessionData');

  if (dataSession === null) {
    return <Navigate to="/" replace />
  }

  if (dataSession !== null) {
    const now = Math.floor(Date.now() / 1000); // Fecha actual en segundos
    const dataSessionParse = JSON.parse(dataSession);
    const decodeToken = jwtDecode(dataSessionParse.token);

    if (decodeToken.exp < now) {
      localStorage.removeItem('quintaapp');
     return <Navigate to="/" replace />
    }
  }

  return children

}
