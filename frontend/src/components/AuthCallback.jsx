// ===== AuthCallback.jsx =====
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const tempToken = params.get("tempToken");

    if (token) {
      sessionStorage.setItem("token", token);
      console.log("Token:", token);
      
      navigate("/dashboard");
    } else if (tempToken) {
      sessionStorage.setItem("tempToken", tempToken);
      navigate(`/login?tempToken=${tempToken}`); // <-- pass token to URL
    } else {
      alert("Login failed. Please try again.");
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      Logging you in...
    </div>
  );
}

export default AuthCallback;
