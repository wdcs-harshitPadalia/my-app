import * as Yup from 'yup';
import Strings from '../strings';
import {validateEmail, validatePhone} from './Function';
/*
    else if (!username) {
      return Alert.alert(Strings.erroBlankUserName);
    } else if (!email) {
      return Alert.alert(Strings.errorBlankEmail);
    } else if (!password) {
      return  Alert.alert(Strings.errorBlankPassword);
    } else if (!confirmpassword) {
      return  Alert.alert(Strings.errorBlankConfirmPassword);
    } else if (!date) {
      return  Alert.alert('Please enter Date of Birth');
    } else if (!gender) {
      return  Alert.alert(Strings.erroBlankGender);
    } else if (!countryName) {
      return  Alert.alert(Strings.erroBlankCountry);
    } else if (!city) {
      return  Alert.alert(Strings.erroBlankCity);
    } else if (!mobileNumber) {
      return  Alert.alert(Strings.errorBlankPhone);
*/
const signUp = Yup.object().shape({
	firstname: Yup.string().required(Strings.errorBlankFirstName),
	lastname: Yup.string().required(Strings.errorBlankLastName),
	username: Yup.string().required(Strings.erroBlankUserName),
	email: Yup.string()
		.required(Strings.errorBlankEmail)
		.email(Strings.enterValidEmail),
	password: Yup.string()
		.required(Strings.errorBlanPassword)
		.min(8, Strings.errorInvalidPassword)
		.max(15, Strings.errorInvalidPassword),
	confirmPassword: Yup.string()
		.min(8, Strings.errorInvalidPassword)
		.oneOf([Yup.ref('password')], Strings.errorPasswordNotMatch)
		.required(Strings.errorBlankConfirmPassword)
		.max(15, Strings.errorInvalidPassword),
	// dob: Yup.string()
	//   .required(Strings.errordob),
	mobilenumber: Yup.string().required(Strings.errorBlankPhone),
	// country: Yup.string()
	//   .required(Strings.erroBlankCountry),
	city: Yup.string().required(Strings.erroBlankCity)
	// sports: Yup.string()
	//   .required(Strings.erroBlanksports),
});

const signIn = Yup.object().shape({
	// email: Yup.string()
	//   .trim()
	//   .email(Strings.enterValidEmail)
	//   .required(Strings.errorBlankEmail),
	email_or_phone: Yup.string()
		.required('Email / Phone is required')
		.test('email_or_phone', 'Email / Phone is invalid', value => {
			return validateEmail(value) || validatePhone(parseInt(value ?? '0'));
		})
});

const setupProfile = Yup.object().shape({
	userName: Yup.string()
		.required(Strings.errorBlankUser)
		.min(2, Strings.errorUserTextLength)
		.max(64, Strings.errorUserTextLength),
	email: Yup.string()
		.required(Strings.errorBlankEmail)
		.test('email', Strings.enterValidEmail, value => {
			return validateEmail(value) || validatePhone(parseInt(value ?? '0'));
		}),
	date: Yup.date().required(Strings.errorBlankDob).nullable(),
	isTermsAccepted: Yup.bool().oneOf([true], Strings.errorTerms),
	country: Yup.string().required(Strings.errorBlankCountry)
	// dob: Yup.string().required(Strings.errorBlankUser),
});

const forgotPassword = Yup.object().shape({
	mobileNumber: Yup.string()
		.required(Strings.errorBlankPhone)
		.min(10, Strings.errorInvalidPhone)
		.max(10, Strings.errorInvalidPhone)
});

const resetPassword = Yup.object().shape({
	newPassword: Yup.string()
		.required(Strings.errorBlankNewPassword)
		.min(8, Strings.errorInvalidPassword)
		.max(15, Strings.errorInvalidPassword),

	confirmPassword: Yup.string()
		.min(8, Strings.errorInvalidPassword)
		.oneOf([Yup.ref('newPassword')], Strings.errorPasswordNotMatch)
		.required(Strings.errorBlankConfirmPassword)
		.max(15, Strings.errorInvalidPassword)
});
const changePassword = Yup.object().shape({
	oldPassword: Yup.string()
		.required(Strings.errorBlanPassword)
		.min(8, Strings.errorInvalidPassword)
		.max(15, Strings.errorInvalidPassword),

	newPassword: Yup.string()
		.required(Strings.errorBlankNewPassword)
		.min(8, Strings.errorInvalidPassword)
		.max(15, Strings.errorInvalidPassword),

	confirmPassword: Yup.string()
		.min(8, Strings.errorInvalidPassword)
		.oneOf([Yup.ref('newPassword')], Strings.errorPasswordNotMatch)
		.required(Strings.errorBlankConfirmPassword)
		.max(15, Strings.errorInvalidPassword)
});

const updateProfile = Yup.object().shape({
	firstname: Yup.string().required(Strings.errorBlankFirstName),
	lastname: Yup.string().required(Strings.errorBlankLastName),
	username: Yup.string().required(Strings.erroBlankUserName),
	email: Yup.string()
		.required(Strings.errorBlankEmail)
		.email(Strings.enterValidEmail),
	// dob: Yup.string()
	//   .required(Strings.errordob),
	mobilenumber: Yup.string().required(Strings.errorBlankPhone),
	// country: Yup.string()
	//   .required(Strings.erroBlankCountry),
	city: Yup.string().required(Strings.erroBlankCity)
	// sports: Yup.string()
	//   .required(Strings.erroBlanksports),
});
const deleteAccount = Yup.object().shape({
	password: Yup.string()
		.required(Strings.errorBlanPassword)
		.min(8, Strings.errorInvalidPassword)
		.max(15, Strings.errorInvalidPassword)
});

export const validationRegex = {
	email:
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	text: /^[A-Za-z\s]+$/,
	number: /^[0-9\s]+$/,
	url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
};

export default {
	signUp,
	signIn,
	resetPassword,
	forgotPassword,
	changePassword,
	updateProfile,
	validationRegex,
	deleteAccount,
	setupProfile
};
