export const Profile = () => {
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
                    Personal Information
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
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-base font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          // formControlName="firstName"
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md border px-3"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-base font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <input
                          // formControlName="lastName"
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md border px-3"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="email-address"
                          className="block text-base font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          // formControlName="email"
                          type="email"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md border px-3"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-2">
                        <label
                          htmlFor="email-address"
                          className="block text-base font-medium text-gray-700"
                        >
                          Phone Number
                        </label>
                        <input
                          // formControlName="phone"
                          type="tel"
                          name="phone"
                          id="phone"
                          minLength={10}
                          maxLength={10}
                          autoComplete="phone"
                          className="mt-1 h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md border px-3"
                        />
                      </div>

                      {/* <div className="col-span-6 sm:col-span-3">
                        <label
                          for="country"
                          className="block text-base font-medium text-gray-700"
                        >
                          Country
                        </label>
                        <select
                          formControlName="country"
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 h-14 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                        >
                          <option>India</option>
                        </select>
                      </div> */}

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-base font-medium text-gray-700"
                        >
                          Street address
                        </label>
                        <input
                          // formControlName="streetAddress"
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="mt-1 h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md border px-3"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-base font-medium text-gray-700"
                        >
                          City
                        </label>
                        <input
                          // formControlName="city"
                          type="text"
                          name="city"
                          id="city"
                          autoComplete="address-level2"
                          className="mt-1 h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md border px-3"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-base font-medium text-gray-700"
                        >
                          State / Province
                        </label>
                        <input
                          // formControlName="state"
                          type="text"
                          name="state"
                          id="state"
                          autoComplete="address-level1"
                          className="mt-1 h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md border px-3"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-base font-medium text-gray-700"
                        >
                          ZIP / Postal code
                        </label>
                        <input
                          // formControlName="zip"
                          type="number"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="mt-1 h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md border px-3"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <button
                          type="submit"
                          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
