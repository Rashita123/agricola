import { useEffect, useState } from "react";
import { Request } from "./Request";
import { Modal, ModalComponent } from "./ModalComponent";
import { BASE_URL } from "../../utilities/constants";
import axios from "axios";

export const AdminPage = () => {
  const [kycDetails, setKycDetails] = useState({
    allRequest: [],
    totalCount: 0,
    totalApproved: 0,
    totalRejected: 0,
  });

  const [modalInfo, setModalInfo] = useState({ openModal: true, userId: null });

  useEffect(() => {
    (async () => {
      const result = await axios({
        method: "get",
        url: `${BASE_URL}/admin/fetch_pending_kyc`,
      });
      console.log(result);
      setKycDetails({
        allRequest: result.data.result.allRequest,
        totalCount: result.data.result.totalCount,
        totalApproved: result.data.result.totalApproved,
        totalRejected: result.data.result.totalRejected,
      });
    })();
  }, []);

  const removeKycRequest = (id, decision) => {
    console.log(id, decision);
    const updatedList = kycDetails.allRequest.filter(
      (obj) => obj.metamaskAccount !== id
    );
    if (decision === true) {
      setKycDetails({
        allRequest: updatedList,
        totalCount: kycDetails.totalCount,
        totalRejected: kycDetails.totalRejected,
        totalApproved: kycDetails.totalApproved + 1,
      });
    } else {
      setKycDetails({
        allRequest: updatedList,
        totalCount: kycDetails.totalCount,
        totalApproved: kycDetails.totalApproved,
        totalRejected: kycDetails.totalRejected + 1,
      });
    }
  };

  return (
    <div class="flex flex-row bg-indigo-50 p-6 min-h-screen m-auto w-full text-left">
      <div class="w-full">
        <main class="flex w-full">
          <div class="mx-auto px-4 sm:px-6 md:px-8">
            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Approve Requests
            </h2>
            <div class="w-full">
              <div>
                <div>
                  <dl class="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
                    <div class="px-10 py-6 flex flex-col justify-start align-start">
                      <div class="text-xl font-normal text-gray-900 text-left">
                        Total Approval Requests
                      </div>
                      <dd class="mt-4 flex justify-between items-baseline md:block lg:flex">
                        <div class="flex items-baseline text-3xl font-semibold text-indigo-600">
                          {kycDetails.totalCount}
                        </div>
                      </dd>
                    </div>
                    <div class="px-10 py-6">
                      <dt class="text-xl font-normal text-gray-900 text-left">
                        Approved Requests
                      </dt>
                      <dd class="mt-4 flex justify-between items-baseline md:block lg:flex">
                        <div class="flex items-baseline text-3xl font-semibold text-indigo-600">
                          {kycDetails.totalApproved}
                        </div>
                      </dd>
                    </div>
                    <div class="px-10 py-6">
                      <dt class="text-xl font-normal text-gray-900 text-left">
                        Rejected Requests
                      </dt>
                      <dd class="mt-4 flex justify-between items-baseline md:block lg:flex" />
                      <div class="flex items-baseline text-3xl font-semibold text-indigo-600">
                        {kycDetails.totalRejected}
                      </div>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="">
              <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mt-10 mb-5">
                Pending Requests
              </h2>

              {kycDetails.allRequest.length ? (
                <Request
                  pendingRequests={kycDetails.allRequest}
                  setModalInfo={setModalInfo}
                  removeKycRequest={removeKycRequest}
                />
              ) : (
                <h6 className="ml-20">No Request</h6>
              )}

              {modalInfo.openModal && modalInfo.userId && (
                <ModalComponent
                  pendingRequests={kycDetails.allRequest}
                  setModalInfo={setModalInfo}
                  modalInfo={modalInfo}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
