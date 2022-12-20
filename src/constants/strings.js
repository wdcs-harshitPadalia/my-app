import app from '../../app.json';
const Strings = {
	signuptostartbetting: 'Connect to start betting',
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
	You_have_not_made_any_bet_yet: 'You have not made any bet yet.',
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
	replicate_this_bet_btn: 'replicate this bet',
	metamask: 'metamask',
	connect_metamask: 'connect with metamask',
	disconnect_metamask: 'disconnect from metamask',
	welcome: 'Welcome to',
	defibetHouse: 'defibet.house',

	//Bottom tabs
	bottomTabLive: 'Live',
	bottomTabWallet: 'Wallet',
	bottomTabDiscover: 'Discover',
	bottomTabProfile: 'Profile',
	bottomTabCreate: 'Create',
	bottomTabBets: 'Bets',

	feed: 'feed',
	live: 'live',
	wallet: 'wallet',
	discover: 'discover',
	profile: 'Profile',

	filters: 'Filters',
	notifications: 'Notifications',
	private_messages: 'Private messages',
	new_message: 'New message',
	event_details: 'Event details',
	user_details: 'User details',
	feed_filter: 'Feed filter',
	dispute_result: 'Dispute result',
	dispute_thank_you: 'Thank you',
	dispute_info: 'Dispute info',
	dispute_open: 'Open dispute',
	dispute_view: 'View dispute',
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

	activeBets: 'Active bets',
	followers: 'Followers',
	following: 'Following',
	create: 'create',
	wallets: 'wallets',
	betStatistics: 'Bet statistics',
	betsWon: 'Bets won:',
	betsLost: 'Bets lost:',
	betsPending: 'Bets pending:',
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
	open_bets: 'Open bets',
	pause_all: 'PAUSE ALL',
	push_notification: 'Push notification',

	//push notification
	someone_takes_bet: 'someone takes your bet',
	someone_replicates_bet: 'someone replicates your bet',
	bet_invitation: 'betting invitations',
	new_Followers: 'new followers',
	interactions: 'Interactions',

	//live streaming
	STREAMING: 'STREAMING',
	HOT: 'HOT',
	FRIENDS: 'FRIENDS',
	New_bets: 'New bets',
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
	seeYourBettingStatistics: 'see your betting statistics',
	seeYourBalance: 'see your balance',
	seeYourBets: 'see your bets',
	sendYouDirectMessages: 'Send You Direct Messages',
	friends: 'Friends',
	users: 'Users',
	nobody: 'Nobody',
	anyone: 'Anyone',

	preferences: 'Preferences',
	selectYourCategories: 'Select your favorite categories and sub-categories:',

	bettingStatistics: 'Betting statistics',
	whoCanSeeYourBettingSatistics: 'Who can see your betting satistics?',
	WhoCanSeeYourBalance: 'Who can see your balance?',
	bets: 'Bets',
	WhoCanSeeYourBets: 'Who can see your bets?',
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
	buy_crypto: 'buy_crypto',
	buy_crypto_btn: 'Buy crypto with credit card',
	Balance: 'Balance',
	Stats: 'Stats',
	View_details: 'View details',
	won_bets: 'won bets',
	lost_bets: 'lost bets',
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
	BuyCrypto: 'Buy crypto',
	findFriends: 'Find Friends',
	whatDoYouWantToCreate: 'What do you want to create?',
	p2pBet: 'P2P BET',
	whatAreYouBettingOn: 'What are you betting on?',

	searchCategory: 'search category...',
	searchSport: 'search sport...',
	searchLeague: 'search league...',

	category: 'Category',
	browseLeagues: 'browse\nleagues',
	createYourOwn: 'Create your\nown',
	createYour_Own: 'Create your own',

	custom: 'Custom',
	findYourFavoriteLeagues:
		'Can’t find your favorite leagues? Looking for a challenge on your local league or match among friends?',
	letSetUPYourBet: 'Let’s set up your bet, ',
	betType: 'Bet type',
	select_a_game: 'Select a game',
	select_a_market: 'Select a market',
	choose_your_side: 'Choose your side',

	singleMatch: 'Single match',
	needHelpChoosing: 'Need help choosing?',
	mainMarkets: 'Main markets',
	markets: 'Market',

	writeInBetDescription: 'Write in Bet description',
	placeYourBet: 'Place your bet',
	You_pay: 'You pay',
	You_get: 'You get',
	add_a_card: 'add a card',
	add_card_and_buy: 'add card and buy',
	Polygon_Transfer: 'Polygon Transfer',
	Debit_Credit_Card: 'Debit / Credit Card',
	ETH_Network_Transfer: 'ETH Network Transfer',
	searchToken: 'search token...',
	odds: 'Odds',
	how_much_do_you_want_to_bet: 'How much do you want to bet?',
	pays: 'Pays',
	review_your_bet: 'Review your bet',
	yes: 'Yes',
	your_bet: 'your bet:',
	your_opponents_bet: 'Your opponent’s bet',
	no: 'No',
	bet_details: 'Bet details',
	str_bet_details: 'Bet_details',
	yourBet: 'Your bet',
	you_are_almost_done: 'You are almost done, ',
	invite_your_friends: 'Invite your friends',
	invite: 'Invite',
	bet_privacy: 'Bet privacy',
	public_bet: 'public bet',
	anybody_can_join: 'Anybody can join.',
	private_bet: 'private bet',
	who_participates:
		'You decide who participates. This bet will only be visible to the participant you invite.',
	share_your_bet: 'Share your bet',
	share_on_whatsapp: 'share on whatsapp',
	share_on_telegram: 'share on telegram',
	share_on_twitter: 'share on twitter',
	copy_link: 'copy link',
	copy_link_desc: 'Link copied to clipboard.',
	copy_wallet_add_desc: 'Wallet address copied to clipboard.',
	or_share_with: 'or share with',
	continue_to_feed: 'continue to feed',
	well_done_bet_has_been_created: 'Well done, %s! Your bet has been created 🎉',
	well_done_bet_has_been_joined:
		'Well done, %s! You have joined the bet successfully 🎉',
	this_bet_already_joined: 'This bet already joined.',
	well_done_result_has_been_verified:
		'Well done, %s! The result of your bet has been verified!',
	LAST_MINUTE: 'LAST MINUTE',
	add_participants: 'Add participants',
	search: 'Search...',
	str_search: 'Search',
	send_invite: 'send invite',
	search_events_users_more: 'Search events, users, and more',
	search_events_bets: 'Search events and bets',
	search_users: 'Search users',

	time_to_create_your_market: 'Time to create your market',
	write_Question_Market: 'Write Question / Market',
	write_your_question: 'write your question',
	how_many_results: 'How many results?',
	results: 'Results',
	set_the_options: 'Set the options',
	add_end_time: 'add end time',
	when_will_the_bet_end: 'When will the bet end?',
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
	betBack: 'Are you sure you want to leave current bet?',
	please_enter_valid_amount: 'Please enter a valid input or minimum $1',
	bet_amount_must_be_more_than_1_USD:
		'Bet amount in USD must be more than 1 USD',
	select_odd: 'Select odd',
	internetOff: 'No connection',
	Prediction_markets: 'Prediction markets',
	P2P_Bets: 'P2P Bets',
	share_to_your_story: 'Share to your story',
	send_link_via: 'Send link via...',
	send_to_a_friend: 'Send to a friend:',
	event: 'event',
	add_bet_participants_time: 'add bet participants time',
	Create_a_bet_on_this_event: 'Create a bet on this event',
	Create_a_predication_market_on_this_event:
		'Create a predication market on this event',
	all: 'All',
	accept: 'accept',
	reject: 'reject',
	pick_participate_bet_end_date_time: 'pick participate bet end date & time',
	join: 'join',
	Tags: 'Tags',
	categories: 'Categories',
	Order_by: 'Order by',
	Sub_Category: 'Subcategories',
	Duration: 'Duration',
	recents: 'Recents',
	events_Bets: 'Events & Bets',
	connect_friends: 'Connect friends',

	set_date: 'Set Date',
	cameraAccess:
		'Camera access is restricted. In order to use Camera Service, please enable Camera permission in the Settigs app under Privacy.',
	galleryAccess:
		'Gallery access is restricted. In order to use Gallery Service, please enable Gallery permission in the Settigs app under Privacy.',
	biometricAccess:
		'Biometric access is restricted. In order to use Biometric Service, please enable Biometric permission in the Settigs app under Privacy.',
	contactAccess:
		'Contacts access is restricted. In order to use Contact Service, please enable Contacts permission in the Settigs app under Privacy.',
	visited_your_profile: ' visited your profile.',
	my_bets: 'My Bets',
	view_all: 'View All',
	options_should_be_not_same: 'Options should not be same',
	do_not_close_refresh_the_page_it_may_take_while:
		'Do not close the app, it might take while',
	do_not_close_the_app_your_bet_will_be_ready:
		'Do not close the app, your bet will be ready in no time!',
	shares: 'Shares',
	share: 'Share',
	continue: 'continue',
	searchText: 'search ',
	unFollowMsg: 'Are you sure you want to unfollow?',
	friendRequest: 'Friend Request',
	Decline_invitation: 'Decline invitation',
	biometric_authentication: 'Biometric authentication',
	enable_biometric_id_to_open_defibet: 'Enable biometric id to open defibet',
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
	betting_on_this_event: ' betting on this event',
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
	bet_end_verify_result: 'Your bet has ended! It’s time to verify the result.',
	bet_end_provide_evidence: 'Your bet has ended! Please provide a evidence.',

	taken_by: 'taken by:',
	Select_the_final_result: 'Select the final result',
	problem_with_this_result: 'A problem with this result?',
	open_dispute: 'Open dispute.',
	you_open_dispute: 'You’ve opened a dispute and your evidence has been sent.',
	we_will_review_evidence: 'we’ll review your evidence and get back to you',
	who_case_right: 'Whose case is right?',
	thank_you_vote_sent: 'Thank you, your vote has been sent.',
	we_will_review_vote: 'we’ll review all the votes and get back to you',
	choose_from_gallery: 'Choose from the gallery',
	use_camera: 'Use the camera',
	upload_video_30s: 'Please upload below 30s video',
	upload_video_30mb: 'Please upload below 30mb video',
	please_enter_valid_url: 'Please enter valid URL',
	reach_max_limit: 'You reached max limit of select evidence',

	maker_by: 'Maker by:',
	you_lost: 'You lost',
	you_won: 'You won!',

	this_bet_end: 'This bet has ended!',
	srike: 'You have %d/%f strikes',
	more_about_strike_policy: 'More about the strikes policy.',
	use_Biometric: 'Use Biometric',
	NOTIFICATION_CHAT_MESSAGE: 'Chat',
	// report_match: 'Report match',
	why_do_you_want_report: 'Why do you want to report?',
	why_do_you_want_report_bet_desc:
		'Your report is anonymous. Please tell us why do you want to report this event.',
	claim_winning: 'CLAIM WINNINGS',
	claim_bet_funds: 'CLAIM bet Funds',
	verify: 'VERIFY',
	accept_result: 'accept result',
	accepted_result: 'Your opponent accepted the result for your bet',
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
	bet_winner: 'Bet Winner!',
	so_you_are: 'SO YOU ARE',
	so_bet_fund_are: 'SO the BET funds are',
	return_you: 'Returned to you!',
	WIN: 'win',
	LOSE: 'loss',
	VOID: 'void',
	DRAW: 'draw',
	resign_recover_fund: 'Resign and recover my fund',
	recover_fund: 'Recover my fund',
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
		'You´ll receive notifications to \nparticipate in disputes and\nbet resolution cases',
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
	this_bet_canceled: 'This bet has canceled!',
	admin_bet_canceled_title: 'Bet canceled',
	admin_bet_canceled_desc:
		'Your bet has been canceled because it violates our community guidelines.\n\nThe amount has been transferred back to your wallet.',
	user_bet_canceled_desc:
		'You have canceled the Bet.\n\nThe amount has been transferred back to your wallet address',
	judge: 'Judge',
	strike_level: 'Strike Level',
	available_strike: 'Available Stake',
	claim_rewards: 'Claimed Rewards',
	dbeth: 'DBETH',
	defibetHouseUrl: 'https://defibet.house/',
	sell: 'sell',
	buy: 'buy',
	join_bet: 'Join bet',
	replicate_bet: 'Replicate bet',
	bet_evidence: 'Bet evidence',
	bet_result: 'Bet result',

	cancel_bet: 'cancel bet',
	cancel_bet_desc: 'Are you sure you want to cancel this bet?',
	claim_winning_desc: 'Are you sure you want to claim your winning?',
	bet_cancelled_successfully: 'Bet cancelled successfully',
	approve_allowance: 'Approve allowance',
	approve_allowance_decs: 'Please approve allowance for %d.',
	reveal_Result: 'Reveal Result',
	following_follower_search: 'following_follower_search',
	no_streamings: 'Streamings will appear here',
	no_streamings_desc: 'No live streams yet',
	signature_Request: 'Signature Request',
	signature_request_message:
		'Please prove you control this wallet by signing this bet address: %d.',
	we_are_taking: 'We’re taking you to the amazing space',
	random_login_message_one: 'Redirecting you...',
	random_login_message_two: 'Almost ready',
	random_login_message_three: 'Are you ready?',
	random_login_message_four: 'Don’t panic, Just count to infinite',
	random_login_message_five: 'We’re building the buildings as fast as we can',
	random_login_message_six: 'You seem like a nice person...',
	random_login_message_seven: 'We swear it’s almost done',
	random_login_message_eight: 'We’re working very Hard .... Really',
	random_login_message_nine: 'Ensuring Everything Works Perfectly',
	random_login_message_ten: 'Hitting your screen won’t make this faster',
	no_match: 'No data here',
	no_match_desc: 'This category has no data registered',
	no_bets: 'No bets made yet',
	no_bets_desc: 'Here you can see the bets you make',
	no_friens: 'No friends made yet',
	no_friens_desc: 'Here you can see friends',
	no_prediction_market: 'Oh! It looks like there are still no markets',
	no_prediction_market_desc: 'Be the first to create one!',
	no_p2p_bets: 'Oh! it looks like there are still no bets',
	No_bets_for_now: 'No bets for now',
	you_have_not_made_any_bets_yet: 'You have not made any bets yet',
	no_p2p_bets_desc: 'Be the first to place one',
	This_user_has_not_made_any_bets_yet: 'This user has not made any bets yet',
	no_wallet_stats: 'No stats found',
	no_wallet_stats_desc: 'Here you can see your statistics',
	no_recent_search: 'No recent\nsearches',
	no_recent_search_desc: 'Your searches will appear here',
	no_followers: 'You have no\nfollowers yet',
	no_followers_desc:
		'Don’t worry, they will come soon if you follow a few accounts',
	no_followings: 'No followed\nusers',
	no_followings_desc: 'You are not following any users',
	no_filter: 'You surprised us!',
	no_filter_desc: 'Try using different filters',
	choosse_prefered_wallet: 'Choose your preferred wallet',
	discover_bets: 'discover bets',
	create_bet: 'Create bet',
	no_event_bet_search: 'No recent searches for any events or bets',
	no_event_bet_search_desc: 'Your searches will appear here',
	no_friend_search: 'No recent searches for any user',
	no_friend_search_desc: 'Your searches will appear here',
	str_tut_btn_next: 'Next',
	str_tut_btn_skip_tutorial: 'Skip tutorial',
	str_tut_btn_got_it: 'Got it!',
	str_tut_create_bet: 'Create a bet',
	str_tut_create_bet_desc: 'Click the + icon to create a bet',
	str_tut_feed_desc: 'Here you can see all the active bets of the platform.',
	str_tut_feed_event_desc:
		'This is an event, here you will be able to see all bets, take them, make new ones...',
	str_tut_live_desc:
		'Here you will be able to follow all your predictions live.',
	str_tut_wallet_desc: 'Here you can connect your Metamask wallet.',
	str_tut_discover_desc:
		'You can search events, chat with your friends and much more.',
	str_tut_profile_desc: 'You can follow your friends and see your bet stats.',
	already_voted:
		'Something went wrong when you submitted your vote for this case. Please click retry to submit your vote again.',
	skip: 'Skip',
	connect_with_other_users_and_start_betting:
		'Connect with other users and start betting',

	share_defibet_house: 'Share Defibet.house',
	share_the_app_with_your_friends:
		'Share the app with your friends and challenge them for extra fun and bragging rights!',
	share_defibet_house_app: 'Share defibet.house app with your friends!',
	close: 'Close',
	sync_contacts: 'Sync Contacts',
	no_conversation_found: 'No conversation history found',
	we_re_syncing_your_contacts: 'We’re syncing your contacts',
	your_contacts_have_been_synced_successfully:
		'Your contacts have been synced successfully',
	sync_your_contacts_from_settings_to_see_them_here:
		'Sync your contacts from settings to see them here',
	match_Has_Been_Cancelled: 'Match has been cancelled.',
	txt_session_expire_msg: 'Log in again and don’t panic.',
	txt_share_join_bet_message_with_url:
		'%user is inviting you to participate in the following bet: %betInfo.\n\n%shareBetUrl',
	str_receive_crypto: 'Receive crypto',
	str_scan_qr_receive_crypto: 'Scan this QR to receive crypto on this wallet',

	//Prediction Market
	what_is_your_prediction_market: 'What is your prediction market about?',
	place_bet: 'Place bet',
	betdecline: 'Are you sure you want to decline invitation?',
	you_are_betting: 'You are betting',
	you_will_win: 'You will win',
	select_the_crypto_to_use_in_this_bet: 'Select the crypto to use in this bet',
	total_payout: 'Total payout',
	your_opponent_is_betting: 'your opponent is betting:',
	your_opponent_will_win: 'Your opponent will win',
	//Prediction Market
	str_for_you: 'For you',
	str_live_chat: 'Live chat',
	str_active_bets_count: '%d Active bets',
	str_follow_user_account: '%username',
	str_follow_more_account: ' and %count more\n follows this account',
	str_follow_account: ' follows this account',
	str_follower_count: '%count\nFollowers',
	str_following_count: '%count\nFollowings',
	str_follower: 'Follower',
	to: 'To',
	until_your_bet_is_settled_it_will_generate_a_passive_profit:
		'Until your bet is settled, it will generate a passive profit',
	when_the_bet_finalizes_you_can_check_your_passive_earnings_in_your_wallet:
		'When the bet finalizes you can check your passive earnings in your wallet',
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
	str_active_bet: 'Active bet',
	str_active_bets: 'Active bets',
	str_followings: 'Followings',
	just_a_few_more_seconds_your_funds_are_being_transferred_to_your_wallet:
		'Just a few more seconds! Your funds are being transferred to your wallet',
	str_trending_users: 'Trending users',
	str_select: 'Select',
	you_can_only_share_with_upto_10_users:
		'You can only share with upto 10 users',
	claimable: 'Claimable',
	us_dollar: 'US$',
	str_prefix_p2p_bets: 'P2P BETS',
	str_see_all: 'See all',
	swipe_up_for_more_bets:'Swipe up for more bets'
};
export default Strings;
