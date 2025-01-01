import { http } from "./Config";

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  passWord: string;
}

export const authService = {
  signIn: (data: SignInData) => {
    return http.post("/Users/signin", data);
  },
  signUp: (data: SignUpData) => {
    return http.post("/Users/signup", data);
  },
};
