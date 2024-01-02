import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useAppSelector } from "../../app/hooks"
import { removeUser } from '../../app/slices/userSlice';


export const UserPage = () => {
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const logout = () => {
    dispatch(removeUser(user));
    navigate(-1);
  };

  return (
    <div>
      <div>{user?.firstName}</div>
      <div>{user?.lastName}</div>
      <div>{user?.email}</div>
      <div>{user?.phoneNumber}</div>
      <div>{user?.birthdayDate}</div>
      <button onClick={logout}>
        Log out 
      </button>
    </div>
  );
};