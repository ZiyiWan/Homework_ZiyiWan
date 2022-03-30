import axios from "axios";
import { Interface } from "readline";

const basedURL =
  "http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/";

export  function postService(url:string, postData={}){
    interface SignUpResponse {
        code: number;
        data: SignUpRequest;
        msg: string;
      }
    
      interface SignUpRequest {
        email: string;
        password: string;
        role: string;
      }
    axios.post<SignUpResponse>(basedURL + url, postData, {
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      })
      .then(function (response) {
        console.log(response.data.data);
        alert("success");
      })
      .catch(function (error) {
        console.log(error);
        alert("error");
      });
}