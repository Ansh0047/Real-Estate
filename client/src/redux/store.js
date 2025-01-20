import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// Redux Persist is a library that enables the persistence of a Redux store's state across browser sessions,
// It saves (rehydrates) the state to a storage medium, such as localStorage or sessionStorage, so that when a user reloads the page or reopens the browser, the state is retained.
const rootReducer = combineReducers({user: userReducer});

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
  // reducer: { user: userReducer },
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
