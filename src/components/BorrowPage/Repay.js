import { useState } from "react";
import { Request } from "../AdminPage/Request";
import { EachLoan } from "./EachLoan";

const pendingRequests = [
  {
    id: 1,
    loan: "0xa78e7750a4159b95862607badea195de4018d4c9",
    dueDate: "10-10-2022",
  },
  {
    id: 2,
    loan: "0xf78e7750a4159b95862678badea195de4018d4c9",
    dueDate: "10-11-2022",
  },
  {
    id: 3,
    loan: "0xb78e757850a4159b95862678badea195de4018d4c9",
    dueDate: "10-12-2022",
  },
];

export const Repay = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div class="flex flex-row bg-indigo-50 h-full">
      <div class="w-full h-full">
        <main class="main flex w-full">
          <div class="mx-auto w-full h-full">
            <div class="w-full h-full">
              <div class="bg-white rounded-lg p-10">
                <form class="space-y-8">
                  <div class="space-y-8 sm:space-y-5">
                    <div>
                      <div>
                        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-5 text-center">
                          Active Loans
                        </h1>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500 text-center">
                          List of your past loans.
                        </p>
                      </div>
                    </div>

                    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                      <div class="space-y-6 sm:space-y-5">
                        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                          <div className="w-full">
                            <table class="divide-y divide-gray-200 m-auto">
                              <thead class="bg-gray-50">
                                <tr>
                                  <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Load ID
                                  </td>
                                  <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Due date
                                  </td>
                                  <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Details
                                  </td>
                                  <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                  </td>
                                </tr>
                              </thead>
                              <tbody class="min-w-full">
                                {pendingRequests.map((request) => {
                                  return <EachLoan request={request} />;
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="pt-5">
                    <div class="flex justify-end">
                      <button
                        type="submit"
                        class="ml-3 inline-flex justify-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

//     <div class="p-6 min-h-screen m-auto w-full bg-white">
//       <main class="w-full">
//         <div class="mx-auto px-6">
//           <div className="text-center">
//             <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-5">
//               Active Loans
//             </h2>
//           </div>
//           <div className="bg-indigo-50">
//             <table className="divide-y divide-gray-200">
//               <thead className="bg-gtay-50">
//                 <tr>
//                   <td></td>
//                 </tr>
//               </thead>
//             </table>
//           </div>
//         </div>
//       </main>
//     </div>
