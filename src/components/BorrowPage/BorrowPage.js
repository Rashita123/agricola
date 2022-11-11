import React, { useEffect, useState } from 'react'
import { UseAuthenticationContext } from '../../context/AuthenticationContext'
import { ACTIONS } from '../../reducers/AuthenticationReducer'
import { USER_PROFILE } from '../../utilities/constants'
import { BasicModal } from '../global'
import { BorrowRequest } from './BorrowRequest'
import { RepayPage } from './RepayPage'

import { normalize, denormalize, getStatus } from '../../utilities/web3'
import config from '../../config'
import * as ethers from 'ethers'
const { BigNumber } = ethers

export const BorrowPage = () => {
  const { userState, userDispatch } = UseAuthenticationContext()
  const [borrowOrRepay, setBorrowOrRepay] = useState('borrow')
  const [displayModal, setDisplayModal] = useState(true)

  const [numLoans, setNumLoans] = useState(null)

  const [loanData, setLoanData] = useState(null)

  const [instances, setInstances] = useState(null)

  const userAddress = localStorage.getItem('metamask-account')


  useEffect(() => {
    console.log('hi', instances)
    if (!instances) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const lendInstance = new ethers.Contract(
        config.lend.address,
        config.lend.abi,
        provider.getSigner()
      )
      const usdcInstance = new ethers.Contract(
        config.usdc.address,
        config.usdc.abi,
        provider.getSigner()
      )
      console.log('setting instances')
      setInstances((window.instances = { lendInstance, usdcInstance }))
      window.normalize = normalize
      window.denormalize = denormalize
    }
  }, [])

  useEffect(() => {
    console.log(!instances, numLoans !== null, numLoans)
    if (!instances || numLoans !== null) return

      ; (async () => {
        let loans = await instances.lendInstance.LOAN_ID()
        if (!loans) return
        loans = loans.toString()
        console.log({ loans })
        const loanDataArray = []
        for (let i = parseInt(loans); i >= 0; i--) {
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
          const loanData = {
            loanId: i?.toString(),
            Borrower: borrower,
            noOfVotes: currentVoteCount?.toString(),
            status: getStatus(active, approved, paid, repayed, liquidated),
            principle: `${normalize(principal?.toString())} USDC`,
            Roi: roi?.toString(),
            loanAmount: `${parseInt(normalize(totalAmount?.toString())).toFixed(2)} USDC`,
            duration: loanTerm?.toString(),
            info: info,
            typeOfLoan,
            totalVotesRequired: totalVotesRequired?.toString()
          }
          console.log(i, loanData)
          if (borrower?.toLowerCase() === userAddress?.toLowerCase()) {
            setNumLoans(i.toString())
            loanDataArray.push(loanData)
            setLoanData(loanDataArray)
            console.log('set numloans ')
            break;
          }
        }
      })()
  })

  useEffect(() => {
    if (userState.kycCompleted) {
      setDisplayModal(false)
    } else {
      setDisplayModal(true)
    }
  }, [])

  const handleRepay = async (_loanId) => {
    console.log({ _loanId })
    if (_loanId === null) return

    await instances.lendInstance.payBack(BigNumber.from(_loanId))
  }

  return (
    <React.Fragment>
      {/* {displayModal && (
        <BasicModal
          title="Complete Your KYC first"
          description="You have to complete your KYC before taking any loan. Click the button below to proceed further."
          display={displayModal}
          link={`/${USER_PROFILE.KYC_PATH}`}
        />
      )} */}

      <div className="flex flex-row bg-indigo-50 p-6 min-h-screen m-auto w-full">
        <div className="w-full h-full">
          <main className="main flex w-full">
            <div className="px-4 sm:px-6 md:px-8 w-3/5 m-auto">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Create Borrow Request
              </h2>
              <div className="w-full h-full my-5">
                <button
                  onClick={() =>
                    borrowOrRepay === 'borrow'
                      ? setBorrowOrRepay('repay')
                      : setBorrowOrRepay('borrow')
                  }
                  type="button"
                  className="mr-3 inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  New Loan
                  <svg
                    className="ml-3 -mr-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>

                {borrowOrRepay === 'borrow' && (
                  <div className="min-w-full shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-5">
                    <table className="divide-y divide-gray-200">
                      <tbody className="min-w-full">
                        <BorrowRequest />
                      </tbody>
                    </table>
                  </div>
                )}

                {numLoans === null
                  ? 'No existing loans'
                  : `${parseInt(numLoans) + 1} existing loan(s):   `}
                {numLoans !== null && (
                  <div>
                    <button
                      onClick={handleRepay}
                      type="button"
                      className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Repay LoanID: {parseInt(numLoans)}
                      <svg
                        className="ml-3 -mr-1 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>

                    <div className="min-w-full shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-5">
                      <table className="divide-y divide-gray-200">
                        <tbody className="min-w-full">
                          <RepayPage handleRepay={handleRepay} loanData={loanData} />
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  )
}
