
import { AnyAction, ThunkDispatch, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './rootReducer';

import { middleware } from './middleware';

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
  })

const store = configureStore({
  reducer: rootReducer,
  middleware: [...customizedMiddleware, ...middleware],
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, AnyAction>;

export default store;
