import { Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Profile } from "../../components/UserProfile";
import { Kyc } from "../../components/UserProfile/Kyc";
import { USER_PROFILE } from "../../utilities/constants";

export const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const modalViewHandler = (event) => {
    event.preventDefault();
    const id = event.target.id;
    navigate(`/${id}`);
  };

  return (
    <div className="mx-auto bg-indigo-50 overflow-hidden">
      <div className="flex justify-center pt-7">
        <div
          className="mr-10 cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={modalViewHandler}
          id={USER_PROFILE.PROFILE_PATH}
        >
          Profile
        </div>
        <div
          className="mr-10 cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={modalViewHandler}
          id={USER_PROFILE.KYC_PATH}
        >
          Complete Your KYC
        </div>
      </div>
      <div className="p-0 m-0">
        {location.pathname === `/${USER_PROFILE.PROFILE_PATH}` ? (
          <Profile />
        ) : (
          <Kyc />
        )}
      </div>
    </div>
  );
};
