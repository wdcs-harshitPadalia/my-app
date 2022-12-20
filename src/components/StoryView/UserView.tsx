/* eslint-disable */
import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import ExpoFastImage from 'expo-fast-image';
import icons from '../../assets/icon';
import {horizontalScale} from '../../theme';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import {
  dateTimeConvert,
  getLevelRank,
  timeConvert,
} from '../../constants/utils/Function';
import moment from 'moment';
import {defaultTheme} from '../../theme/defaultTheme';

type Props = {
  onClosePress: () => void;
  profileImg: string;
  username: string;
  timeLeft: string;
  friendLevel: number;
  handleRedirectUser : () => void;
};

export default memo(function UserView(props: Props) {
  const {profileImg, username, timeLeft, onClosePress, friendLevel, handleRedirectUser} = props;

  return (
    <View style={styles.rootContainer}>
      <TouchableOpacity style={styles.userDetailContainer} onPress={handleRedirectUser}>
        <View>
          <ExpoFastImage source={{uri: profileImg}} style={styles.userProfile} />
          <ExpoFastImage
            source={getLevelRank(friendLevel)?.image}
            //source={icons.profileBadge}
            style={styles.userProfileBadge}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={styles.userNameText}>{username}</Text>
          <Text style={styles.timeLeftText}>
            {moment(new Date(timeLeft)).fromNow(true)}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} onPress={onClosePress}>
        <ExpoFastImage source={icons.close} style={styles.closeIcon} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    width: '100%',
  },
  userDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: horizontalScale(16),
  },
  userProfile: {height: 36, width: 36, borderRadius : 18},
  userProfileBadge: {
    height: 18,
    width: 18,
    position: 'absolute',
    top: 2,
    right: -8,
  },
  userNameText: {
    marginLeft: horizontalScale(20),
    fontSize: 12,
    fontFamily: fonts.type.Krona_Regular,
    fontWeight: '400',
    color: colors.white,
  },
  timeLeftText: {
    marginLeft: horizontalScale(16),
    fontSize: 12,
    fontFamily: fonts.type.Inter_Regular,
    fontWeight: '500',
    color: colors.textTitle,
  },
  closeIcon: {
    height: 18,
    width: 18,
    marginHorizontal: horizontalScale(16),
  },
});
