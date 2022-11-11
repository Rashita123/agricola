import { useState, useEffect } from "react"
import * as ethers from 'ethers'
import config from '../../config'
import { normalize, denormalize, getStatus } from "../../utilities/web3";
import { ModalComponent } from "./ModalComponent";
const { BigNumber } = ethers

export const EachRequest = ({ setModalInfo, request, handleVoteYes }) => {
    return (
        <>
            <tr class="bg-white w-full">
                <td onClick={e => setModalInfo({ openModal: true, userId: null })} class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 overflow-ellipsis w-1 cursor-pointer">
                    {request.borrower}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 overflow-ellipsis w-1">
                    {request.status}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 overflow-ellipsis w-1">
                    {request.voteCount}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {['Loan Repayed', 'Paid to Borrower', 'Loan Liquidated', 'Loan Finished'].includes(request.status) ? 'Cannot Vote' : <span class="relative z-0 inline-flex shadow-sm rounded-md">
                        <button onClick={() => handleVoteYes(request)} type="button" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-green-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <button type="button" class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-red-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        </button>
                    </span>}

                </td>
            </tr>
        </>
    )
}

let run = true


export const StakeLoans = ({ setNumloans, modalInfo, setModalInfo, numLoans }) => {
    const [instances, setInstances] = useState(null);
    const [loans, setLoans] = useState([])

    const [pendingRequests, setPendingRequests] = useState([])


    const userAddress = localStorage.getItem('metamask-account')


    useEffect(() => {
        if (!instances) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const lendInstance = new ethers.Contract(config.lend.address, config.lend.abi, provider.getSigner())
            const usdcInstance = new ethers.Contract(config.usdc.address, config.usdc.abi, provider.getSigner())
            console.log('setting instances')
            setInstances(window.instances = { lendInstance, usdcInstance })
            window.normalize = normalize
            window.denormalize = denormalize
        }
    }, [])

    useEffect(() => {
        console.log({ numLoans })
        if (!instances || numLoans !== null) return
        (async () => {
            const loanId = await instances.lendInstance.LOAN_ID()
            setNumloans(loanId?.toString() || 0)
            console.log({ loanId })
            const loansData = []
            for (let i = BigNumber.from(0); i.lt(loanId); i = i.add(1)) {
                const data = await instances.lendInstance.loans(i)
                const {
                    active,
                    approved,
                    paid,
                    repayed,
                    liquidated,
                    borrower,
                    principal,
                    roi,
                    totalAmount,
                    loanTerm,
                    info,
                    typeOfLoan,
                    currentVoteCount,
                    totalVotesRequired
                } = data

                loansData.push({
                    loanId: i.toString(),
                    borrower: borrower,
                    status: getStatus(active, approved, paid, repayed, liquidated),
                    voteCount: `${String(currentVoteCount)} / 0 / ${String(totalVotesRequired)}`,
                    noOfVotes: currentVoteCount?.toString(),
                    principle: `${normalize(principal?.toString())} USDC`,
                    Roi: roi?.toString(),
                    loanAmount: `${parseInt(normalize(totalAmount?.toString())).toFixed(2)} USDC`,
                    duration: loanTerm?.toString(),
                    info: info,
                    typeOfLoan
                })
            }
            setLoans(loansData)
            setPendingRequests(loansData)
            run = false
        })()
    }, [instances, userAddress, setNumloans, loans, numLoans])

    const handleVoteYes = async ({ loanId }) => {
        console.log('hiiii', loanId)
        if (!instances) return
        await instances.lendInstance.logVote(loanId, denormalize(10))
    }

    return (
        <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="min-w-full shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="divide-y divide-gray-200">
                            <div class="min-w-full">



                                <table class="divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Borrower Address
                                            </td>
                                            <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </td>
                                            <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Vote Count (Yay/Nay/Required)
                                            </td>
                                            <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Vote
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody class="min-w-full">
                                        {
                                            pendingRequests.map(request => {
                                                return (
                                                    <EachRequest setModalInfo={setModalInfo} request={request} handleVoteYes={handleVoteYes} />
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </table>
                        {modalInfo.openModal && false && <ModalComponent pendingRequests={pendingRequests.allRequests} setModalInfo={setModalInfo} modalInfo={modalInfo} />}

                    </div>
                </div>
            </div>
        </div>

    )
}