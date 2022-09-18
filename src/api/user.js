import axios from "axios";
import { BASE_URL } from "../utilities/constants";

export const userLogin = async (address) => {
  const accessToken = localStorage.getItem("accessToken");
  const result = await axios({
    method: "post",
    url: `${BASE_URL}/user/login`,
    headers: {
      "Content-Type": "Application/json",
    },
    data: { address, accessToken },
  }).catch((err) => {
    console.log("axios error: ", err);
    return { message: "login again" };
  });

  if (result.statusText === "OK") {
    return {
      accessToken: result.data.accessToken,
      userDetails: result.data.userDetails,
      message: null,
    };
  } else {
    return {
      message: "Login again",
    };
  }
};

export const updateProfile = async (
  firstName,
  lastName,
  email,
  phoneNumber,
  streetAddress,
  state,
  city,
  pincode
) => {
  const accessToken = localStorage.getItem("accessToken");
  const result = await axios({
    method: "post",
    url: `${BASE_URL}/user/save_profile`,
    headers: {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      firstName,
      lastName,
      email,
      phoneNumber,
      streetAddress,
      state,
      city,
      pincode,
    },
  });

  console.log(result);
};

export const fetchUserDetails = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const result = await axios({
    method: "post",
    url: `${BASE_URL}/user/fetch_user_details`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(result, result.data.userDetails);
  if (result.statusText === "OK") {
    return { userDetails: result.data.userDetails, error: false };
  } else {
    return { userDetails: null, error: true };
  }
};

export const updateKycDetails = async (
  metamaskAccount,
  aadhaarNumber,
  panNumber,
  income,
  occupation,
  about
) => {
  const result = await axios({
    method: "post",
    url: `${BASE_URL}/user/update_kyc_details`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      metamaskAccount,
      aadhaarNumber,
      panNumber,
      income,
      occupation,
      about,
    },
  });
  console.log("KYC DATA RESULT -> ", result, result.data.userDetails);
  if (result.statusText === "OK") {
    return { userDetails: result.data.userDetails, error: false };
  } else {
    return { userDetails: null, error: true };
  }
};
