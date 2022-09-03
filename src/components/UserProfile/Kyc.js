export const Kyc = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="bg-indigo-50 p-10 h-full rounded-3xl">
      <div className="w-full h-full">
        <main className="flex w-5/6 mx-auto">
          <div className="mx-auto px-4 sm:px-6 md:px-8">
            <div className="bg-white rounded-3xl p-10 shadow-xl">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-2xl font-medium leading-6 text-gray-900">
                    KYC Details
                  </h3>
                  <p className="mt-2 h-14 text-base text-gray-600">
                    We do not collect your personal information without your
                    consent.
                    <br /> <br />
                    What you fill here is not sent to any servers without your
                    consent.
                  </p>
                </div>

                <div className="mt-5 md:mt-0 md:col-span-2">
                  <form onSubmit={submitHandler}>
                    <div className="grid grid-cols-8 gap-6 w-2/3 mx-auto">
                      <div className="col-span-8">
                        <label
                          htmlFor="aadhaar"
                          className="block text-base font-medium text-gray-700 text-left"
                        >
                          Aadhaar Number
                        </label>
                        <input
                          //  formControlName="aadhaar"
                          type="text"
                          minLength={12}
                          maxLength={12}
                          name="aadhaar"
                          id="aadhaar"
                          autoComplete="off"
                          className="mt-1 h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md border px-3"
                          required
                        />
                      </div>

                      <div className="col-span-8">
                        <label
                          htmlFor="last-name"
                          className="block text-base font-medium text-gray-700 text-left"
                        >
                          PAN Number
                        </label>
                        <input
                          //  formControlName="pan"
                          type="text"
                          name="pan"
                          id="pan"
                          minLength={10}
                          maxLength={10}
                          autoComplete="pan"
                          className="mt-1 h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md border px-3"
                          required
                        />
                      </div>

                      <div className="col-span-8">
                        <label
                          htmlFor="income"
                          className="block text-base font-medium text-gray-700 text-left"
                        >
                          Annual Income
                        </label>
                        <input
                          //  formControlName="income"
                          type="number"
                          name="income"
                          id="income"
                          autoComplete="off"
                          className="mt-1 h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md border px-3"
                          required
                        />
                      </div>

                      <div className="col-span-8">
                        <label
                          htmlFor="occupation"
                          className="block text-base font-medium text-gray-700 text-left"
                        >
                          Occupation
                        </label>
                        <input
                          //  formControlName="occupation"
                          type="text"
                          name="occupation"
                          id="occupation"
                          autoComplete="occupation"
                          className="mt-1 h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md border px-3"
                          required
                        />
                      </div>

                      <div className="col-span-8">
                        <label
                          htmlFor="about"
                          className="block text-base font-medium text-gray-700 text-left"
                        >
                          About
                        </label>
                        <textarea
                          //  formControlName="about"
                          id="about"
                          name="about"
                          rows="3"
                          className="mt-1 max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md border px-3"
                        ></textarea>
                        <p className="mt-2 text-sm text-gray-400 text-left">
                          Write a few sentences about yourself.
                        </p>
                      </div>

                      <div className="col-span-8">
                        <button
                          type="submit"
                          className="inline-flex w-1/2 items-center justify-center px-6 py-3 border border-transparent font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
