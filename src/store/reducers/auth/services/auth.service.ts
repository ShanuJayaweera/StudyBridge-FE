import axiosInstance from '../../../../axiosInstance';
import { Jwt } from '../Jwt';
import { LoginUser } from '../loginUser.interface';

const login = async (user: LoginUser): Promise<Jwt> => {
  return new Promise(async (resolve, reject) => {
    // fetch
    // axiosInstance
    await axiosInstance
      .post('auth/login', user)
      .then((response) => {
        if (response.data) {
          // localStorage.setItem('clientToken', response.data.data.redisUserId);
          // localStorage.setItem('clock', JSON.stringify(Date.now()));
        }
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      });

  });
};

const forgotPassword = async (forgotPasswordDetails: any) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('auth/forgot-password', forgotPasswordDetails)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const resetUserPassword = async (resetUser: any) => {
  const resetUserData = {
    password: resetUser.password,
    c_password: resetUser.confirmPassword,
    // clientToken: resetUser.clientToken,
  };
  const token = resetUser.token;
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/auth/reset-password?token=${token}`, resetUserData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


const logout = async (user: any) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('/auth/logout', user)
      .then((response) => {
        if (response.data) {
          localStorage.clear();
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


const authService = {
  login,
  logout,
  forgotPassword,
  resetUserPassword,
};

export default authService;
