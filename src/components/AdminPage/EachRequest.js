import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../utilities/constants";

export const EachRequest = ({ request, setModalInfo, removeKycRequest }) => {
  const [display, setDisplay] = useState(true);
  const showModal = () => {
    setModalInfo({ openModal: true, userId: request.metamaskAccount });
  };
  const updateApprovalStatus = (approved, userId) => {
    removeKycRequest(userId, approved);
    (async () => {
      const response = axios.post(`${BASE_URL}/admin/kyc_verification_update`, {
        decision: approved,
        userMetamaskAccount: request.metamaskAccount,
      });
      if (response.ok) {
        setDisplay(false);
      }
    })();
  };
  return (
    <>
      {display && (
        <tr className="bg-white w-full">
          <td
            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 overflow-ellipsis w-1 cursor-pointer underline"
            onClick={showModal}
          >
            {request.metamaskAccount}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 overflow-ellipsis w-1">
            {request.fullName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
              <button
                type="button"
                onClick={() =>
                  updateApprovalStatus(true, request.metamaskAccount)
                }
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-green-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() =>
                  updateApprovalStatus(false, request.metamaskAccount)
                }
                className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-red-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
              </button>
            </span>
          </td>
        </tr>
      )}
    </>
  );
};
