import React from 'react';
import {
	StyleSheet,
	View,
	Text,
} from 'react-native';

export const HCHeader = (props) => {
	return (
		<View
			style={styles.view}
		>
			<Text style={styles.text}>
				{props.title}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		width: '100%',
		height: 50,
		backgroundColor: '#73BFB8',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
	},
	text: {
		fontSize: 22,
	},
});
