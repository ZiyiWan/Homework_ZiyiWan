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

interface studentEditInfo {
  name: string;
  country: string;
  email: string;
  type: number;
}
