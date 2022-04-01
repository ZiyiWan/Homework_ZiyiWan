import axios from "axios";

const basedURL =
  "http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/";

function getService(url: string, param: string, token: any) {
  const result = axios
    .get(basedURL + url + param, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res.data;
    });
  return result;
}

function deleteService(url: string, param: string, token: any) {
  axios.delete(basedURL + url + param, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function getStudents(page: number, token: any) {
  const data = getService("students?", `page=${page}&limit=10`, token);
  console.log(data)
  return data;
}

export async function deleteStudent(id: number, token: any) {
  deleteService("students/", `${id}`, token);
}
