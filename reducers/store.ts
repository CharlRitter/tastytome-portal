import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import rootReducer from '@/reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

function makeStore() {
  if (typeof window === 'undefined') {
    store.dispatch({ type: HYDRATE, payload: {} });
  }

  return store;
}

type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const storeWrapper = createWrapper<AppStore>(makeStore, { debug: false });
