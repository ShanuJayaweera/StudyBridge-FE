// breadcrumbsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Breadcrumb } from 'rsuite';
import { RootState } from '../../../store/store';

interface Breadcrumb {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  // label: any;
  // link: any;
}

interface BreadcrumbsState extends Breadcrumb {
  breadcrumbs: Breadcrumb[];
}

const initialState: BreadcrumbsState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  breadcrumbs: [],
};

export const addBreadcrumb = createAsyncThunk('breadcrumbs/add', async (breadcrumb: Array<Breadcrumb>, { getState }) => {
  const state = getState() as RootState;
  const breadcrumbs = state.breadcrumbs.breadcrumbs;
  const updatedBreadcrumbs = [...breadcrumb];
  return updatedBreadcrumbs;
});

export const removeBreadcrumb = createAsyncThunk('breadcrumbs/remove', async (unused: void, { getState }) => {
  const state = getState() as RootState;
  const breadcrumbs = state.breadcrumbs.breadcrumbs;
  const updatedBreadcrumbs = breadcrumbs.slice(0, -1);
  return updatedBreadcrumbs;
});

export const resetBreadcrumbs = createAsyncThunk('breadcrumbs/reset', async () => {
  return [];
});

const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBreadcrumb.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBreadcrumb.fulfilled, (state, action: PayloadAction<Breadcrumb[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.breadcrumbs = action.payload;
      })
      .addCase(addBreadcrumb.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(removeBreadcrumb.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeBreadcrumb.fulfilled, (state, action: PayloadAction<Breadcrumb[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.breadcrumbs = [];
      })
      .addCase(removeBreadcrumb.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(resetBreadcrumbs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetBreadcrumbs.fulfilled, (state, action: PayloadAction<Breadcrumb[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.breadcrumbs = action.payload;
      })
      .addCase(resetBreadcrumbs.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default breadcrumbsSlice.reducer;
