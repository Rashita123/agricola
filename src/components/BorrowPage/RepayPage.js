import { EachLoan } from "./EachLoan"
export const RepayPage = ({ loanData, handleRepay }) => {
    const loans = loanData
    return (
        <div class="flex flex-row bg-indigo-50 h-full">
            <div class="w-full h-full">
                <main class="main flex w-full">
                    <div class="mx-auto w-full h-full">
                        <div class="w-full h-full">
                            <div class="bg-white rounded-lg p-10">
                                <div class="space-y-8 sm:space-y-5">
                                    <div>
                                        <div>
                                            <h3 class="text-lg leading-6 font-medium text-gray-900">
                                                Repay Loans
                                            </h3>
                                            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                                                Below is the list of all the loans taken by you. Expand to see all the details, and repay the loan.
                                            </p>
                                        </div>


                                        <h3 class="text-lg leading-6 font-medium text-gray-900 mt-10">
                                            Loans
                                        </h3>

                                        <table class="divide-y divide-gray-200 mt-5">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Loan ID
                                                    </td>
                                                    <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Loan Amount
                                                    </td>
                                                    <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </td>
                                                    <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Repay
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody class="min-w-full">
                                                {
                                                    loans.map(request => {
                                                        return (
                                                            <EachLoan handleRepay={handleRepay} key={request?.loanId} request={request} />
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
