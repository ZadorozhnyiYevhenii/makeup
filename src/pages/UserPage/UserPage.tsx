import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useAppSelector } from "../../app/hooks"
import { removeUser } from '../../app/slices/userSlice';
import './UserPage.scss';
import { useForm } from "react-hook-form";
import { IUser } from "../../types/IUser";
import { useState } from "react";
import cn from 'classnames';
import { userTabs } from "../../utils/userTabs";
import { TabWrapper } from "../../components/TabWrapper/TabWrapper";
import { UserInformationChangingForm } from "../../components/UserInformationChangingForm.tsx/UserInformationChangingForm.tsx";

export const UserPage = () => {
  const [activeTab, setActiveTab] = useState(userTabs.CONTACT);
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { isLoading, errors },
    handleSubmit
  } = useForm<IUser>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      birthdayDate: user?.birthdayDate,
    }
  });

  const logout = () => {
    dispatch(removeUser(user));
    navigate(-1);
  };

  const onSubmit = () => {
    alert('changes are submited')
  }

  return (
    <div className="user">
      <nav className="user__nav">
        <div
          className={cn("user__tab", { 'active': activeTab === userTabs.CONTACT })}
          onClick={() => setActiveTab(userTabs.CONTACT)}
        >
          Contacts information
        </div>
        <button onClick={logout} className="user__logout">
          Log out
        </button>
      </nav>
      <div className="user__content">
        <TabWrapper activeTab={activeTab === userTabs.CONTACT}>
          <UserInformationChangingForm
            register={register}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
          />
        </TabWrapper>
      </div>
    </div>
  );
};