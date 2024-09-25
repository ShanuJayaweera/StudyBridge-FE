import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../utils/config';

const mainApi = config.apiUrl;

// Define the async thunk for the API call
export const fetchData = createAsyncThunk(
  'api/authentication',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(mainApi + "api/User/LoginOrRegister"); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);