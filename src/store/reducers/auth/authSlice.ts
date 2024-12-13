import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { LoginUser } from './loginUser.interface';
import authService from './services/auth.service';


const token = localStorage.getItem('token');

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isForgotPasswordSuccess: boolean;
  isresetUserPasswordSuccess: boolean;
}

interface AuthState extends AsyncState {
  userData?: any | null;
  // userToken?: Jwt;
  m_user_id?: any;
  resetPasswordData?: any | null;
  forgotPasswordData?: any | null;
  logoutData?: any | null;
  clientAuthData?: any | null;
  userToken?: any | null;
  errorCode?: any | null;
  errorMsg?: any | null;
  clientToken?: any | null;
  notification?: any;
  notification_type?: any;
  expires_in?: any;
}

const initialState: AuthState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  isForgotPasswordSuccess: false,
  userData: '',
  userToken: token,
  isresetUserPasswordSuccess: false,
  resetPasswordData: null,
  forgotPasswordData: null,
  logoutData: null,
  clientAuthData: null,
  errorCode: null,
  errorMsg: null,
  clientToken: localStorage.getItem('clientToken'),
  notification: null,

};

export const login = createAsyncThunk('auth/login', async (user: LoginUser, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const forgotPassword = createAsyncThunk('auth/forgot-password/?email', async (forgotPasswordDetails: any, thunkAPI) => {
  try {
    return await authService.forgotPassword(forgotPasswordDetails);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetUserPassword = createAsyncThunk('auth/reset-password/?token', async (resetUser: any, thunkAPI) => {
  try {
    return await authService.resetUserPassword(resetUser);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const logout = createAsyncThunk('/auth/logout', async (redisUser: any, thunkAPI) => {
  try {
    return await authService.logout(redisUser);
  } catch (error) {
    thunkAPI.dispatch(resetLogout(error));
    return thunkAPI.rejectWithValue(error);
  }
});


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.userData = null;
      state.errorCode = null;
      state.errorMsg = null;
      state.clientToken = null;
    },
    resetErrMsg: (state) => {
      state.errorMsg = null;
    },
    resetLogout: (state, logoutState) => {
      // please send only the states that are regarding to resetting the state of log out
      // navigator('/');
      state.userToken = logoutState?.payload?.userToken === null ? logoutState?.payload?.userToken : state.userToken;
      state.errorMsg = logoutState?.payload?.errorMsg === null ? logoutState?.payload?.errorMsg : state.errorMsg;
      state.isError = logoutState?.payload?.isError || state.isError;
      state.errorCode = logoutState?.payload?.errorCode || state.errorCode;
      if (logoutState?.payload?.errorCode === 401) {
        localStorage.clear();
      }
      state.clientToken = null;
    },
    resetOtp: (state, action) => {
      state.clientToken = action?.payload?.clientToken;
      state.userToken = action?.payload?.userToken;
      if (action?.payload?.clientToken) {
        localStorage.clear();
      }
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.userData = null;
      state.errorCode = null;
      state.clientToken = null;
      state.errorMsg = null;
    },
    clearJwt: (state) => {
      state.userToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
        state.isSuccess = false;
        state.clientToken = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMsg = null;
        state.userData = action.payload;
        state.clientToken = action.payload?.data?.redisUserId;
      })
      .addCase(login.rejected, (state, action: { payload: any }) => {
        state.isLoading = false;
        state.isError = true;
        state.userData = action.payload;
        state.errorMsg = action.payload.errorMsg;
        state.clientToken = null;
      })

      // FORGOT PASSWORD
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isForgotPasswordSuccess = true;
        state.errorMsg = null;
        state.forgotPasswordData = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action: { payload: any }) => {
        state.isLoading = false;
        state.isError = true;
        state.userData = null;
        state.isForgotPasswordSuccess = false;
        state.forgotPasswordData = action.payload;
        state.errorMsg = action.payload.errorMsg;
      })

      // RESET PASSWORD
      .addCase(resetUserPassword.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMsg = null;
        state.isresetUserPasswordSuccess = true;
        state.resetPasswordData = action.payload;
      })
      .addCase(resetUserPassword.rejected, (state, action: { payload: any }) => {
        state.isLoading = false;
        state.isError = true;
        state.userData = null;
        state.isresetUserPasswordSuccess = false;
        state.resetPasswordData = null;
        state.errorMsg = action.payload.errorMsg;
      })

      // LOGOUT
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
        state.clientToken = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logoutData = action.payload;
        state.userToken = null;
        state.userData = null;
        state.errorMsg = null;
        state.clientToken = false;
      })
      .addCase(logout.rejected, (state, action: { payload: any }) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = action.payload.errorMsg;
        state.clientToken = false;
      });
  },
});

export const { reset, resetLogout, resetOtp, clearJwt, resetErrMsg } = authSlice.actions;

export const selectedUser = (state: RootState) => {
  return state.rootReducer.auth;
};

export default authSlice.reducer;
