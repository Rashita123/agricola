import { useEffect, useState } from "react"
import { Request } from "./Request"
import { Modal, ModalComponent } from "./ModalComponent";
import { BASE_URL } from "../../utilities/constants";
import axios from 'axios';
export const AdminPage = () => {
    const [ pendingRequests, setPendingRequests ] = useState([]);
    const [ modalInfo, setModalInfo ] = useState({openModal: true, userId: null})
    useEffect(()=>{
        (async() => {
            const response = await axios.get(`${BASE_URL}/admin/fetch_pending_kyc`);
            response.ok && setPendingRequests(response.result);
          })()
    },[])
    return(
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
                                                {pendingRequests.totalCount}
                                            </div>
                                        </dd>
                                    </div>
                                    <div class="px-10 py-6">
                                        <dt class="text-xl font-normal text-gray-900 text-left">
                                            Approved Requests
                                        </dt>
                                        <dd class="mt-4 flex justify-between items-baseline md:block lg:flex">
                                            <div class="flex items-baseline text-3xl font-semibold text-indigo-600">
                                                {pendingRequests.totalApproved}
                                            </div>
                                        </dd>
                                    </div>
                                    <div class="px-10 py-6">
                                        <dt class="text-xl font-normal text-gray-900 text-left">
                                            Rejected Requests
                                        </dt>
                                        <dd class="mt-4 flex justify-between items-baseline md:block lg:flex"/>
                                            <div class="flex items-baseline text-3xl font-semibold text-indigo-600">
                                                {pendingRequests.totalRejected}
                                            </div>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        </div>
                        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mt-10 mb-5">
                            Pending Requests
                        </h2>
                        <Request pendingRequests={pendingRequests.allRequests} setModalInfo={setModalInfo}/>
                        {modalInfo.openModal && modalInfo.userId && <ModalComponent pendingRequests={pendingRequests.allRequests} setModalInfo={setModalInfo} modalInfo={modalInfo}/>}
                </div>
            </main>
        </div>
        </div>
    )
}