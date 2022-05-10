export interface signUpResponse {
  code: number;
  data: signUpRequest;
  msg: string;
}

export interface signUpRequest {
  email: string;
  password: string;
  role: string;
}

export interface loginRequest {
  email: string;
  password: string;
  role: string;
}

export interface loginResponse {
  code: number;
  data: { role: string; token: string; userId: number };
  msg: string;
}

export interface signUpInfo {
  role: string;
  email: string;
  password: string;
}

interface Values {
  title: string;
  description: string;
  modifier: string;
}

export interface collectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  onEdit?: (values: studentEditInfo) => void;
}

export interface studentEditInfo {
  name: string;
  country: string;
  email: string;
  type: number;
}

export interface studentInfo {
  address: [];
  age: number;
  avatar: string;
  country: string;
  courses: [];
  createdAt: string;
  description: string;
  education: string;
  email: string;
  gender: number;
  id: number;
  interest: [""];
  memberEndAt: string;
  memberStartAt: string;
  name: string;
  phone: string;
  profileId: number;
  type: {
    id: number;
    name: string;
  };
  updatedAt: string;
}

export interface teacherInfo {
  country: string;
  coursesAmount: number;
  createdAt: string;
  email: string;
  name: string;
  phone: string;
  profileId: number;
  profile: {
    createdAt: string;
    updatedAt: string;
    id: number;
    address: [];
    gender: number;
    birthday: string;
    avatar: string;
    description: string;
  };
  updatedAt: string;
  skills: [{ name: string; level: number }];
}

interface courseInfo {
  createdAt: string;
  updatedAt: string;
  id: number;
  cover: string;
  detail: string;
  duration: number;
  durationUnit: string;
  maxStudents: number;
  name: string;
  price: number;
  uid: string;
  star: number;
  startTime: string;
  status: number;
  scheduleId: number;
  teacherId: number;
  type: { id: number; name: string }[];
  teacherName: string;
}

export interface course {
  info: courseInfo;
}

