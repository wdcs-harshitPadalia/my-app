import axios from 'axios';
import Store from '../store';
import * as NavigationHelper from '../../navigation/navigationHelper';
import {Alert} from 'react-native';
import app from '../../../app.json';
import {login} from '.';
import {updateApiLoader} from '../reducerSlices/preLogin';
import Strings from '../../constants/strings';
import ScreenNames from '../../navigation/screenNames';
import store from '../store';
import {logout} from './apiActions';
import {resetProfileData, updateDeviceToken} from '../reducerSlices/userInfo';
import {magic} from '../../navigation/routes';

axios.defaults.timeout = 30000;

export const useAxios = async (axiosParams: any) => {
	return new Promise((resolve, reject) => {
		console.log('AXIOS :', axiosParams);

		axios
			.request(axiosParams)
			.then(response => {
				resolve(response?.data);
			})
			.catch(async error => {
				store.dispatch(updateApiLoader({apiLoader: false}));
				//console.log('API Erro', error, axiosParams);
				if (error.response?.status.toString().includes('203')) {
				} else if (error.response?.status.toString().includes('4')) {
					reject(error.response?.data?.message);
					if (error.response?.status?.toString() === '401') {
						//store.dispatch(logout({}));
						await magic?.user?.logout();
						store.dispatch(updateDeviceToken({deviceToken: ''}));
						store.dispatch(resetProfileData({}));
					}
					Alert.alert(
						'',
						error.response?.data?.message ?? Strings.somethingWentWrong
					);
				} else if (error.response?.status.toString().includes('5')) {
					let errObj = {
						code: 5000,
						status: false,
						message: Strings.somethingWentWrong,
						data: {}
					};
					reject(JSON.stringify(errObj));
				} else {
					reject(JSON.stringify(error?.response?.data));
				}
			});
	});
};
