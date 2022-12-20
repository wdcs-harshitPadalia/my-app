import {ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import icons from '../../assets/icon';
import PlayerView from './PlayerView';

export default function TeamView(props) {
	return (
		<ImageBackground
			resizeMode="cover"
			source={{uri: props?.standingsImage}}
			style={styles.container}>
			<View style={styles.wrapperView}>
				<View style={styles.teamView1}>
					<View style={styles.viewPlayer}>
						<PlayerView
							number={props?.teamPlayersLocal[10]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersLocal[10]?.playerName?.toUpperCase()}
						/>
					</View>
					<View style={styles.viewPlayer}>
						<PlayerView
							number={props?.teamPlayersLocal[9]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersLocal[9]?.playerName?.toUpperCase()}
						/>
						<PlayerView
							number={props?.teamPlayersLocal[8]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersLocal[8]?.playerName?.toUpperCase()}
						/>
						<PlayerView
							number={props?.teamPlayersLocal[7]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersLocal[7]?.playerName?.toUpperCase()}
						/>
						<PlayerView
							number={props?.teamPlayersLocal[6]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersLocal[6]?.playerName?.toUpperCase()}
						/>
					</View>
					<View style={styles.viewPlayer}>
						<PlayerView
							number={props?.teamPlayersLocal[5]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersLocal[5]?.playerName?.toUpperCase()}
						/>
						<PlayerView
							number={props?.teamPlayersLocal[4]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersLocal[4]?.playerName?.toUpperCase()}
						/>
						<PlayerView
							number={props?.teamPlayersLocal[3]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersLocal[3]?.playerName?.toUpperCase()}
						/>
						<PlayerView
							number={props?.teamPlayersLocal[2]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersLocal[2]?.playerName?.toUpperCase()}
						/>
					</View>
					<View style={styles.viewPlayer}>
						<PlayerView
							number={props?.teamPlayersLocal[1]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersLocal[1]?.playerName?.toUpperCase()}
						/>
						<PlayerView
							number={props?.teamPlayersLocal[0]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersLocal[0]?.playerName?.toUpperCase()}
						/>
					</View>
				</View>
				<View style={styles.teamView2}>
					<View style={styles.viewPlayer}>
						<PlayerView
							number={props?.teamPlayersLocal[10]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersVisitor[10]?.playerName?.toUpperCase()}
						/>
					</View>
					<View style={styles.viewPlayer}>
						<PlayerView
							number={props?.teamPlayersLocal[9]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersVisitor[9]?.playerName?.toUpperCase()}
						/>
						<PlayerView
							number={props?.teamPlayersLocal[8]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersVisitor[8]?.playerName?.toUpperCase()}
						/>
						<PlayerView
							number={props?.teamPlayersLocal[7]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersVisitor[7]?.playerName?.toUpperCase()}
						/>
						<PlayerView
							number={props?.teamPlayersLocal[6]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersVisitor[6]?.playerName?.toUpperCase()}
						/>
					</View>
					<View style={styles.viewPlayer}>
						<PlayerView
							number={props?.teamPlayersLocal[5]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersVisitor[5]?.playerName?.toUpperCase()}
						/>
						<PlayerView
							number={props?.teamPlayersLocal[4]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersVisitor[4]?.playerName?.toUpperCase()}
						/>
						<PlayerView
							number={props?.teamPlayersLocal[3]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersVisitor[3]?.playerName?.toUpperCase()}
						/>
						<PlayerView
							number={props?.teamPlayersLocal[2]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersVisitor[2]?.playerName?.toUpperCase()}
						/>
					</View>
					<View style={styles.viewPlayer}>
						<PlayerView
							number={props?.teamPlayersLocal[1]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersVisitor[1]?.playerName?.toUpperCase()}
						/>
						<PlayerView
							number={props?.teamPlayersLocal[0]?.jerseyNumber?.toUpperCase()}
							name={props?.teamPlayersVisitor[0]?.playerName?.toUpperCase()}
						/>
					</View>
				</View>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%'
	},
	wrapperView: {
		flex: 1,
		marginTop: 28,
		marginBottom: 28,
		flexDirection: 'row'
	},
	viewPlayer: {flexDirection: 'column', alignSelf: 'center', flex: 1},

	teamView1: {flex: 0.5, flexDirection: 'row'},
	teamView2: {
		flex: 0.5,
		flexDirection: 'row-reverse'
	}
});
