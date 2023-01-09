import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState
} from 'react';
import {Alert, View} from 'react-native';
import moment from 'moment';
import colors from '../theme/colors';

interface DatePickerWebProps {
	selected: string;
	handleChange: () => void;
	isPickOnlyDate?: boolean;
	maximumDate?: string;
	minimumDate?: string;
}

const DatePickerWeb = forwardRef((props: DatePickerWebProps, ref) => {
	const {selected, handleChange, isPickOnlyDate, maximumDate, minimumDate} =
		props;

	const [date, setDate] = useState(selected);
	const dateRef = useRef(null);

	useEffect(() => {
		setDate(selected);
	}, [selected]);

	const _handleChange = e => {
		const value = e.target.value;
		const elid = e.target.id;
		let newStr;

		console.log('====================================');
		console.log('value ::', value);
		console.log('elid ::', elid);
		console.log('====================================');

		if (!value) {
			return;
		}

		if ('elogdate' === elid) {
			if (isPickOnlyDate) {
				let formatedDate = moment(value).format('DD MMMM YYYY');
				newStr = formatedDate;
				setDate(formatedDate);
			} else {
				let formatedDateTime = moment(value).format('DD MMMM YYYY hh:mm A');
				newStr = formatedDateTime;
				setDate(formatedDateTime);
			}
		}
		console.log('====================================');
		console.log('newStr ::', newStr);
		console.log('====================================');
		handleChange(newStr);
	};

	// The component instance will be extended
	// with whatever you return from the callback passed
	// as the second argument
	useImperativeHandle(ref, () => ({
		handlePickDateTime() {
			const userAgentName = window.navigator.userAgent.toLowerCase();
			if (userAgentName.includes('iphone')) {
				dateRef.current.focus();
			} else {
				dateRef.current.showPicker();
			}
		}
	}));

	return (
		<View
			style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
			<input
				ref={dateRef}
				id="elogdate"
				value={date}
				onChange={_handleChange}
				type={isPickOnlyDate ? 'date' : 'datetime-local'}
				style={{flex: 1, backgroundColor: colors.black, opacity: 0}}
				max={maximumDate && moment(maximumDate).format('YYYY-MM-DDTHH:mm')}
				min={minimumDate && moment(minimumDate).format('YYYY-MM-DDTHH:mm')}
				// defaultValue={moment()
				// 	.add(10, 'minutes')
				// 	.format('YYYY-MM-DDTHH:mm')
				// 	.toString()}
			/>
		</View>
	);
});

DatePickerWeb.defaultProps = {
	minimumDate: moment().add(10, 'minutes').format('YYYY-MM-DDTHH:mm').toString()
};
export default DatePickerWeb;
