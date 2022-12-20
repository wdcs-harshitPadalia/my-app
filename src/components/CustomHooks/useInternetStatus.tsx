import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export function useInternetStatus() {
	const [reachable, setReachable] = useState(true);

	useEffect(() => {
		const subscribe = state => setReachable(state.isInternetReachable ?? true);

		NetInfo.addEventListener(subscribe);
	}, []);

	return reachable;
}
