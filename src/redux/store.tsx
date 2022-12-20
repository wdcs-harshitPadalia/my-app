import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from 'redux-persist/lib/storage';

import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {persistReducer} from 'redux-persist';
import dashBoard from './reducerSlices/dashboard';
import preLogin from './reducerSlices/preLogin';
import userInfo, {userInfoSlice} from './reducerSlices/userInfo';
import wallet from './reducerSlices/walletinfo';
import notification from './reducerSlices/notification';
import contactsData from './reducerSlices/contactsData';

const reducers = combineReducers({
	preLogin: preLogin.reducer,
	dashboard: dashBoard.reducer,
	userInfo: userInfoSlice.reducer,
	wallet: wallet.reducer,
	notification: notification.reducer,
	contactsData: contactsData.reducer
});
const persistConfig = {
	key: 'root',
	version: 1,
	storage: AsyncStorage,
	whitelist: ['userInfo', 'contactsData'],
	blacklist: []
};

const persistedReducer = persistReducer(persistConfig, reducers);
// const persistedReducer = persistReducer(persistConfig, rootReducer)

// reducer: {
//     counter: counterReducer,
//   },
const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			// serializableCheck: {
			//   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			// },
			serializableCheck: false
		})
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;
