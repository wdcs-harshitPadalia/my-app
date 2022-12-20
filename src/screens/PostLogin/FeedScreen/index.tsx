import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Platform,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { connectClient } from "@amityco/ts-sdk";
import { useNavigation } from "@react-navigation/native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Directions } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getNotificationPermission } from "../../../notificationManager";

import icons from "../../../assets/icon";
import styles from "./style";
import { defaultTheme } from "../../../theme/defaultTheme";

import Strings from "../../../constants/strings";
import { createBetDetailsPreviewShareUrl } from "../../../constants/utils/Function";

import ScreenNames from "../../../navigation/screenNames";

import {
  cancel,
  getAllStoriesData,
  getCategory,
  getFeeds,
  getSubcategory,
  postReportMatch,
} from "../../../redux/apiHandler/apiActions";
import {
  hideBottomTab,
  resetFeeds,
  showCreateHighlights,
  showInviteUser,
  showTutorial,
  updateFeedRefreshOnFocus,
} from "../../../redux/reducerSlices/dashboard";
import { updateApiLoader } from "../../../redux/reducerSlices/preLogin";
import { updateNotificationBadgeStatus } from "../../../redux/reducerSlices/userInfo";
import { RootState } from "../../../redux/store";

import ConformationPopupComponet from "../../../components/ConformationPopupComponet";
import useUpdateEffect from "../../../components/CustomHooks/useUpdateEffect";
import HeaderComponent from "../../../components/HeaderComponent";
import LiveStreamingFlatList from "../../../components/LiveStreamingFlatList";
import ScrollableCustomTabView from "../../../components/ScrollableCustomTabView";
import Stories from "../../../components/StoryView/Stories";

import ReportFeedView from "../../../components/Events/ReportFeedView";
import NoDataComponent from "../../../components/NoDataComponent";
import HomeTutorialList from "../../../components/HomeTutorialList";
import FlingGestureComponent from "../../../components/FlingGestureComponent";
import FriendFlatList from "../../../components/FriendFlatList";
import { trackUserIdentification } from "../../../components/SmartLookSDKHelper";

