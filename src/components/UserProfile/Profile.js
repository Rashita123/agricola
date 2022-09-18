import { useEffect, useState } from "react";
import { fetchUserDetails, updateProfile } from "../../api/user";
import { UseAuthenticationContext } from "../../context/AuthenticationContext";
import { ACTIONS } from "../../reducers/AuthenticationReducer";

export const Profile = () => {
  const { userState, userDispatch } = UseAuthenticationContext();
  const [firstName, setFirstName] = useState(userState.firstName);
  const [lastName, setLastName] = useState(userState.lastName);
  const [email, setEmail] = useState(userState.email);
  const [phoneNumber, setPhoneNumber] = useState(userState.phoneNumber);
  const [streetAddress, setStreetAddress] = useState(userState.streetAddress);
  const [province, setProvince] = useState(userState.province);
  const [city, setCity] = useState(userState.city);
  const [zipCode, setZipCode] = useState(userState.zipcode);

  useEffect(() => {
    console.log("hiiii");

    const fetchProfile = async () => {
      const result = await fetchUserDetails();

      console.log("result   ", result.userDetails, result);

      if (!result.error) {
        userDispatch({
          type: ACTIONS.UPDATE_PROFILE_DATA,
          payload: result.userDetails,
        });
      }
    };

    fetchProfile();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(
      firstName,
      lastName,
      email,
      phoneNumber,
      streetAddress,
      province,
      city,
      zipCode
    );
    const result = await updateProfile(
      firstName,
      lastName,
      email,
      phoneNumber,
      streetAddress,
      province,
      city,
      zipCode
    );
    console.log("api done");
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
                  <form>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-base font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          required
                          value={firstName}
                          className="mt-1 h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md border px-3"
                          onChange={(e) => setFirstName(e.target.value)}
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
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
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
                          type="email"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                          type="tel"
                          name="phone"
                          id="phone"
                          minLength={10}
                          maxLength={10}
                          autoComplete="phone"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="mt-1 h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md border px-3"
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-base font-medium text-gray-700"
                        >
                          Street address
                        </label>
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          required
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
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
                          type="text"
                          name="city"
                          id="city"
                          autoComplete="address-level2"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
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
                          type="text"
                          name="state"
                          id="state"
                          autoComplete="address-level1"
                          required
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
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
                          type="number"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          required
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          className="mt-1 h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md border px-3"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <button
                          type="submit"
                          onClick={submitHandler}
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
