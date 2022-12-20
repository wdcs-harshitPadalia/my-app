import {View, Text} from 'react-native';
import React from 'react';

export default function SeparatorView(props) {
	return <View style={{width: props.spacing ?? 8}} />;
}
