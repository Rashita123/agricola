import { useState } from "react";
import { BorrowRequest } from "./BorrowRequest"
export const BorrowPage = () => {
    const [ borrowOrRepay, setBorrowOrRepay ] = useState('borerow');
    return(
        <div class="flex flex-row bg-indigo-50 p-6 min-h-screen m-auto w-full">
        <div class="w-full h-full">
            <main class="main flex w-full">
                <div class="px-4 sm:px-6 md:px-8 w-3/5 m-auto">
                    <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Create Borrow Request
                    </h2>
                    <div class="w-full h-full my-5">
                        <button onClick={() => setBorrowOrRepay('borrow')} type="button" class="mr-3 inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            New Loan
                            <svg class="ml-3 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <button onClick={() => setBorrowOrRepay('repay')} type="button" class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Repay
                            <svg class="ml-3 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        {borrowOrRepay === 'borrow' && <div class="min-w-full shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-5">
                            <table class="divide-y divide-gray-200">
                                <tbody class="min-w-full">
                                        <BorrowRequest/>
                                </tbody>
                            </table>
                        </div>}
                    </div>
                </div>
            </main>
        </div>
    </div>
    )
}