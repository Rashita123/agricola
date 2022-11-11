import { useState } from "react"
import { ModalComponent } from "./ModalComponent"
export const EachLoan = ({ request, handleRepay }) => {
    const [modalDisplay, setModalDisplay] = useState(false);
    const openModal = () => {
        setModalDisplay(true);
    }
    return (
        <>
            {modalDisplay && <ModalComponent modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} request={request} />}
            <tr class="bg-white w-full">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 overflow-ellipsis w-1 cursor-pointer">
                    {request.loanId}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 overflow-ellipsis w-1">
                    {request.loanAmount}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 overflow-ellipsis w-1">
                    {request.status}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span class="relative z-0 inline-flex shadow-sm rounded-md">
                        <button onClick={openModal} type="button" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-green-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                            Details
                        </button>
                        {request.status === 'Paid to Borrower' && <button onClick={() => handleRepay(request.loanId)} type="button" class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-red-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                            Repay
                        </button>}

                    </span>
                </td>
            </tr>
        </>
    )
}