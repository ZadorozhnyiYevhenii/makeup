import { useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({
  path,
  element
}: {
  path: string,
  element: JSX.Element
}) => {
  const userJWT = useAppSelector((state) => state.user.userJWT);

  return userJWT ? element : <Navigate to="/makeup" replace />;
};
