import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SidebarState from "./reducers/side/sidebarMenu.Slice";
import breadcrumbs from "../components/Breadcrumbs/reducer/breadcrumbSlice";
import authReducer from "./reducers/auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: {
    SidebarState,
    breadcrumbs,
    rootReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
