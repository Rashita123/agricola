import { useState } from "react";

export const BorrowRequest = () => {
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
                        {/* <h1 className="leading-6 font-medium text-gray-900 text-3xl text-center mb-3"> */}
                        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-5 text-center">
                          Loan Request
                        </h1>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">
                          This information will be used by stakers to approve
                          your request, ensure the details are true to your
                          knowledge.
                        </p>
                      </div>
                    </div>

                    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                      <div class="space-y-6 sm:space-y-5">
                        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label
                            for="last-name"
                            class="block text-base font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Loan Amount
                          </label>
                          <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <div class="mt-1 relative rounded-md shadow-sm max-w-sm">
                              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span class="text-gray-500 text-base font-medium">
                                  $
                                </span>
                              </div>
                              <input
                                formControlName="loanAmount"
                                type="text"
                                name="price"
                                id="price"
                                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full h-14 pl-7 pr-12 sm:text-sm border border-gray-300 rounded-md"
                                placeholder="0"
                              />
                              <div class="absolute inset-y-0 right-0 flex items-center">
                                <label for="currency" class="sr-only">
                                  Currency
                                </label>
                                <select
                                  formControlName="loanCurrency"
                                  id="currency"
                                  name="currency"
                                  class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                                >
                                  <option>USD</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label
                            for="last-name"
                            class="block text-base font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Loan Term
                          </label>
                          <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <div class="mt-1 relative rounded-md shadow-sm max-w-sm">
                              <input
                                formControlName="termValue"
                                type="text"
                                name="price"
                                id="price"
                                class=" border focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 h-14 pr-12 text-base font-medium sm:text-sm border-gray-300 rounded-md"
                                placeholder="0"
                              />
                              <div class="absolute inset-y-0 right-0 flex items-center">
                                <label for="currency" class="sr-only">
                                  Currency
                                </label>
                                <select
                                  formControlName="termType"
                                  id="currency"
                                  name="currency"
                                  class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent text-base font-medium bg-transparent text-gray-500 sm:text-sm rounded-md"
                                >
                                  <option>Days</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label
                            for="email"
                            class="block text-base font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Give us more information on why you require the
                            loan.
                          </label>
                          <div class="mt-1">
                            <textarea
                              formControlName="loanDescription"
                              rows="4"
                              name="comment"
                              id="comment"
                              class="border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                      <div>
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                          Loan for Agriculture?
                        </h3>
                        <p class="mt-1 max-w-2xl text-base text-gray-500">
                          Special rate of interests and other benefits.
                        </p>
                      </div>
                      <label
                        for="default-toggle"
                        class="inline-flex relative items-center cursor-pointer"
                      >
                        <input
                          onClick={() => setToggle((toggle) => !toggle)}
                          type="checkbox"
                          value=""
                          id="default-toggle"
                          class="sr-only peer"
                        />
                        <div class="w-11 h-6 bg-indigo-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-600 dark:peer-focus:ring-indigo-600 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-700"></div>
                      </label>
                      {toggle && (
                        <div class="space-y-6 sm:space-y-5 divide-y divide-gray-200">
                          <div class="pt-6 sm:pt-5">
                            <div
                              role="group"
                              aria-labelledby="label-notifications"
                            >
                              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                                <div>
                                  <div
                                    class="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                                    id="label-notifications"
                                  >
                                    Type of Agricultural loan
                                  </div>
                                </div>
                                <div class="sm:col-span-2">
                                  <div class="max-w-lg">
                                    <p class="text-base text-gray-500">
                                      One can avail a loan for the following
                                      activities related to agriculture:
                                    </p>
                                    <div class="mt-4 space-y-4">
                                      <div class="flex items-center">
                                        <input
                                          formControlName="agriLoanType"
                                          id="push-everything"
                                          name="agriLoanType"
                                          type="radio"
                                          value="Running day to day operations"
                                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label
                                          for="push-everything"
                                          class="ml-3 block text-base font-medium text-gray-700"
                                        >
                                          Running day to day operations
                                        </label>
                                      </div>
                                      <div class="flex items-center">
                                        <input
                                          formControlName="agriLoanType"
                                          id="push-email"
                                          name="agriLoanType"
                                          type="radio"
                                          value="Buying farm machinery such as tractors, harvesters, et cetera"
                                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label
                                          for="push-email"
                                          class="ml-3 block text-base font-medium text-gray-700"
                                        >
                                          Buying farm machinery such as
                                          tractors, harvesters, et cetera
                                        </label>
                                      </div>
                                      <div class="flex items-center">
                                        <input
                                          formControlName="agriLoanType"
                                          id="push-nothing"
                                          name="agriLoanType"
                                          type="radio"
                                          value="Purchasing land"
                                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label
                                          for="push-nothing"
                                          class="ml-3 block text-base font-medium text-gray-700"
                                        >
                                          Purchasing land
                                        </label>
                                      </div>

                                      <div class="flex items-center">
                                        <input
                                          formControlName="agriLoanType"
                                          id="push-nothing"
                                          name="agriLoanType"
                                          type="radio"
                                          value="Storage purposes"
                                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label
                                          for="push-nothing"
                                          class="ml-3 block text-base font-medium text-gray-700"
                                        >
                                          Storage purposes
                                        </label>
                                      </div>

                                      <div class="flex items-center">
                                        <input
                                          formControlName="agriLoanType"
                                          id="push-nothing"
                                          name="agriLoanType"
                                          type="radio"
                                          value="Product marketing loans"
                                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label
                                          for="push-nothing"
                                          class="ml-3 block text-base font-medium text-gray-700"
                                        >
                                          Product marketing loans
                                        </label>
                                      </div>

                                      <div class="flex items-center">
                                        <input
                                          formControlName="agriLoanType"
                                          id="push-nothing"
                                          name="agriLoanType"
                                          type="radio"
                                          value="Expansion"
                                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label
                                          for="push-nothing"
                                          class="ml-3 block text-base font-medium text-gray-700"
                                        >
                                          Expansion
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div class="pt-3">
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