const FeedScreen: React.FC<any> = (props) => {
  const categoryRef = useRef();
  const subCategoryRef = useRef();

  const navigation = useNavigation();
  const connector = useWalletConnect();
  const dispatch = useDispatch();

  const [categoryData, setCategoryData] = useState();
  const [subCategoryData, setSubCategoryData] = useState();

  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isReportPopupShown, setIsReportPopupShown] = useState(false);

  const isTutorial = useSelector((state: RootState) => {
    return state.dashboard.isShowTutorial;
  });
  const [isShowTutorial, setIsShowTutorial] = useState(false);

  const [isShowTrendingUser, setIsShowTrendingUser] = useState(false);

  const [totalPage, setTotalPage] = useState(0);
  const [storyCurrentPageNo, setStoryCurrentPageNo] = useState(0);
  const [userTotalStoryCount, setUserTotalStoryCount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [selectedMatchBetId, setSelectedMatchBetId] = useState("");

  const [storyData, setStoryData] = useState([]);

  const noDataItemObj = {
    image_url: icons.no_match,
    title_text: Strings.no_match,
    description_text: Strings.no_match_desc,
  };

  const feedInfo = useSelector((state: RootState) => {
    return state.dashboard.feedData;
  });

  const shouldFeedRefreshOnFocus = useSelector((state: RootState) => {
    return state.dashboard.shouldFeedRefreshOnFocus;
  });

  const feedInfoLoading = useSelector((state: RootState) => {
    return state.dashboard.loading;
  });

  const feedErrorInfo = useSelector((state: RootState) => {
    return state.dashboard.failed;
  });

  const userInfo = useSelector((state: RootState) => {
    return state.userInfo.data;
  });

  const isShowBadgeStatus = useSelector((state: RootState) => {
    return state.userInfo.data.shouldShowNotificationBadge;
  });

  const isShowChatBadgeStatus = useSelector((state: RootState) => {
    return state.userInfo.data.shouldShowChatBadge;
  });

  useEffect(() => {
    console.log("connector.connected :: ", connector.connected);
  }, [connector]);

  useEffect(() => {
    trackUserIdentification(userInfo.user?.userName);
    getCategoryData();
    // connectClient({
    // 	userId: userInfo.user?._id,
    // 	displayName: userInfo.user?.userName
    // });
    // getNotificationPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      getAllStories(storyCurrentPageNo);
      setStoryCurrentPageNo(storyCurrentPageNo);
      if (shouldFeedRefreshOnFocus) {
        dispatch(updateFeedRefreshOnFocus(false));
        resetFeedApiData(true);
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [
    navigation,
    selectedCategory,
    selectedSubCategory,
    shouldFeedRefreshOnFocus,
  ]);

  useEffect(() => {
    if (storyCurrentPageNo !== 0) {
      getAllStories(storyCurrentPageNo);
    }
  }, [storyCurrentPageNo]);

  useUpdateEffect(() => {
    console.log(
      "useUpdateEffect :: ",
      selectedCategory,
      selectedSubCategory,
      currentPage
    );

    if (
      (currentPage <= totalPage || totalPage === 0) &&
      (selectedSubCategory?._id ||
        selectedCategory?.name === "All" ||
        selectedCategory?.isCustom)
    ) {
      if (currentPage === 1) {
        // dispatch(updateApiLoader({apiLoader: true}));
      } else {
        setIsLoading(true);
      }
      callFeedApi();
    }
  }, [currentPage, selectedSubCategory]);

  const getAllStories = (currentPageNumber) => {
    const uploadData = {
      skip: currentPageNumber,
      limit: 10,
    };

    getAllStoriesData(uploadData)
      .then((res) => {
        setUserTotalStoryCount(res.data?.count);
        //console.log('getAllStoriesData res : ', JSON.stringify(res));
        if (res?.data?.userStories?.length > 0) {
          if (storyCurrentPageNo == 0) {
            setStoryData(res.data.userStories);
          } else {
            setStoryData([...storyData, ...res.data.userStories]);
          }
        }
      })
      .catch((err) => {
        //console.log('getAllStoriesData Err : ', JSON.stringify(err));
      });
  };

  const resetFeedApiData = async (isFromPullRefresh = false) => {
    await dispatch(resetFeeds({ isFromPullToRefresh: isFromPullRefresh }));
    setTotalPage(0);
    setCurrentPage(1);

    if (isFromPullRefresh) {
      callFeedApi();
      setStoryCurrentPageNo(0);
      setUserTotalStoryCount(0);
      // setStoryData([]);
    }
  };

  const callFeedApi = () => {
    console.log(
      "callFeedApi ::",
      selectedCategory?._id,
      selectedSubCategory?._id,
      selectedCategory?.name,
      selectedCategory?.isCustom
    );
    if (
      (selectedCategory?._id && selectedSubCategory?._id) ||
      selectedCategory?.name === "All" ||
      selectedCategory?.isCustom
    ) {
      dispatch(
        getFeeds({
          limit: "10",
          skip: currentPage - 1,
          category_id: selectedCategory?._id ?? "",
          sub_category_id: selectedSubCategory?._id ?? "",
          all: selectedCategory?.name === "All",
        })
      );
    } else {
      resetFeedApiData();
    }
  };

  useUpdateEffect(() => {
    if (feedErrorInfo) {
      setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
    }
  }, [feedErrorInfo]);

  useUpdateEffect(() => {
    console.log("useUpdateEffect :: feedInfo");
    setIsLoading(false);
    setIsRefreshing(false);

    if (feedInfo?.matchCount && feedInfo?.matchCount > 0) {
      setTotalPage(Math.ceil(feedInfo?.matchCount / 10));
    } else {
      setTotalPage(0);
    }
    // return () => resetFeedApiData();
    // return () => {
    //   dispatch(resetFeeds({isFromPullToRefresh: true}));
    // };
  }, [feedInfo]);

  useUpdateEffect(() => {
    if (currentPage === 1 && isRefreshing === false) {
      dispatch(updateApiLoader({ apiLoader: feedInfoLoading }));
    } else if (feedInfoLoading === false) {
      dispatch(updateApiLoader({ apiLoader: false }));
    }
  }, [feedInfoLoading]);

  const getCategoryData = async () => {
    //const magicLoginStatus = await magic.user.isLoggedIn();
    //if (magicLoginStatus || connector?.connected) {
    dispatch(updateApiLoader({ apiLoader: true }));

    getCategory()
      .then((res) => {
        // console.log('getCategoryData Response : ', JSON.stringify(res));
        // setTimeout(() => {
        //   dispatch(updateApiLoader({apiLoader: false}));
        // }, 100);

        dispatch(updateNotificationBadgeStatus(res.data.unreadNotifications));
        let allCategory = {
          name: "All",
        };
        let categoryResponse = [allCategory, ...res.data.category];
        setCategoryData(categoryResponse);
        setSelectedCategory(categoryResponse[0]);
        if (res?.data.category.length > 0) {
          //getSubCategoryData(res?.data.category[0]._id);
          setSelectedSubCategory(allCategory);
        } else {
          setSelectedSubCategory({});
        }
      })
      .catch((err) => {
        setSelectedCategory({});
        // setTimeout(() => {
        //   dispatch(updateApiLoader({apiLoader: false}));
        // }, 100);

        //console.log('getCategoryData Data Err : ', err);
      });
    // } else {
    //   Alert.alert(Strings.txt_session_expire_msg);
    //   dispatch(updateDeviceToken({deviceToken: ''}));
    //   dispatch(resetProfileData({}));
    //   await magic.user.logout();
    //   connector?.killSession && connector?.killSession();
    //   magic.user.isLoggedIn().then(value => {
    //     console.log(value, 'magic.user.isLoggedIn()');
    //   });
    //   dispatch(logout());
    //   console.log('magic.user.isLoggedIn()');
    // }
  };

  const getSubCategoryData = (categoryID: string) => {
    console.log("getSubCategoryData :: ", JSON.stringify(selectedCategory));

    if (cancel != undefined) {
      cancel();
    }
    setSubCategoryData([]);
    getSubcategory(categoryID)
      .then(async (res) => {
        //console.log('getSubCategoryData Response : ', JSON.stringify(res));
        setSubCategoryData(res?.data.subcategory);
        if (res?.data.subcategory.length > 0) {
          await resetFeedApiData();
          await setSelectedSubCategory(res?.data.subcategory[0]);
          // setSelectedSubCategory(res?.data.subcategory[0]);
        } else {
          if (currentPage === 1) {
            setSelectedSubCategory({});
          }
        }
      })
      .catch((err) => {
        //console.log('getSubCategoryData Data Err : ', err);
        setSelectedSubCategory({});
      });
  };

  // const renderFollowingUserItem = ({item, index}) => (
  //   <FollowingUserView
  //     username={item.displayName ?? item.userName}
  //     profileImgPath={item.picture}
  //     betsCount={item.activeBets}
  //     style={{height: horizontalScale(275)}}
  //     onClosePress={() => {
  //       console.log('onClosePress');
  //       removeUser(item._id);
  //     }}
  //     onFollow={() => {
  //       console.log('onPress');
  //       postFollowUser(item._id);
  //     }}
  //     onSendMessage={() => {
  //       console.log('onSendMessage');
  //       Alert.alert('Coming Soon!');
  //       //navigation.navigate(ScreenNames.ChatDetailsScreen);
  //     }}
  //   />
  // );

  const handleShare = async (id, matchId, isBet, betQuestion) => {
    if (Platform.OS === "ios") {
      try {
        const result = await Share.share({
          url: isBet
            ? createBetDetailsPreviewShareUrl(
                Strings.str_bet_details,
                id,
                matchId,
                1,
                isBet
              )
            : createBetDetailsPreviewShareUrl(
                Strings.feed,
                id,
                matchId,
                1,
                isBet
              ),
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    } else {
      try {
        const result = await Share.share({
          message: isBet
            ? createBetDetailsPreviewShareUrl(
                Strings.str_bet_details,
                id,
                matchId,
                1,
                isBet
              )
            : createBetDetailsPreviewShareUrl(
                Strings.feed,
                id,
                matchId,
                1,
                isBet
              ),
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  };

  const onSwipeChange = (directionName) => {
    const { LEFT, RIGHT } = Directions;
    let index = categoryData.findIndex(function (o) {
      return o._id === selectedCategory?._id;
    });

    let index1 = categoryData.findIndex(function (o) {
      return o._id === selectedCategory?._id;
    });

    switch (directionName) {
      case LEFT:
        // if (subCategoryData.length > 1 && index1 < subCategoryData.length - 1) {
        //   const item = subCategoryData[index1 + 1];
        //   resetFeedApiData();
        //   setSelectedSubCategory(item);
        //   // setSelectedIndex(index + 1);
        //   subCategoryRef.current.scrollToIndex({index: index1 + 1});
        //   return;
        // }
        if (index < categoryData.length - 1) {
          const item = categoryData[index + 1];
          resetFeedApiData();
          setSelectedCategory(item);
          getSubCategoryData(item._id);
          setSelectedIndex(index + 1);
          categoryRef.current.scrollToIndex({ index: index + 1 });
        }
        break;
      case RIGHT:
        if (index > 0) {
          const item = categoryData[index - 1];
          resetFeedApiData();
          setSelectedCategory(item);
          getSubCategoryData(item._id);
          setSelectedIndex(index - 1);
          categoryRef.current.scrollToIndex({ index: index - 1 });
        }
        break;
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        onAddMenuPress={async () => {
          // //navigation.navigate(ScreenNames.SettingsScreen);
          // dispatch(updateDeviceToken({deviceToken: ''}));
          // dispatch(resetProfileData({}));
          // dispatch(logout());
          // await magic.user.logout();
          // connector?.killSession();
          // magic.user.isLoggedIn().then(value => {
          //   console.log(value, 'magic.user.isLoggedIn()');
          // });
          // console.log('magic.user.isLoggedIn()');
          // setModalVisible(true);
        }}
        onWalletPress={() => {
          navigation.navigate(ScreenNames.WalletScreen);
        }}
        userInfo={userInfo}
        onNotificationMenuPress={() => {
          navigation.navigate(ScreenNames.NotificationScreen);
        }}
        onSendIconPath={icons.ic_send}
        onSendMenuPress={() => {
          navigation.navigate(ScreenNames.ChatListScreen);
        }}
        height={26}
        width={26}
        onNotificationIconPath={icons.notifications_gray}
        onLeftIconFilterPath={icons.ic_filter}
        onLeftMenuPress={() => {
          navigation.navigate(ScreenNames.ApplyFilterScreen, {
            title: Strings.feed,
          });
        }}
        // onAddIconPath={icons.plusRed}
        isSendBadge={isShowChatBadgeStatus}
        isNotificationBadge={isShowBadgeStatus}
        isShowBalance={true}
      />
      <>
        <View
          style={{
            // marginHorizontal: horizontalScale(16),
            marginHorizontal: 16,
            flex: 1,
          }}
        >
          <FlingGestureComponent
            onSwipeLeft={() => onSwipeChange(Directions.LEFT)}
            onSwipeRight={() => onSwipeChange(Directions.RIGHT)}
          >
            <LiveStreamingFlatList
              data={feedInfo.matchList}
              shouldShowBottomButtons
              tagLeftImagePath={icons.timer}
              cellTapped={(item) => {
                if (item?.dataType === "customBet") {
                  navigation.navigate(ScreenNames.CustomBetDetailsScreen, {
                    title: Strings.feed,
                    betCreationType: 1,
                    betId: item.bet_id,
                    id: item?._id,
                    // feedObject: item,
                    // selectedBetType: feedInfo.betType,
                  });
                } else {
                  navigation.navigate(ScreenNames.EventDetailsScreen, {
                    title: Strings.feed,
                    betCreationType: 1,
                    matchId: item._id,
                    // feedObject: item,
                    // selectedBetType: feedInfo.betType,
                  });
                }
              }}
              headerView={
                <>
                  {/* User Story View */}
                  {storyData.length > 0 && (
                    <View style={{ height: 90, marginHorizontal: 16 }}>
                      <Stories
                        data={storyData}
                        onEndReached={() => {
                          if (userTotalStoryCount !== storyData.length) {
                            setStoryCurrentPageNo(storyCurrentPageNo + 1);
                          }
                        }}
                      />
                    </View>
                  )}

                  <View style={{ marginBottom: 8 }}>
                    {categoryData?.length > 0 && (
                      <ScrollableCustomTabView
                        gradientColors={defaultTheme.ternaryGradientColor}
                        dataSource={categoryData}
                        onTabChange={async (item, index) => {
                          resetFeedApiData();
                          setSelectedIndex(index);
                          setSelectedCategory(item);
                          // console.log("sourece>><???", source.token)
                          //source.cancel('Operation canceled by the user.');
                          getSubCategoryData(item._id);
                        }}
                        selectedIndex={selectedIndex}
                        isFromCategory={true}
                        ref={categoryRef}
                      />
                    )}

                    {subCategoryData?.length > 0 && (
                      <ScrollableCustomTabView
                        dataSource={subCategoryData}
                        onTabChange={(item) => {
                          resetFeedApiData();
                          setSelectedSubCategory(item);
                          //getSubCategoryData(item._id);
                        }}
                        //style={{marginBottom: verticalScale(16)}}
                        selectedIndex={0}
                        ref={subCategoryRef}
                        isFromDiscover
                      />
                    )}
                  </View>

                  <View style={styles.trendUserContainerStyle}>
                    {isShowTrendingUser && (
                      <View style={styles.trendUserTextContainerStyle}>
                        <Text style={styles.trendUserTextStyle}>
                          {Strings.str_trending_users}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate(
                              ScreenNames.UserViewProfileScreen,
                              {
                                isFromFeed: true,
                              }
                            );
                          }}
                        >
                          <Text style={styles.seeAllTextStyle}>
                            {Strings.str_see_all}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    <FriendFlatList
                      onShowList={(isShow) => setIsShowTrendingUser(isShow)}
                      userId={userInfo.user?._id}
                      isFromFeed={true}
                    />
                  </View>
                </>
              }
              onNextPageLoaded={() => {
                totalPage > 1 && setCurrentPage(currentPage + 1);
              }}
              isRefreshing={isRefreshing}
              onRefreshCall={() => {
                setIsRefreshing(true);
                // setTimeout(() => {
                //   setIsRefreshing(false);
                // }, 1000);
                resetFeedApiData(true);
                dispatch(updateApiLoader({ apiLoader: true }));
                //callFeedApi();
                // setCategoryData([]);
                // setSubCategoryData([]);
                // setSelectedCategory({});
                // setSelectedSubCategory({});
                // getCategoryData();
                getAllStories(0);
                console.log("onRefreshCall>?????");
              }}
              isLoading={isLoading}
              onMenuPressed={(data, item) => {
                console.log("item :: ", JSON.stringify(item));

                switch (data.id) {
                  case 0:
                    if (item?.dataType === "customBet") {
                      setSelectedMatchBetId(item._id);
                      setSelectedMatchId("");
                    } else {
                      setSelectedMatchId(item._id);
                      setSelectedMatchBetId("");
                    }
                    setTimeout(() => {
                      setIsReportPopupShown(true);
                    }, 500);
                    break;
                  case 1:
                    setTimeout(() => {
                      if (item?.dataType === "customBet") {
                        handleShare(
                          item._id,
                          item?.bet_id,
                          true,
                          item?.betQuestion
                        );
                      } else {
                        handleShare(item._id, item._id, false, "");
                      }
                    }, 500);
                    break;
                  case 2:
                    // console.log('====================================');
                    // console.log('item ::', item);
                    // console.log('====================================');
                    navigation.navigate(ScreenNames.StoryShareScreen, {
                      feedObject: item,
                      isFromFeed: true,
                      matchId:
                        item?.dataType === "customBet" ? undefined : item?._id,
                    });
                    break;
                  // case 3:
                  // 	setTimeout(() => {
                  // 		handleShare(item.bet_id, true, item?.betQuestion);
                  // 	}, 500);
                  // 	break;
                  default:
                    break;
                }
              }}
              onDiscoverButtonClicked={(item) => {
                if (item?.dataType === "customBet") {
                  navigation.navigate(ScreenNames.CustomBetDetailsScreen, {
                    title: Strings.feed,
                    betCreationType: 1,
                    betId: item.bet_id,
                    id: item?._id,
                    // feedObject: item,
                    // selectedBetType: feedInfo.betType,
                  });
                } else {
                  navigation.navigate(ScreenNames.EventDetailsScreen, {
                    title: Strings.feed,
                    betCreationType: 1,
                    matchId: item._id,
                    // feedObject: item,
                    // selectedBetType: feedInfo.betType,
                  });
                }
              }}
              onCreatBetButtonClicked={(item) => {
                // console.log('onCreatBetButtonClicked', item);
                if (item?.dataType === "customBet") {
                  navigation.navigate(ScreenNames.ReplicateBetCreatScreen, {
                    eventBetData: item,
                    // selectedBetType: feedInfo.betType,
                  });

                  // navigation.navigate(ScreenNames.CustomBetDetailsScreen, {
                  //   title: Strings.feed,
                  //   betCreationType: 1,
                  //   betId: item.bet_id,
                  // 	 id: item?._id
                  //   // feedObject: item,
                  //   // selectedBetType: feedInfo.betType,
                  // });
                } else {
                  navigation.navigate(ScreenNames.BetsCategoryScreen, {
                    matchData: item,
                    betCreationType: 1,
                    selectedBetType: feedInfo.betType,
                  });
                }
              }}
            />
          </FlingGestureComponent>
        </View>
      </>

      <ConformationPopupComponet
        popupTitle={Strings.whatDoYouWantToCreate}
        buttonOkTitle={Strings.p2pBet}
        isVisible={modalVisible}
        onPressOk={() => {
          console.log("onPressOk");

          setModalVisible(!modalVisible);
          navigation.navigate(ScreenNames.BetsCategoryScreen);
        }}
        onPressCancel={() => {
          setModalVisible(!modalVisible);
        }}
      />

      <ReportFeedView
        onPressCancel={() => {
          setIsReportPopupShown(false);
        }}
        onPressOk={(tag, description) => {
          setIsReportPopupShown(false);
          const data = {
            tagText: tag === "Other" ? description : tag,
            matchId: selectedMatchId,
            betId: selectedMatchBetId,
            customTag: tag === "Other" ? 1 : 0,
          };
          console.log("====================================");
          console.log("data :: ", data);
          console.log("====================================");
          postReportMatch(data).then((res) => {
            // console.log('res ::', JSON.stringify(res));
            Alert.alert("", res?.message ?? Strings.somethingWentWrong);
          });
        }}
        isVisible={isReportPopupShown}
      />

      {feedErrorInfo && feedInfo?.matchCount === 0 && !isShowTrendingUser ? (
        <FlingGestureComponent
          onSwipeLeft={() => onSwipeChange(Directions.LEFT)}
          onSwipeRight={() => onSwipeChange(Directions.RIGHT)}
          style={styles.container}
        >
          <View style={styles.noDataContainer}>
            <NoDataComponent noData={noDataItemObj} isFromFeedScreen={true} />
          </View>
        </FlingGestureComponent>
      ) : (
        <></>
      )}
      {isShowTutorial && (
        <HomeTutorialList
          onNextPress={async () => {
            setIsShowTutorial(!isShowTutorial);
            navigation.navigate(ScreenNames.BottomTabScreen, {
              screen: ScreenNames.LiveTabRoutes,
              params: {
                screen: ScreenNames.LiveStreamingScreen,
              },
            });
          }}
          onSkipPress={async () => {
            dispatch(showTutorial({ isShowTutorial: false }));
            dispatch(showCreateHighlights({ isShowCreateHighlights: false }));

            setIsShowTutorial(!isShowTutorial);
            global.tutorialTimer = setTimeout(() => {
              dispatch(hideBottomTab({ isHideBottomTab: true }));
              dispatch(showInviteUser({ isShowInviteUser: true }));
            }, 120000);
          }}
        />
      )}
    </View>
  );
};

export default FeedScreen;
