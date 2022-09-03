import { EachRequest } from "./EachRequest"
export const Request = () => {
    const pendingRequests = [
        {
            id:1,
            user: "0xa78e7750a4159b95862607badea195de4018d4c9",
            type: "Farmer",
        },
        {
            id:2,
            user: "0xf78e7750a4159b95862678badea195de4018d4c9",
            type: "Staker",
        },
        {
            id:3,
            user: "0xb78e757850a4159b95862678badea195de4018d4c9",
            type: "Lender",
        },
    ]
    return(

        <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 w-1/2 align-middle inline-blocksm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg w-fit">
                        <table class="divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User ID
                                    </td>
                                    <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </td>
                                    <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Details
                                    </td>
                                    <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vote
                                    </td>
                                </tr>
                            </thead> 
                            <tbody class="min-w-full">
                                {
                                    pendingRequests.map(request => {
                                        return(
                                            <EachRequest request={request}/>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

                        

    )
}