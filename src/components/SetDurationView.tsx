import moment from "moment";
import React, { createElement, useState } from "react";
import {
  View,
  StyleSheet,
  TextInputProps,
  Text,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Switch } from "react-native-elements";
import ExpoFastImage from "expo-fast-image";
import icons from "../assets/icon";
import Strings from "../constants/strings";
import { Fonts, horizontalScale, moderateScale, verticalScale } from "../theme";
import colors from "../theme/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useUpdateEffect from "./CustomHooks/useUpdateEffect";
import DatePickerWeb from "./DatePickerWeb";
import { isValidDate } from "../constants/utils/Function";

interface Props extends TextInputProps {
  setSelectedDate: (ans: any) => void;
  selectedDate?: any;
  isTimePick?: boolean;
  onTimePress?: () => void;
  setEndSelectedDate: (ans: any) => void;
  selectedEndDate?: any;
  onPressNeedHelp?: () => void;
}

const SetDurationView: React.FC<Props> = (props) => {
  const {
    setSelectedDate,
    selectedDate,
    isTimePick,
    onTimePress,
    setEndSelectedDate,
    selectedEndDate,
    onPressNeedHelp,
  } = props;

  const [date, setDate] = useState(
    selectedDate ? moment(selectedDate).format("DD MMMM YYYY hh:mm") : ""
  );

  const [endDate, setEndDate] = useState(
    selectedDate ? moment(selectedEndDate).format("DD MMMM YYYY hh:mm") : ""
  );

  useUpdateEffect(() => {
    if (!isValidDate(date)) {
      return;
    }
    if (new Date(date).getTime() > new Date(new Date().getTime() + 9 * 60000)) {
      setSelectedDate(date);
    } else {
      setSelectedDate(null);

      alert(
        `Please select time greater than ${moment(
          new Date(new Date().getTime() + 9 * 60000)
        ).format("DD MMMM YYYY hh:mm A")}`
      );
    }
  }, [date]);

  useUpdateEffect(() => {
    if (!isValidDate(endDate)) {
      return;
    }
    if (
      new Date(endDate).getTime() < new Date(date).getTime() &&
      new Date(endDate).getTime() > new Date(new Date().getTime())
    ) {
      setEndSelectedDate(endDate);
    } else {
      setEndSelectedDate(null);

      alert(
        `Please select time less than ${moment(date).format(
          "DD MMMM YYYY hh:mm A"
        )}`
      );
    }
  }, [endDate]);

  //   const handleConfirm = (date) => {
  //     setisVisible(false);

  //     console.log("date :: ", date);
  //     console.log("::", new Date(new Date().getTime() + 9 * 60000));

  //     if (date > new Date(new Date().getTime() + 9 * 60000)) {
  //       if (selectionType === 1) {
  //         setEndDate(moment(date).format("DD MMMM YYYY hh:mm A"));
  //         setEndSelectedDate(date);
  //       } else {
  //         setDate(moment(date).format("DD MMMM YYYY hh:mm A"));
  //         setSelectedDate(date);
  //         setEndDate(Strings.pick_participate_bet_end_date_time.toUpperCase());
  //         setEndSelectedDate(null);
  //       }
  //     } else {
  //       Alert.alert(
  //         "",
  //         `Please select time greater than ${moment(
  //           new Date(new Date().getTime() + 9 * 60000)
  //         ).format("hh:mm A")}`
  //       );
  //     }

  //     // setisVisible(false);
  //   };

  return (
    <View style={styles.viewDetails}>
      <View style={styles.infoView}>
        <Text style={styles.titleStyle}>{Strings.set_the_duration}</Text>
        <TouchableOpacity onPress={onPressNeedHelp}>
          <ExpoFastImage
            resizeMode={"contain"}
            source={icons.about}
            style={styles.helpImg}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.viewInput}>
        <Text style={styles.inputStyle}>
          {Strings.pick_end_date_time.toUpperCase()}
        </Text>
        <DatePickerWeb
          selected={moment(date).format("YYYY-MM-DD HH:mm")}
          handleChange={(val) => {
            setDate(val);
            console.log("DatePickerWeb", val);
          }}
        />
      </View>

      <View style={styles.viewOption}>
        <Switch
          trackColor={{ false: colors.handleColor, true: colors.corallight }}
          thumbColor={isTimePick ? colors.parrot : colors.handleColor}
          ios_backgroundColor={colors.handleColor}
          onValueChange={onTimePress}
          value={isTimePick}
        />
        <Text style={styles.optionStyle}>
          {Strings.add_bet_participants_time.toUpperCase()}
        </Text>
      </View>
      {isTimePick && (
        <View
          style={[
            styles.viewInput,
            {
              opacity:
                date === Strings.pick_end_date_time.toUpperCase() ? 0.5 : 1,
            },
          ]}
        >
          <ExpoFastImage
            //resizeMode={ExpoFastImage.resizeMode.contain}
            source={icons.calendar_today}
            style={styles.leftImg}
          />
          <Text style={styles.inputStyle}>
            {Strings.pick_participate_bet_end_date_time.toUpperCase()}
          </Text>
          <DatePickerWeb
            selected={moment(endDate).format("YYYY-MM-DD HH:mm")}
            handleChange={(val) => {
              setEndDate(val);
              console.log("DatePickerWeb", val);
            }}
          />
        </View>
      )}
      {/* <DateTimePickerComponet
        onDateChanged={async value => {
          if (
            datetimeMode === 'datetime' &&
            Platform.OS === 'android' &&
            value
          ) {
            await setDatetimeMode('time');
          } else if (
            datetimeMode === 'time' &&
            Platform.OS === 'android' &&
            value
          ) {
            await setisVisible(false);
            setDatetimeMode('datetime');
          } else {
            await setisVisible(false);
          }
          if (value) {
            if (selectionType === 1) {
              setEndDate(moment(value).format('DD MMMM YYYY hh:mm A'));
              setEndSelectedDate(value);
            } else {
              setDate(moment(value).format('DD MMMM YYYY hh:mm A'));
              setSelectedDate(value);
              setEndDate(Strings.pick_end_date_time.toUpperCase());
              setEndSelectedDate(null);
            }
          }
        }}
        visible={isVisible}
        display={'inline'}
        mode={datetimeMode}
        // minimumDate={new Date()}
        minimumDate={
          selectionType === 0
            ? new Date()
            : selectionType === 1
            ? new Date()
            : new Date(new Date(date))
        }
        maximumDate={selectionType === 1 ? new Date(date) : null}
      /> */}

      {/* <DateTimePickerModal
				isVisible={isVisible}
				mode="datetime"
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
				// minimumDate={new Date()}
				minimumDate={new Date(new Date().getTime() + 10 * 60000)}
				maximumDate={selectionType === 1 ? new Date(date) : null}
				display={Platform.OS === 'ios' ? 'spinner' : ''}
				isDarkModeEnabled={false}
				themeVariant="light"
				// minuteInterval={15}
				//disabledDays={{after: new Date()}}
				date={new Date(new Date().getTime() + 10 * 60000)}
			/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  viewDetails: {
    flexDirection: "column",
    borderRadius: verticalScale(10),
    backgroundColor: colors.black,
    overflow: "hidden",
    paddingHorizontal: verticalScale(16),
    paddingVertical: verticalScale(16),
  },
  titleStyle: {
    fontSize: moderateScale(18),
    color: colors.white,
    fontFamily: Fonts.type.Krona_Regular,
    marginVertical: verticalScale(8),
    textAlign: "center",
    flex: 1,
  },

  viewInput: {
    width: "100%",
    marginVertical: verticalScale(16),
    flexDirection: "column",
  },
  inputStyle: {
    color: colors.white,
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.Inter_ExtraBold,
    marginBottom: verticalScale(8),
    textAlign: "left",
  },
  leftImg: {
    height: 17,
    width: 17,
    marginRight: verticalScale(8),
    marginLeft: verticalScale(2),
    tintColor: colors.black,
    top: Platform.OS === "ios" ? -2 : 0,
  },
  viewOption: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(10),
  },
  optionStyle: {
    fontSize: moderateScale(12),
    color: colors.white,
    fontFamily: Fonts.type.Inter_ExtraBold,
    marginLeft: verticalScale(8),
    flex: 1,
  },
  infoView: {
    flexDirection: "row",
    marginHorizontal: horizontalScale(16),
    alignItems: "center",
  },
  helpImg: {
    height: 20,
    width: 20,
  },
});

function DateTimePickerWeb({ value, onChange }: Props) {
  return createElement("input", {
    type: "time",
    value: value,
    onInput: onChange,
  });
}

export default SetDurationView;
