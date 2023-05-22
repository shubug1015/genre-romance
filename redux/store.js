import { combineReducers } from 'redux';
import {
  configureStore,
  createSlice,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

const user = createSlice({
  name: 'userReducer',
  initialState: { logged: false, token: null, user_pk: null, sex: null },
  reducers: {
    userLogin: (_, action) => ({
      logged: action.payload.logged,
      token: action.payload.token,
      user_pk: action.payload.user_pk,
      sex: action.payload.sex,
    }),
  },
});

const admin = createSlice({
  name: 'adminReducer',
  initialState: { logged: false, token: null },
  reducers: {
    adminLogin: (_, action) => ({
      logged: action.payload.logged,
      token: action.payload.token,
    }),
  },
});

const reducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default:
      return combineReducers({
        user: user.reducer,
        admin: admin.reducer,
      })(state, action);
  }
};

const makeStore = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware(),
  });

export const { userLogin } = user.actions;
export const { adminLogin } = admin.actions;

export const wrapper = createWrapper(makeStore);
