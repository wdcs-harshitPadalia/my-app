import {magic} from '../../navigation/routes';
import {updateApiLoader} from '../../redux/reducerSlices/preLogin';
import store from '../../redux/store';

export const emailLogin = async (email, loaderMessage: any) => {
	// store.dispatch(
	//   updateApiLoader({
	//     apiLoader: true,
	//     showAlertWithText: Strings.,
	//   }),
	// );
	return new Promise(function (resolve, reject) {
		try {
			const req = magic.auth.loginWithMagicLink({
				email,
				redirectURI: window.location.origin
			});
			req
				.on('email-sent', () => {
					/* ... */
					console.log('email-sent');
				})
				.on('done', () => {
					/* ... */
					console.log('done');
					store.dispatch(
						updateApiLoader({
							apiLoader: true,
							showAlertWithText: loaderMessage,
							showRandomMessage: true
						})
					);
				})
				.then(DIDToken => {
					/* ... */
					// store.dispatch(updateApiLoader({apiLoader: true}));
					store.dispatch(
						updateApiLoader({
							apiLoader: true,
							showAlertWithText: loaderMessage,
							showRandomMessage: true
						})
					);
					magic.user.getMetadata().then(async value => {
						console.log('value.email', value.email);
						resolve(value);
						console.log(value, 'value');
					});
				})
				.once('email-not-deliverable', () => {
					/* ... */
					console.log('email-not-deliverable');
					reject('Email not deliverable.');
				})
				.catch(error => {
					/* ... */
					reject(JSON.stringify(error));
				})
				.on('error', error => {
					/* ... */
					reject(JSON.stringify(error));
				});
		} catch (err) {
			reject(JSON.stringify(err));
		}
	});
};

export const mobileLogin = async (phoneNumber: any, loaderMessage: any) => {
	// store.dispatch(
	//   updateApiLoader({
	//     apiLoader: true,
	//     showAlertWithText: Strings.,
	//   }),
	// );
	return new Promise(function (resolve, reject) {
		try {
			const req = magic.auth.loginWithSMS({
				phoneNumber
			});
			req
				.on('settled', () => {
					/* ... */
					console.log('settled');
				})
				.on('done', () => {
					/* ... */
					console.log('done');
					store.dispatch(
						updateApiLoader({
							apiLoader: true,
							showAlertWithText: loaderMessage,
							showRandomMessage: true
						})
					);
				})
				.then(DIDToken => {
					/* ... */
					// store.dispatch(updateApiLoader({apiLoader: true}));
					console.log(DIDToken, 'DIDToken?>>>');
					store.dispatch(
						updateApiLoader({
							apiLoader: true,
							showAlertWithText: loaderMessage,
							showRandomMessage: true
						})
					);
					magic.user.getMetadata().then(async value => {
						// console.log('value.email', value.email);
						resolve(value);
						console.log(value, 'value');
					});
				})
				.once('error', () => {
					/* ... */
					console.log('email-not-deliverable');
					reject('Phone not deliverable.');
				})
				.catch(error => {
					/* ... */
					reject(JSON.stringify(error));
				})
				.on('error', error => {
					/* ... */
					reject(JSON.stringify(error));
				});
		} catch (err) {
			reject(JSON.stringify(err));
		}
	});
};

export const socialLogin = async (provider: any, loaderMessage: any) => {
	return new Promise(function (resolve, reject) {
		try {
			store.dispatch(
				updateApiLoader({
					apiLoader: true,
					showAlertWithText: loaderMessage,
					showRandomMessage: true
				})
			);
			const req = magic.oauth.loginWithPopup({
				provider: provider,
				redirectURI: window.location.origin
			});
			req
				.on('done', () => {
					/* ... */
					console.log('done');
					store.dispatch(
						updateApiLoader({
							apiLoader: true,
							showAlertWithText: loaderMessage,
							showRandomMessage: true
						})
					);
				})
				.then(response => {
					store.dispatch(
						updateApiLoader({
							apiLoader: true,
							showAlertWithText: loaderMessage,
							showRandomMessage: true
						})
					);
					/* ... */
					console.log('DIDToken', response.oauth.accessToken);
					magic.user.getMetadata().then(async value => {
						console.log(value, '??<<<value>??', response);
						resolve({value, response});
					});
				})
				.once('done', () => {
					/* ... */
					console.log('done.');
				})
				.catch(error => {
					reject(JSON.stringify(error));
				})
				.on('error', error => {
					reject(JSON.stringify(error));
				});
		} catch (err) {
			reject(JSON.stringify(err));
		}
	});
};

// const result = await magic.oauth.loginWithPopup({
//   provider: 'google' /* 'google', 'facebook', 'apple', or 'github' */,
//   redirectURI: 'defibet://',
//   //scope: ['user:email'], /* optional */
// });
// console.log(result.oauth.userInfo);
// magic.oauth.loginWithPopup({
//   provider: 'google' /* 'google', 'facebook', 'apple', or 'github' */,
//   //'{yourOktaScheme}:/callback'
//   redirectURI: 'MyApp://callback',
//   //scope: ['user:email'], /* optional */
// }).then((value) => {
//   console.log(value)
// }).catch((error) => {
//   console.log(error)
// })
// const response = await magic.auth.loginWithMagicLink({
//   showUI: true,
//   email: 'test+success@magic.link'
// });
// console.log(response)
// console.log(magic.user.getMetadata().then((value) => {
//   console.log(value)
// }))
