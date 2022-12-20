import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {login} from '../apiHandler';
import {editProfile, logout} from '../apiHandler/apiActions';

interface PreLoginType {
	apiLoader: boolean;
	loginData: Object;
	registerData: Object;
	message: string;
	error: boolean;
	showAlertWithText: boolean;
	showRandomMessage: boolean;
}

export const initialState: PreLoginType = {
	apiLoader: false,
	loginData: {},
	registerData: {},
	message: '',
	error: false,
	showAlertWithText: false,
	showRandomMessage: false
};
const _storeData = async (data: any) => {
	try {
		await AsyncStorage.setItem('LAPUSER', JSON.stringify(data));
		_retrieveData();
	} catch (error) {
		// Error saving data
	}
};
const _retrieveData = async () => {
	try {
		const value = await AsyncStorage.getItem('LAPUSER');
		if (value !== null) {
			// We have data!
			// axios.defaults.headers = {
			//   accept: '*/*',
			//   Authorization:
			//     JSON.parse(value)?.data?.user_jwt &&
			//     JSON.parse(value)?.data?.user_jwt,
			// };
			console.log('aaaaaaaa', JSON.parse(value)?.data?.user_jwt);
		}
	} catch (error) {
		// Error retrieving data
	}
};
const preLogin = createSlice({
	name: 'preLogin',
	initialState: initialState,
	reducers: {
		updateApiLoader: (state, action: PayloadAction<any>) => {
			//console.log('Update API LOADER : ', action);
			state.apiLoader = action.payload?.apiLoader;
			if (action.payload?.showAlertWithText) {
				state.showAlertWithText = action.payload?.showAlertWithText;
			} else {
				state.showAlertWithText = false;
			}
			state.showRandomMessage = action.payload?.showRandomMessage;
		},

		categoryReset: (state, action: PayloadAction<any>) => {
			if (action.payload?.sportAndCategory !== undefined) {
			}
		}
	},
	extraReducers: builder => {
		//Login -----------
		builder.addCase(login.pending, (state, action) => {
			console.log('login pending Payload : ');
			// state.apiLoader = true;
			state.showRandomMessage = true;
			//_storeData(action.payload);
		});
		builder.addCase(login.fulfilled, (state, action) => {
			// console.log("login Success Payload : ", action.payload);
			//console.log('login fulfilled Payload : ');
			state.apiLoader = false;
			state.showRandomMessage = false;
			//state.loginData = action.payload;
			//_storeData(action.payload);
		});
		builder.addCase(login.rejected, (state, action) => {
			console.log('login rejected Payload : ');
			//   const errorObj = JSON.parse(action?.error?.message);
			//   console.log('login Reject Payload Error : ', errorObj);
			state.apiLoader = false;
			state.error = true;
			state.showRandomMessage = false;
			// state.loginData = errorObj;
		});

		builder.addCase(logout.fulfilled, (state, action) => {
			// console.log("login Success Payload : ", action.payload);
			console.log('logout fulfilled Payload : ');
			state.apiLoader = false;
			//state.data = action.payload?.data;
			//_storeData(action.payload);
		});

		//Edit profile -----------
		builder.addCase(editProfile.pending, (state, action) => {
			console.log('editProfile pending Payload : ');
			state.apiLoader = true;
			//_storeData(action.payload);
		});
		builder.addCase(editProfile.fulfilled, (state, action) => {
			// console.log("login Success Payload : ", action.payload);
			//console.log('editProfile fulfilled Payload : ');
			state.apiLoader = false;
			//state.loginData = action.payload;
			//_storeData(action.payload);
		});
		builder.addCase(editProfile.rejected, (state, action) => {
			console.log('editProfile rejected Payload : ', action.payload);
			//   const errorObj = JSON.parse(action?.error?.message);
			//   console.log('login Reject Payload Error : ', errorObj);
			state.apiLoader = false;
			state.error = true;
			// state.loginData = errorObj;
		});
	}
});

export const {updateApiLoader, categoryReset} = preLogin.actions;
export default preLogin;
