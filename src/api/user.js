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
