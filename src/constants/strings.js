import app from '../../app.json';
import {videoMaximumDuration, videoMinimumDuration} from './api';
const Strings = {
	signuptostartbetting: 'Connect to start challenging your friends!',
	email: 'Email',
	emailOrPhone: 'Email/Phone',
	phone: 'Phone',
	country: 'Country',
	selectCountry: 'Select country',
	dateOfBirth: 'Date of birth',
	pickDate: 'pick date',
	pickTime: 'pick Time',
	username: 'Username',
	ok: 'Ok',
	alreadyLogin: 'Already Login',
	somethingWentWrong: 'Something went wrong!',
	You_have_not_made_any_bet_yet: 'You have not made any Challenge yet.',
	erroBlanklogin: 'Enter email',
	enterValidEmail: 'Enter a valid email',
	errorBlankEmail: 'Please Enter Email',
	errorBlankUser: 'Please Enter User Name',
	errorUserTextLength: 'User name should be in between of 2-64 characters.',
	errorTerms: 'Please accept terms',
	errorBlankCountry: 'Please Select Country',
	errorBlankDob: 'Please Select Date',
	alreadyhaveanaccount: 'Already have an account?',
	Log_in: ' Log in',
	orconnectwith: 'Or connect with:',

	login: 'log in',
	loginwithgoogle: 'connect with google',
	loginwithapple: 'connect with apple',
	loginwithFacebook: 'connect with Facebook',
	replicate_this_bet_btn: 'replicate this challenge',
	metamask: 'metamask',
	connect_metamask: 'connect with metamask',
	disconnect_metamask: 'disconnect from metamask',
	welcome: 'Welcome to',
	defibetHouse: 'truly.fun',

	//Bottom tabs
	bottomTabLive: 'Live',
	bottomTabWallet: 'Wallet',
	bottomTabDiscover: 'Discover',
	bottomTabProfile: 'Profile',
	bottomTabCreate: 'Create',
	bottomTabBets: 'Challenges',

	feed: 'Feed',
	live: 'Live',
	wallet: 'Wallet',
	discover: 'Discover',
	profile: 'Profile',

	filters: 'Filters',
	notifications: 'Notifications',
	private_messages: 'Private messages',
	new_message: 'New message',
	event_details: 'Event Details',
	user_details: 'User Details',
	feed_filter: 'Feed Filter',
	dispute_result: 'Dispute Result',
	dispute_thank_you: 'Thank you',
	dispute_info: 'Dispute Info',
	dispute_open: 'Open Dispute',
	dispute_view: 'View Dispute',
	user_view_list: 'User view profile list',

	setupyourprofile: 'Set up your profile',
	submit: 'submit',

	acceptandagree:
		'I am at least 18 years of age and I have read, accept and agree to the ',
	termsAndConditions: 'Terms and Conditions',
	rules: 'Rules',
	privacyPolicy: 'Privacy Policy',

	done: 'Done',
	apply: 'Apply',
	cancel: 'Cancel',

	activeBets: 'Active Challenges',
	followers: 'Followers',
	following: 'Following',
	create: 'Create',
	wallets: 'Wallet',
	betStatistics: 'Challenge statistics',
	betsWon: 'Challenges won:',
	betsLost: 'Challenges lost:',
	betsPending: 'Challenges pending:',
	requested: 'Requested',
	unFollow: 'UnFollow',
	respond: 'Respond',

	mostLovedCategories: 'most loved categories',

	total: 'Total',
	str_balance: ' Balance',
	balance: 'Balance',
	allTime: 'all time',
	eth: 'ETH',
	bnb: 'BNB',
	usd: 'USD',
	total_volume: 'Total volume',
	open_bets: 'Open Challenge',
	pause_all: 'PAUSE ALL',
	push_notification: 'Push notification',

	//push notification
	someone_takes_bet: 'someone takes your Challenge',
	someone_replicates_bet: 'someone replicates your Challenge',
	bet_invitation: 'Challenge invitations',
	new_Followers: 'new followers',
	interactions: 'Interactions',
	messages: 'Messages',
	events_bets_suggestions: 'events/challenges suggestions',
	your_friends_bets: 'your friends Challenges',
	events_you_might_like: 'events you might like',
	Other: 'Other',
	People_you_may_know: 'People you may know',

	//live streaming
	STREAMING: 'STREAMING',
	HOT: 'HOT',
	FRIENDS: 'FRIENDS',
	New_bets: 'New Challenges',
	Z_A: 'Z - A',
	A_Z: 'A - Z',
	starts: 'STARTS: ',
	ends: 'ENDS: ',

	//Profile
	settings: 'Settings',
	changeProfilePhoto: 'Change Profile Photo',
	editProfile: 'Edit Profile',
	displayName: 'Display name',
	name: 'Name',
	progress: 'Progress',
	nextGoal: 'Next lvl. Goal',
	currentFees: 'Current Fees',
	// website: 'Website',
	bioGraphy: 'Biography',
	personalInformation: 'Personal Information',
	emailAddress: 'Email address',
	privacy: 'Privacy',
	makeYourProfileVisible: 'make your profile visible',
	defineWhoCan: 'Define who can:',
	seeYourBettingStatistics: 'see your Challenges statistics',
	seeYourBalance: 'see your balance',
	seeYourBets: 'see your Challenges',
	sendYouDirectMessages: 'Send You Direct Messages',
	friends: 'Friends',
	users: 'Users',
	nobody: 'Nobody',
	anyone: 'Anyone',

	preferences: 'Preferences',
	selectYourCategories: 'Select your favorite categories and sub-categories:',

	bettingStatistics: 'Challenges statistics',
	whoCanSeeYourBettingSatistics: 'Who can see your Challenges satistics?',
	WhoCanSeeYourBalance: 'Who can see your balance?',
	bets: 'Challenges',
	WhoCanSeeYourBets: 'Who can see your Challenges?',
	directMessages: 'Direct Messages',
	WhoCanSendYouDMs: 'Who can send you DMs?',
	back: 'Back',
	next: 'next',
	confirm: 'confirm',
	faq: 'FAQ',
	your_are_connected_with: 'You are connected with',
	my_experience: 'My Experience',

	//wallet
	str_wallet: 'Wallet',
	Your_wallet_address: 'Your wallet address',
	Your_wallet_qr_code: 'Your wallet qr code',
	Reveal_Private_Key: 'Reveal private key',
	deposit: 'deposit',
	withdrawal: 'withdrawal',
	buy_crypto: 'buy_game coins',
	buy_crypto_btn: 'Buy game coins with credit card',
	Balance: 'Balance',
	Stats: 'Stats',
	View_details: 'View details',
	won_bets: 'won Challenge',
	lost_bets: 'lost Challenges',
	Money_won: 'Money won',
	Lost: 'Lost',
	Last_month: 'Last month',
	your_wallet: 'your wallet',
	copy_to_clipboard: 'copy to clipboard',
	Details: 'Details',
	Live_Streaming: 'Live Streams',
	Text: 'Text',
	saveChanges: 'save changes',
	follow: 'Follow',
	followBack: 'Follow back',
	sendDM: 'Send DM',
	send: 'Send',
	instagramLogin: 'instagram login',
	twitterLogin: 'twitter login',
	facebookLogin: 'Facebook login',
	instagramFriends: 'Instagram Friends',
	yourContacts: 'Your Contacts',
	Deposit: 'Deposit',
	Withdrawal: 'Withdrawal',
	BuyCrypto: 'Buy game coins',
	findFriends: 'Find Friends',
	whatDoYouWantToCreate: 'What do you want to create?',
	p2pBet: 'P2P Challenge',
	whatAreYouBettingOn: 'What kind of Challenge are you creating?',

	searchCategory: 'search category...',
	searchSport: 'search sport...',
	searchLeague: 'search league...',

	category: 'Category',
	browseLeagues: 'browse\nleagues',
	createYourOwn: 'Create your\nown',
	createYour_Own: 'Create your own',

	custom: 'Custom',
	findYourFavoriteLeagues:
		'Looking for a local league challenge or match among friends?',
	letSetUPYourBet: 'Letâ€™s set up your Challenge, ',
	betType: 'Challenge type',
	select_a_game: 'Select a game',
	select_a_market: 'Select a market',
	choose_your_side: 'Choose your side',

	singleMatch: 'Single match',
	needHelpChoosing: 'Need help choosing?',
	mainMarkets: 'Main markets',
	markets: 'Market',

	writeInBetDescription: 'Write Challenge Description',
	placeYourBet: 'Place your Challenge',
	You_pay: 'You pay',
	You_get: 'You get',
	add_a_card: 'add a card',
	add_card_and_buy: 'add card and buy',
	Polygon_Transfer: 'Polygon transfer',
	Debit_Credit_Card: 'Debit / Credit Card',
	ETH_Network_Transfer: 'ETH Network Transfer',
	searchToken: 'search token...',
	odds: 'Odds',
	how_much_do_you_want_to_bet: 'Select Challenge amount',
	pays: 'Pays',
	review_your_bet: 'Review your Challenge',
	yes: 'Yes',
	your_bet: 'your selection:',
	your_opponents_bet: 'Your opponentâ€™s selection',
	no: 'No',
	bet_details: 'Challenge details',
	str_bet_details: 'Challenge_details',
	yourBet: 'Your Challenge',
	you_are_almost_done: 'You are almost done, ',
	invite_your_friends: 'Invite your friends',
	invite: 'Invite',
	bet_privacy: 'Challenge privacy',
	public_bet: 'Public Challenge',
	anybody_can_join: 'Anybody can join.',
	private_bet: 'Private Challenge',
	who_participates:
		'You decide who participates. This Challenge will only be visible to the participant you invite.',
	share_your_bet: 'Share your Challenge',
	share_on_whatsapp: 'share on WhatsApp',
	share_on_telegram: 'share on Telegram',
	share_on_twitter: 'share on Twitter',
	copy_link: 'copy link',
	copy_link_desc: 'Link copied to clipboard.',
	copy_wallet_add_desc: 'Wallet address copied to clipboard.',
	or_share_with: 'or share with',
	continue_to_feed: 'continue to feed',
	well_done_bet_has_been_created: 'Well done, %s! Your Challenge has been created ðŸŽ‰',
	well_done_bet_has_been_joined:
		'Well done, %s! You have joined the Challenge successfully ðŸŽ‰',
	this_bet_already_joined: 'This Challenge already joined.',
	well_done_result_has_been_verified:
		'Well done, %s! The result of your Challenge has been verified!',
	LAST_MINUTE: 'LAST MINUTE',
	add_participants: 'Add participants',
	search: 'Search...',
	str_search: 'Search',
	send_invite: 'send invite',
	search_events_users_more: 'Search events, users, and more',
	search_events_bets: 'Search events and Challenge',
	search_users: 'Search users',

	time_to_create_your_market: 'Let\'s create your Challenge',
	write_Question_Market: 'Write Question / Challenge Terms',
	write_your_question: 'write in the question or terms that accurately define your Challenge',
	how_many_results: 'How many results?',
	results: 'Results',
	set_the_options: 'Set the options',
	add_end_time: 'add end time',
	when_will_the_bet_end: 'When will the Challenge end?',
	set_the_duration: 'Set End Date & Time',
	pick_end_date: 'Pick end date',
	pick_end_time: 'Pick end time',
	pick_end_date_time: 'Pick end date & time',
	got_it: 'got it!',
	app_name: app.displayName,
	Metamask_does_not_connected: 'Metamask is not connected.',
	Connect: 'Connect',
	no_notification: 'Your notifications\nwill appear here',
	no_notification_desc: 'No notifications yet',
	no_private_message: 'You have not yet\nchatted',
	no_private_message_desc: 'Your messages will appear here',
	no_Data_Found: 'No Data Found',
	betBack: 'Are you sure you want to leave the current Challenge?',
	please_enter_valid_amount: 'Minimum amount is $1',
	bet_amount_must_be_more_than_1_USD:
		'Challenge amount in USD must be more than 1 USD',
	select_odd: 'Select odd',
	internetOff: 'No connection',
	Prediction_markets: 'Prediction Markets',
	P2P_Bets: 'P2P Challenges',
	share_to_your_story: 'Share to your story',
	send_link_via: 'Send link via...',
	send_to_a_friend: 'Send to a friend:',
	event: 'event',
	add_bet_participants_time: 'add Challenge participants time',
	Create_a_bet_on_this_event: 'Create a Challenge on this event',
	Create_a_predication_market_on_this_event:
		'Create a prediction market on this event',
	all: 'All',
	accept: 'accept',
	reject: 'reject',
	pick_participate_bet_end_date_time: 'pick participate Challenge end date & time',
	join: 'join',
	Tags: 'Tags',
	categories: 'Categories',
	Order_by: 'Order by',
	Sub_Category: 'Subcategories',
	Duration: 'Duration',
	recents: 'Recents',
	events_Bets: 'Events & Challenge',
	connect_friends: 'Connect friends',

	set_date: 'Set Date',
	cameraAccess:
		'Camera access is restricted. In order to use Camera Service, please enable Camera permission in the setting app under Privacy.',
	audioAccess:
		'Audio access is restricted. In order to use Audio Service, please enable Audio permission in the setting app under Privacy.',
	galleryAccess:
		'Storage access is restricted. In order to upload video, please enable File and Storage permission in the setting app under Privacy.',
	biometricAccess:
		'Biometric access is restricted. In order to use Biometric Service, please enable Biometric permission in the setting app under Privacy.',
	contactAccess:
		'Contacts access is restricted. In order to use Contact Service, please enable Contacts permission in the setting app under Privacy.',
	visited_your_profile: ' visited your profile.',
	my_bets: 'My Challenges',
	view_all: 'View All',
	options_should_be_not_same: 'Options should not be same',
	do_not_close_refresh_the_page_it_may_take_while:
		'Do not close the app, it might take while',
	do_not_close_the_app_your_bet_will_be_ready:
		'Do not close the app, your Challenge will be ready in no time!',
	shares: 'Shares',
	share: 'Share',
	continue: 'continue',
	searchText: 'search ',
	unFollowMsg: 'Are you sure you want to unfollow?',
	friendRequest: 'Friend Request',
	Decline_invitation: 'Decline invitation',
	biometric_authentication: 'Biometric authentication',
	enable_biometric_id_to_open_defibet:
		'Enable biometric id to open ' + app.expo.name,
	disputes: 'Disputes',
	i_want_to_be_jury_in_disputes: 'I want to be jury in disputes',

	openDispute: 'Open Dispute',
	choose_type_of_evidence: 'Choose the type of evidence',
	evidence_via_link: 'EVIDENCE VIA LINK',
	evidence_photo_video: 'EVIDENCE WITH PHOTO OR VIDEO',
	evidence_desc:
		'Provide evidence by uploading a photo or a video of the results or by adding a link.',
	url_desc: 'paste your link below:',
	url: 'url',
	add_more: 'Add More',
	betting_on_this_event: 'Challenging on this Event',
	events: 'Events',
	support: 'Support',
	create_new_ticket: 'Create New Ticket',
	subject: 'Subject',
	description: 'Description',
	private_key: 'Enter your private key',
	ticket_created_successfully: 'Support ticket created successfully',
	OPEN: 'OPEN',
	support_details: 'Support details',
	open_dispute_text: 'Are you sure you want to open a dispute?',
	open_dispute_text_2:
		'Before opening a dispute you should be aware of the following conditions of the procedure:',
	open_dispute_text_3:
		'The cost of the dispute is based on the strike levels of each player raising the dispute.',
	open_dispute_text_4:
		'You will have one hour to attach the corresponding evidence to your relevant to your case in the next step.',
	open_dispute_text_5:
		'The stake money will be placed in escrow pending resolution of the dispute. Until then you will not be able to count on this amount.',
	result_of_dispute: 'Results of the dispute',
	no_on_majority_side: 'You are NOT ON THE MAJORITY SIDE',
	desc_on_result_majorit:
		'The evidence you voted for was NOT THE ONE REACHING CONSENSUS FROM THE JURY',
	result: 'Result',
	caseA: 'Case A:',
	caseB: 'Case B:',
	void: 'Void',
	STRIKE: ' STRIKE',
	on_loosing_side: 'You are on the losing side',
	so_obtained: 'So, you have obtained:',
	caseVoid: 'Void',
	you_loosing_side: 'You are on the losing side',
	so_you_obtained: 'So, you have obtained:',
	deleteRequest: 'Are you sure you want to cancel request?',
	event_share_story: 'Your event has been shared in the story successfully.',
	your_story: 'Your story',
	bet_end_verify_result: 'Your Challenge has ended! Itâ€™s time to verify the result.',
	bet_end_provide_evidence: 'Your Challenge has ended! Please provide a evidence.',

	taken_by: 'taken by:',
	Select_the_final_result: 'Select the final result',
	resolver_evidence: 'Resolverâ€™s evidence:',
	problem_with_this_result: 'A problem with this result or the verification?',
	open_dispute: 'Open dispute.',
	you_open_dispute: 'Youâ€™ve opened a dispute and your evidence has been sent.',
	we_will_review_evidence: 'weâ€™ll review your evidence and get back to you',
	who_case_right: 'Whose case is right?',
	thank_you_vote_sent: 'Thank you, your vote has been sent.',
	we_will_review_vote: 'weâ€™ll review all the votes and get back to you',
	choose_from_gallery: 'Choose from the gallery',
	use_camera: 'Use the camera',
	upload_video_30s: 'Please upload below 30s video',
	upload_video_30mb: 'Please upload below 30mb video',
	please_enter_valid_url: 'Please enter valid URL',
	reach_max_limit: 'You reached max limit of select evidence',

	maker_by: 'Challenge Creator:',
	you_lost: 'You lost',
	you_won: 'You won!',

	this_bet_end: 'This Challenge has ended!',
	srike: 'You have %d/%f strikes',
	more_about_strike_policy: 'More about the strikes policy.',
	use_Biometric: 'Use Biometric',
	NOTIFICATION_CHAT_MESSAGE: 'Chat',
	// report_match: 'Report match',
	why_do_you_want_report: 'Why do you want to report?',
	why_do_you_want_report_bet_desc:
		'Your report is anonymous. Please tell us why do you want to report this event.',
	claim_winning: 'CLAIM WINNINGS',
	claim_bet_funds: 'CLAIM Challenge Funds',
	verify: 'VERIFY',
	accept_result: 'accept result',
	accepted_result: 'Your opponent accepted the result for your Challenge',
	result_of_voting: 'Results of Voting',
	provide_evidence: 'Provide evidence of your result',
	logOut: 'Log Out',
	are_you_sure_you_want_to_logout: 'Are you sure you want to logout?',
	jury_area: 'Jury area',
	become_judge: 'Become judge in disputes',
	become_judge_desc:
		'To become a judge and be able to mediate disputes you must deposit an amount of XX tokens as escrow',
	exclusive_privileges: 'Exclusive privileges',
	exclusive_privileges_desc:
		'Your position as a judge will give you access to a series of unique and exclusive benefits',
	penalties: 'Penalties',
	penalties_desc:
		'No one is exempt from being penalized, a bad action or a bad verdict can result in a severe sanction.',
	escrow_deposit: 'Escrow deposit',
	you_will_be_charged:
		'You will be charged an amount of %d from your wallet to become a judge',
	from_your_wallet_to: ' from your wallet to become a judge',
	pay: 'Pay ',
	terms_and_politics: 'Terms and policy',
	finish: 'finish',
	congratulations: 'Congratulations!',
	you_become_judge_desc:
		'You have become a judge and now you can enjoy the privileges, as well as mediate disputes and win prizes for your good deeds',
	you_are_winnig_side: 'You are on the WINNING side.',
	you_provide_evidence_true: 'THE EVIDENCE YOU HAVE PROVIDED\nIS TRUE.',
	you_are_losing_side: 'You are on the LOSING side.',
	your_case_least_vote: 'YOUR CASE was the LEAST voted for.',
	your_favour: 'In your\nfavour:',
	against_you: 'Against\nyou:',
	bet_winner: 'Challenge Winner!',
	so_you_are: 'SO YOU ARE',
	so_bet_fund_are: 'SO the Challenge funds are',
	return_you: 'Returned to you!',
	WIN: 'win',
	LOSE: 'loss',
	VOID: 'void',
	DRAW: 'draw',
	resign_recover_fund: 'Resign and recover my funds',
	recover_fund: 'Recover my funds',
	yoooo_buddy: 'Yoooo buddy',
	resign_recover_fund_desc:
		'If you request the reinstatement of your deposit you will no longer be a judge and will not be able to enjoy the benefits of being a judge\n\nIf you wish to become a judge again, you will have to wait 48 hours',
	recover_my_funds: 'recover my fundS',
	active_cases: 'Active cases',
	past: 'Past',
	manage_your_case: 'Manage your assigned disputes & cases',
	pending_vote: 'pending vote',
	voted: 'voted',
	voting_finalized: 'Voting finalized',
	not_part_jury_title: 'You are not part\nof a Jury, yet!',
	not_part_jury_desc:
		'YouÂ´ll receive notifications to \nparticipate in disputes and\nchallenge resolution cases',
	jury_options: 'Jury options',
	active_inactive: 'Active / Inactive',
	active: 'Active ',
	recover_escrow_funds: 'Recover escrow funds',
	see_details: 'See details',
	hide_details: 'Hide details',
	your_vote: 'Your vote',
	voting_result: 'Voting result',
	reward: 'Reward',
	strike: 'Strike',
	more_about_strike: 'More about strike policy',
	evidence_of_the_dispute: 'Evidence of the dispute',
	time_left: 'time left',
	this_bet_canceled: 'This Challenge has canceled!',
	admin_bet_canceled_title: 'Challenge canceled',
	admin_bet_canceled_desc:
		'Your Challenge has been canceled because it violates our community guidelines.\n\nThe amount has been transferred back to your wallet.',
	user_bet_canceled_desc:
		'You have canceled the Challenge.\n\nThe amount has been transferred back to your wallet address',
	judge: 'Judge',
	strike_level: 'Strike Level',
	available_strike: 'Available Stake',
	claim_rewards: 'Claimed Rewards',
	dbeth: 'DBETH',
	defibetHouseUrl: 'https://truly.fun/',
	sell: 'sell',
	buy: 'buy',
	join_bet: 'Join Challenge',
	replicate_bet: 'Replicate Challenge',
	bet_evidence: 'Challenge evidence',
	bet_result: 'Challenge result',

	cancel_bet: 'cancel Challenge',
	cancel_bet_desc: 'Are you sure you want to cancel this Challenge?',
	claim_winning_desc: 'Are you sure you want to claim your winning?',
	bet_cancelled_successfully: 'Challenge cancelled successfully',
	approve_allowance: 'Approve allowance',
	approve_allowance_decs: 'Please approve allowance for %d.',
	reveal_Result: 'Reveal Result',
	following_follower_search: 'following_follower_search',
	no_streamings: 'Streamings will appear here',
	no_streamings_desc: 'No live streams yet',
	signature_Request: 'Signature Request',
	signature_request_message:
		'Please prove you control this wallet by signing this Challenge address: %d.',
	we_are_taking: 'Weâ€™re taking you to the amazing space',
	random_login_message_one: 'Redirecting you...',
	random_login_message_two: 'Almost ready',
	random_login_message_three: 'Are you ready?',
	random_login_message_four: 'Donâ€™t panic, Just count to infinite',
	random_login_message_five: 'Weâ€™re building the buildings as fast as we can',
	random_login_message_six: 'You seem like a nice person:)',
	random_login_message_seven: 'We swear itâ€™s almost done',
	random_login_message_eight: 'Weâ€™re working very Hard .... Really',
	random_login_message_nine: 'Ensuring Everything Works Perfectly',
	random_login_message_ten: 'Hitting your screen wonâ€™t make this faster',
	no_match: 'No data here',
	no_match_desc: 'This category has no data registered',
	no_bets: 'No Challenges made yet',
	no_bets_desc: 'Here you can see the Challenges you make',
	no_friens: 'No friends made yet',
	no_friens_desc: 'Here you can see friends',
	no_prediction_market: 'Oh! It looks like there are still no markets',
	no_prediction_market_desc: 'Be the first to create one!',
	no_p2p_bets: 'Oh! it looks like there are still no Challenge',
	No_bets_for_now: 'No Challenges for now',
	you_have_not_made_any_bets_yet: 'You have not made any Challenges yet',
	no_p2p_bets_desc: 'Be the first to place one',
	This_user_has_not_made_any_bets_yet: 'This user has not made any Challenges yet',
	no_wallet_stats: 'No stats found',
	no_wallet_stats_desc: 'Here you can see your statistics',
	no_recent_search: 'No recent\nsearches',
	no_recent_search_desc: 'Your searches will appear here',
	no_followers: 'You have no\nfollowers yet',
	no_followers_desc:
		'Donâ€™t worry, they will come soon if you follow a few accounts',
	no_followings: 'No followed\nusers',
	no_followings_desc: 'You are not following any users',
	no_filter: 'You surprised us!',
	no_filter_desc: 'Try using different filters',
	choosse_prefered_wallet: 'Choose your preferred wallet',
	discover_bets: 'discover Challenges',
	create_bet: 'Create Challenge',
	no_event_bet_search: 'No recent searches for any events or Challenge',
	no_event_bet_search_desc: 'Your searches will appear here',
	no_friend_search: 'No recent searches for any user',
	no_friend_search_desc: 'Your searches will appear here',
	str_tut_btn_next: 'Next',
	str_tut_btn_skip_tutorial: 'Skip tutorial',
	str_tut_btn_got_it: 'Got it!',
	str_tut_create_bet: 'Create a Challenge',
	str_tut_create_bet_desc: 'Click the + icon to create a Challenge',
	str_tut_feed_desc: 'Here you can see all the active Challenges of the platform.',
	str_tut_feed_event_desc:
		'This is an event, here you will be able to see all Challenges, take them, make new ones...',
	str_tut_live_desc:
		'Here you will be able to follow all your predictions live.',
	str_tut_wallet_desc: 'Here you can connect your Metamask wallet.',
	str_tut_discover_desc:
		'You can search events, chat with your friends and much more.',
	str_tut_profile_desc: 'You can follow your friends and see your Challenge stats.',
	already_voted:
		'Something went wrong when you submitted your vote for this case. Please click retry to submit your vote again.',
	skip: 'Skip',
	connect_with_other_users_and_start_betting:
		'Connect with other users and multiply the fun with new Challenges',

	share_defibet_house: 'Share ' + app.expo.name,
	share_the_app_with_your_friends:
		'Share your Invite Code with your friends to earn fees passively each time they win a Challenge, it´s a win-to-win! ',
	share_defibet_house_app: 'Share ' + app.expo.name + ' app with your friends!',
	close: 'Close',
	sync_contacts: 'Sync Contacts',
	no_conversation_found: 'No conversation history found',
	we_re_syncing_your_contacts: 'Weâ€™re syncing your contacts',
	your_contacts_have_been_synced_successfully:
		'Your contacts have been synced successfully',
	sync_your_contacts_from_settings_to_see_them_here:
		'Sync your contacts from settings to see them here',
	match_Has_Been_Cancelled: 'Match has been cancelled.',
	txt_session_expire_msg: 'Log in again and donâ€™t panic.',
	txt_share_join_bet_message_with_url:
		'%user is inviting you to participate in the following Challenge: %betInfo.\n\n%shareBetUrl',
	str_receive_crypto: 'Receive game coins',
	str_scan_qr_receive_crypto: 'Scan this QR to receive game coins on this wallet',

	//Prediction Market
	what_is_your_prediction_market: 'What is your prediction market about?',
	place_bet: 'Place Challenge',
	betdecline: 'Are you sure you want to decline the invitation?',
	you_are_betting: 'Your Challenge amount',
	you_will_win: 'You will win',
	select_the_crypto_to_use_in_this_bet: 'Select the Game Coins to use in this Challenge',
	total_payout: 'Total payout',
	your_opponent_is_betting: 'your opponent Challenge amount:',
	your_opponent_will_win: 'Your opponent will win',
	//Prediction Market
	str_for_you: 'Explore',
	str_live_chat: 'Live chat',
	str_explore: 'Explore',
	str_chat: 'Chat',
	str_active_bets_count: '%d Active Challenges',
	str_follow_user_account: '%username',
	str_follow_more_account: ' and %count more\n follows this account',
	str_follow_account: ' follows this account',
	str_follower_count: '%count\nFollowers',
	str_following_count: '%count\nFollowings',
	str_follower: 'Follower',
	to: 'To',
	until_your_bet_is_settled_it_will_generate_a_passive_profit:
		'Until your Challenge is settled, it will generate a passive profit',
	when_the_bet_finalizes_you_can_check_your_passive_earnings_in_your_wallet:
		'When the Challenge finalizes you can check your passive earnings in your wallet',
	create_a_new_report: 'Create a new report',
	frequent_asking_questions: 'Frequently Asked Questions',
	str_money_won: 'Money won',
	str_money_lost: 'Money lost',
	str_credit_transaction: 'credit',
	str_debit_transaction: 'debit',
	str_generated_passive_income: 'Generated passive income',
	str_dollor: '$',
	str_passive_income_earnings: 'Passive income earnings',
	str_jury_earnings: 'Jury earnings',
	suggestions_for_you: 'Suggestions for you',
	str_share_to_my_story: 'Share to my story',
	str_report: 'Report',
	str_share: 'Only up to 10 can be selected at a time',
	str_show_all: 'Show All',
	str_show_less: 'Show Less',
	str_active_bet: 'Active Challenge',
	str_active_bets: 'Active Challenges',
	str_followings: 'Followings',
	just_a_few_more_seconds_your_funds_are_being_transferred_to_your_wallet:
		'Just a few more seconds! Your funds are being transferred to your wallet',
	str_trending_users: 'Trending users',
	str_select: 'Select',
	you_can_only_share_with_upto_10_users:
		'You can only share with up to 10 users',
	claimable: 'Claimable',
	us_dollar: 'US$',
	str_prefix_p2p_bets: 'P2P Challenge',
	str_see_all: 'See all',
	swipe_up_for_more_bets: 'Swipe up for more Challenge',
	app_sharing_text:
		'ðŸ˜± %s is sharing ' +
		app.expo.name +
		' with you\n\nClick on the link to download the app and start earning from creating challenges on any topic you can imagine ðŸ¤¯ ðŸš€ ðŸ‘‡\n\n',
	jury_banned:
		"You have been banned as a Jury so you won't be able to perform any activity related to Jury.",
	watching: 'watching',
	//Notification Type do not change this types
	notification_types: {
		match_trending: 'MATCH_TRENDING',
		live_streaming_trending: 'LIVE_STREAMING_TRENDING',
		bet_replicate_trending: 'BET_REPLICATED_TRENDING',
		most_followers: 'MOST_FOLLOWERS',
		trending_category: 'CATEGORY_TRENDING',
		trending_sub_category: 'SUB_CATEGORY_TRENDING',
		numerious_bets_created: 'NUMERIOUS_BETS_CREATED'
	},
	//Push Notification Type do not change this types
	push_notification_types: {
		event_Suggestion: 'EVENT_BET_SUGGESTION',
		join_friend_bet: 'JOIN_FRIEND_BET',
		user_suggestion: 'USER_SUGGESTION'
	},
	create_bet_and_win: 'CREATE CHALLENGE & WIN',
	see_user_profile: 'SEE USER PROFILE',
	participate_and_win: 'PARTICIPATE & WIN ',
	event_sharing_text:
		"Find out about this event and get your Challenge on  before it's over! ðŸ¤‘ ðŸ˜Ž  \n\nðŸ“… ",
	bet_sharing_text:
		'%s has created this Challenge! ðŸ¤© \nClick on this link to participate ðŸ’ª ðŸ¤‘ \n\nðŸ“… ',
	join_deadline: 'JOINING DEADLINE:',
	short_video: 'SHORT VIDEO',
	upload_video_15s: `Please upload a video that is between ${videoMinimumDuration} to ${videoMaximumDuration} seconds in length.`,

	//video
	see_your_video_content: 'see your video content',
	who_can_see_your_videos: 'Who can see your Videos?',
	video_content: 'Video content',
	video_creation: 'Video creation',
	attach_video_to_bets: 'You can attach the video to one of your active bets',
	no_active_bets: 'You donâ€™t have any active Challenge',
	video: 'Video',
	are_you_sure_you_want_to_delete_this_video:
		'Are you sure you want to delete this video?',
	sure: "yes, i'm sure",
	no_video_found: 'No video found yet',
	no_video_title: 'Your videos will appear here',
	well_done_video_has_been_created:
		'Well done, %s! Your video has been created ðŸŽ‰',
	txt_session_expire_login_again: 'Session expired please login again',
	txt_something_wrong_try_again: 'Something went wrong. Please try again later',
	txt_insufficient_balance: 'Insufficient Balance'.toUpperCase(),
	txt_add_more_fund: 'Please add more funds.',
	txt_contract_approval_error: 'Contract approval error',
	txt_message_sent_success: 'Message sent successfully.',
	txt_check_internet_connection:
		'Please check your internet connection and try again',
	txt_bet_not_create: 'Challenge not created',
	txt_bet_not_join: 'Challenge not joined',
	txt_amount_not_stake: 'Amount not stake',
	txt_error: 'Error',
	txt_edit_email: 'Please edit your email address as per your request.',
	txt_you_click_expire_link:
		'You have clicked on expired verification link please try again.',
	txt_invalid_url: 'Invalid Url.',
	share_via_dm: 'Share via DM',
	download_video: 'Download video',
	downloaded_video: 'Great! Video has been saved successfully to your gallery.',
	downloading_video: 'Your video is being downloaded',
	enough_gas_fee: `This Challenge may not be placed as it appears that you don't have enough Matic to cover the gas costs necessary to complete this transaction.`,
	enough_balance:
		'You donÂ´t have enough balance for this Challenge. Please add more funds to your wallet or deposit via credit card.',
	referral_program: 'Referral program',
	referral_des:
		'This is your referral code! Copy and share it with your network and start earning from the Challenges they win',
	your_referral_code: 'Your referral code',
	enter: 'enter',
	enter_a_friends_code: 'Enter a friends code',
	referral_buddy: 'YOUR TRULY.FUN BUDDY IS ',
	your_rewards: 'Your rewards',
	your_total_money_won: 'total REWARDS won:',
	total_money_won: 'Total fees earned:',
	claim_pending_rewards: 'CLAIM PENDING REWARDS',
	upload_video: `Please wait while we're uploading your video`,
	video_processing: `Please wait while we're processing your video`,
	referral_code: 'Referral code',
	downloading_video_error: 'Something went wrong while downloading',
	error_Message: 'There was an error.',
	try_again: 'Try it again.',
	video_sharing_text:
		'%s has created this video! ðŸ“¹  \n\nClick on this link, watch it and find out if there is a Challenge attached ðŸ‘€ ðŸ¤”',
	withdraw_via_Credit_Card: 'Withdraw via Credit Card',
	transfer_amount: 'Transfer amount',
	recipients_polygon_wallet: `Recipient's Polygon Wallet`,
	enter_polygon_address: 'Enter Polygon address',
	i_am_withdrawing_polygon: 'I am withdrawing %s to Polygon',
	withdrawing:
		'Are you sure you are withdrawing %S to a wallet address on the Polygon blockchain? Using the wrong blockchain will result in a loss of funds.',
	you_will_transfer: 'You will transfer',
	to_address: 'to this address',
	successful_withdrawal: 'transfer has been successful',
	enough_balance_to_transfer:
		'You donÂ´t have enough balance to transfer. Please add more funds to your wallet or deposit via credit card.',
	just_a_few_more_seconds_your_funds_are_being_transferred_from_your_wallet:
		'Just a few more seconds! Your funds are being transferred to recipient wallet',
	no_pending_claim: 'NO PENDING REWARDS TO CLAIM',
	let_create_market: "Let's create your Challenge",
	txt_age_validation: 'You must be 18 years old or above to use this app.',
	copy_referral_desc: 'Referral code copied to clipboard.',
	create_a_video_with_bet_attached: 'create a video with a Challenge attached',
	engage_your_audience_and_earn_up_to: 'Engage your audience and earn up to',
	betting_fees_generated: 'of the Challenge fees generated!',
	top_up_with_credit_card: 'top up with credit card',
	create_a_challenge: 'create a Challenge',
	started_following: 'started following you.',
	create_a_live_challenge: 'stream a Live Challenge',
	live_challenge: 'Live Challenge',
	earn_up_to: 'Monetize your Content! Earn up to',
	from_streaming_content:
		'of the fees generated from all the Challenges matched over your streaming content!',
	optional_evidence: 'Optional evidence',
	optional_evidence_desc:
		'You can optionally attach evidence of the result. You can upload a photo, a video or share the links of your choice.',
	str_and_or: 'and/or',
	verify_photo_video: 'VERIFY WITH PHOTO or video',
	WATCH_LIVE_STREAM: 'WATCH LIVE STREAM',
	Is_creating_the_following_challenge_and_ITS_LIVE:
		'is creating the following Challenge and ITâ€™S LIVE!',
	START_TIME: 'START TIME',
	Failed_to_stake_amount: 'Failed to stake amount',
	live_challenge: 'Live challenge',
	attach_the_stream: 'Attach the stream',
	attach_the_channel_link_des:
		'Even if your Challenge doensâ€™t start right now, you can attach the channel link to be displayed at the start time.',
	stream_name: 'Stream Name',
	stream_link: 'Stream Link',
	set_the_duration_of_the_stream: 'Set the duration of the stream',
	start_and_End_time: 'Start and End time',
	pick_start_time: 'PICK START TIME',
	result_verification: 'Result verification',
	select_who_verifies_the_challenge: 'Select who verifies the Challenge',
	bet_maker: 'Challenge Creator',
	if_you_select_Bet_Maker_des:
		'If you select Challenge Taker, you will be the one to verify the Challenge. ',
	bet_taker: 'Challenge Taker',
	if_you_select_Bet_taker_des:
		'If you select Challenge Taker, you will be the one to verify the Challenge. ',
	enter_a_stream_name: 'Enter a Stream name',
	enter_a_stream_link: 'Enter a Stream link',
	Choose_Accurate_Bet_Outcome: 'Choose Accurate Challenge Outcome',
	bet_conditions_or_Terms_not_clear: 'Challenge conditions or Terms not clear',
	hateful_language_or_symbols: 'hateful language or symbols',
	False_information: 'False information',
	Spam: 'Spam',
	Other: 'Other',
	head_to_head: 'head to head',
	won: 'won',
	tied: 'tied',
	AVG_scored_goals: 'AVG. scored goals',
	AVG_goals_against: 'AVG. goals against',
	resolution_date: 'resolution date',
	JOINING_DEADLINE: 'JOINING DEADLINE',
	resolution_method_api: 'resolution method: api',
	resolution_method_manual: 'resolution method: manual',
	fee_over_the_winnings: 'fee over the winnings',
	STARTS: 'STARTS',
	ENDS: 'ENDS',
	Your_bet_will_pay: 'Your Challenge will pay',
	the_amount_you_are_betting: 'your Challenge amount.',
	Your_estimated_probability_of_winning_is:
		'Your estimated probability of winning is',
	You_are_betting_So_you_have_balance_crypto:
		'Your Challenge amount is %d. So, you have balance in these game coins to make this Challenge.',
	this_bet: 'this Challenge',
	joined: 'joined',
	bet: 'Challenge',
	pick: 'pick',
	You_are_jury_for_the_bet: 'You are jury for the Challenge',
	you_have_24_hours_to_declare_your_result:
		'you have 24 hours to declare your result.',
	You_have_1_hour_to_accept_the_case: 'You have 1 hour to accept the case!',
	Youve_been_selected_to_be: 'Youâ€™ve been selected to be',
	of_an_opened_dispute: 'of an opened dispute.',
	you_have_24_hours_to_declare_your_result:
		'you have 24 hours to declare your result.',
	the_juy: 'the jury',
	The_bet: 'The Challenge',
	added_you_as_a_Friend: 'added you as a Friend.',
	You_are_now_friends_with: 'You are now friends with',
	streaming_has_been_ended: 'streaming has been ended!',
	estimated_end: 'estimated end:',
	Select_a_token: 'Select a game coin',
	str_congrats_you_just_won: 'Congrats! You just won',
	str_oh_no_you_just_lost: 'Oh no! You just lost',
	str_from: ' from ',
	str_bet: ' Challenge ',
	str_vs: ' vs ',
	str_your_bet: 'Your Challenge ',
	str_has_end_verify_result: ' has ended. Please verify the result.',
	str_has_end_provide_result_and_evidence:
		' has ended. Please provide the result and evidence.',
	str_has_end_provide_evidence: ' has ended. Please provide evidence.',
	str_the_bet: 'The Challenge ',
	str_has_end_creator_verify_review_result:
		' has ended and the creator has verified the result. Please review the result.',
	str_great_result_for_your_bet: 'Great! The result for your Challenge ',
	str_result_for_your_bet: 'The result for your Challenge ',
	str_oh_no_result_for_your_bet: 'Oh no! The result for your Challenge ',
	str_accept_by_opponent_you_just_won:
		' has been accepted by your opponent. You just won ',
	str_accepted_your_oponent_returned_to_your_wallet:
		' has been accepted by your oponent. The Challenge has been made Void and the funds will be returned to your Wallet.',
	str_accept_by_opponent_you_just_lost:
		' has been accepted by your oponent. You just lost ',
	str_your_oppent_in_bet: 'Your opponent in your Challenge ',
	str_opened_dispute_provide_evidence_result:
		' has opened a dispute. Please provide evidence to your result.',
	str_player: 'Player',
	str_match: 'Match',
	str_for_your_bet: ' for your Challenge ',
	str_has_been: ' has been ',
	str_you_cancel_bet_recover_fund:
		'. You can cancel this Challenge to recover your funds.',
	str_ago: ' ago',
	str_reffered_users: ' invited users',
	str_Hello: 'Hello',
	str_all: 'All',
	str_today: 'Today',
	str_last_week: 'Last week',
	str_last_month: 'Last month',
	str_custom_date_range: 'Custom date range'
};
export default Strings;
