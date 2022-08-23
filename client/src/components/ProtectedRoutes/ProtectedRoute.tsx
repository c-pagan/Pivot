import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactNode, useEffect } from "react";
import { RootState } from "../../Redux/store";
import useCheckAuthentication from "../../Hooks/useCheckAuthentication"


function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useCheckAuthentication();

  useEffect(() => {
    !isLoggedIn && navigate("/signup");
  }, [isLoggedIn, navigate]);

  return isLoggedIn && children;
};

export default ProtectedRoute;
