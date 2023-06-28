import { configureStore, ThunkAction, Action, AnyAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import rootReducer from '@/reducers/root';

function makeStore() {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
  });

  // Enable Next.js "Hydrate" action for server-side rendering
  if (typeof window === 'undefined') {
    store.dispatch({ type: HYDRATE, payload: {} });
  }

  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<AnyAction>>;

export const storeWrapper = createWrapper<AppStore>(makeStore, { debug: false });
