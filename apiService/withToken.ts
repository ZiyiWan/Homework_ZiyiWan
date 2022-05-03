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

function postService(url: string, token: any, data: any) {
  const result = axios
    .post(basedURL + url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
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

function putService(url: string, token: any, data: any) {
  const result = axios
    .put(basedURL + url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
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

export async function getStudents(page: number, token: any) {
  const data = getService("students?", `page=${page}&limit=10`, token);
  console.log(data);
  return data;
}

export async function getStudentsById(id:number, token: any) {
  const data = getService("students/", `${id}`, token);
  console.log(data);
  return data;
}

export async function getStudentsByName(name:string, page: number, token: any) {
  const data = getService("students?", `query=${name}&page=${page}&limit=10`, token);
  console.log(data);
  return data;
}

export async function deleteStudent(id: number, token: any) {
  deleteService("students/", `${id}`, token);
}

export async function addStudent(stuInfo: any, token: any) {
  postService("students", token, stuInfo);
}

export async function addTeacher(teaInfo: any, token: any) {
  postService("teachers", token, teaInfo);
}

export async function editStudent(stuInfo: any, token: any) {
  await putService("students", token, stuInfo);
}


export async function getTeachers(page: number, token: any) {
  const data = getService("teachers?", `page=${page}&limit=10`, token);
  console.log(data);
  return data;
}

export async function getTeacherById(id:number, token: any) {
  const data = getService("teachers/", `${id}`, token);
  console.log(data);
  return data;
}

export async function deleteTeacher(id: number, token: any) {
  deleteService("teachers/", `${id}`, token);
}