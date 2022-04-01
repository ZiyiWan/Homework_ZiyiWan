import axios from "axios";
import {
  signUpRequest,
  signUpResponse,
  loginRequest,
} from "../dataModel/dataModel";

const basedURL =
  "http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/";

async function postService(url: string, data: signUpRequest) {
  const result = axios
    .post<signUpResponse>(basedURL + url, data, {
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    })
    .then(function (res) {
      console.log(res.data.data);
      alert("success");
      return res;
    })
    .catch(function (error) {
      console.log(error);
      alert("error");
      return error;
    });

  return result;
}

export function signUpService(data: signUpRequest) {
  postService("signup", data);
}

export function loginService(data: loginRequest) {
  postService("login", data).then(function (res) {
    const token = res.data.data.token;
    localStorage.setItem("token", token);
    console.log("user token is :", localStorage.getItem("token"));
  });
}
