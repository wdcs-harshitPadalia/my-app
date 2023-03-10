import {useCallback, useEffect, useState} from 'react';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import {
	BetContractAddress,
	BET_ABI,
	BET_CLAIM_EVENT,
	ConfigContractAddress,
	CONFIG_TOKEN_ABI,
	DBETH_TOKEN_ABI,
	DebethTokenContractAddress,
	DisputeResolutionContractAddress,
	DISPUTE_RESOLUTION_TOKEN_ABI,
	// LiquidityHolderAddress,
	LIQUIDITY_EVENT,
	// RewardBalanceAddress,
	RewardDistributionAddress,
	// REWARD_BALANCE_ABI,
	REWARD_DISTRIBUTION_ABI,
	SmartContractAddress,
	SMART_CONTRACT_ABI,
	TOKEN_ABI
} from '../../constants/SmartContract';
import {useDispatch, useSelector} from 'react-redux';
import {updateApiLoader} from '../../redux/reducerSlices/preLogin';
import {Platform} from 'react-native';
import Strings from '../../constants/strings';
import QRCodeModal from '@walletconnect/qrcode-modal';

import {
	chainIdPolygonNetwork,
	decimalValue,
	// nullHash,
	RpcURL
} from '../../constants/api';
import analytics from '@react-native-firebase/analytics';
import {magic} from '../../navigation/routes';
import {RootState} from '../../redux/store';
import {showErrorAlert} from '../../constants/utils/Function';
import toast from 'react-hot-toast';

interface Props {
	_opponentAmount: any;
	_matchId: any;
	_tokenId: any;
	_winningAmount: any;
	_betEndingDate: any;
	_betAmount: any;
	_parentBetId: any;
	_totalBetOption: any;
	_selectedBetMakerOption: any;
	_ISCUSTOMIZED: boolean;
	_streamCreator: any;
}

interface JoinBet {
	_betAmount: any;
	_betContractId: any;
	_selectedBetTackerOption: any;
	_tokenId: any;
	_betEndTime: any;
}

export const useBetCreateContract = () => {
	// Initialize the state
	const [init, setInit] = useState(false);
	const [bet_id, setBet_id] = useState('');
	const [tokenBalance, setTokenBalance] = useState('');
	const [betData, setBetData] = useState<Props>({});
	const [allowedToken, setAllowedToken] = useState('');
	const [strike, setStrike] = useState(0);
	const [dbethToken, setDbethToken] = useState('0');
	const [tokenSymbol, setTokenSymbol] = useState('');
	const [cancle_bet_id, setCancle_bet_id] = useState('');
	const [dbethBalance, setDbethBalance] = useState('');
	const [allowanceAddress, setAllowanceAddress] = useState('');
	const [resolveBetAddress, setResolveBetAddress] = useState('');
	const [verdictAddress, setVerdictAddress] = useState('');
	const [hashObj, setHashObj] = useState({});
	const [juryDbethToken, setJuryDbethToken] = useState('0');
	const [disputeDbethToken, setDisputeDbethToken] = useState('0');
	const [approveTnsAddress, setApproveTnsAddress] = useState('');
	const [betTakerLiquidity, setBetTakerLiquidity] = useState('');
	const [betTakerAddress, setBetTakerAddress] = useState('');
	const [withdrawAddress, setWithdrawAddress] = useState('');

	const [betStatus, setBetStatus] = useState('');

	const [lastWithdrawalAmount, setLastWithdrawalAmount] = useState('');
	const [strikePercentage, setStrikePercentage] = useState('0');

	const [betClaimStatus, setBetClaimStatus] = useState('');

	const [betLiquidity, setBetLiquidity] = useState([]);
	const [disputeAddress, setDisputeAddress] = useState('');
	const [isJuryVoted, setIsJuryVoted] = useState(false);
	const [isJury, setIsJury] = useState(false);
	const [isOpenDispute, setIsOpenDispute] = useState(false);
	const [juryVersion, setJuryVersion] = useState(0);
	const [passiveIncomeAmount, setPassiveIncomeAmount] = useState(0);
	const [liquidity, setLiquidity] = useState({});
	const [cancelBetLiquidityAmount, setCancelBetLiquidityAmount] = useState([]);
	const [claimRewardAllowance, setClaimRewardAllowance] = useState(0);
	const [claimUserData, setClaimUserData] = useState([]);
	const [maticTransfer, setMaticTransfer] = useState({});
	const [ercTokenTransfer, setErcTokenTransfer] = useState({});

	const connector = useWalletConnect();
	const dispatch = useDispatch();

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data.user;
	});

	useEffect(() => {
		console.log(
			'callCreateP2PBetSmartContract :: init :: userInfo?.walletAddress ::',
			init,
			userInfo?.walletAddress
		);
		if (init) {
			callCreateP2PBetSmartContract();
		}
	}, [init]);

	const getLoginUserWalletAddress = () => {
		const loginUserAddress = connector.connected
			? connector.accounts[0]
			: userInfo.walletAddress;

		console.log(
			'getLoginUserWalletAddress :: loginUserAddress :: ',
			loginUserAddress
		);

		return loginUserAddress;
	};

	const handleChange = useCallback((data: Props) => {
		setBetData(data);
		setInit(true);
		console.log('handleChange :: data ::', data);
	}, []);

	const handleJoinContract = useCallback((data: JoinBet) => {
		callJoinP2PBetSmartContract(data);
	}, []);

	//Done
	const getBalanceFromContract = async (ercContractAddress: string) => {
		let web3;
		setTokenBalance('');
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		//const balance = await getMetamaskBalance();

		const address = getLoginUserWalletAddress();

		//return;
		let a = new web3.eth.Contract(TOKEN_ABI, ercContractAddress, {
			from: address
		});

		a.methods
			.balanceOf(address)
			.call({from: address})
			.then(function (result) {
				console.log('getBalanceFromContract :: balanceOf :: result ::', result);
				a.methods
					.symbol()
					.call({from: address})
					.then(async function (symbol) {
						let decimals = await a.methods.decimals().call();
						console.log(
							'getBalanceFromContract ::',
							'decimals :: ' + decimals,
							'${web3.utils.fromWei(result)} ${symbol} :: ' +
								`${web3.utils.fromWei(result)} ${symbol}`
						);
						setTokenBalance(
							`${(parseFloat(result) / 10 ** decimals).toFixed(
								decimalValue
							)} ${symbol}`
						);
						// setTokenBalance(`${web3.utils.fromWei(result)} ${symbol}`);
						setDbethBalance(`${parseFloat(result) / 10 ** decimals}`);
						//return `${result / 10e17} ${symbol}`;
					});
			})
			.catch(() => {
				setTokenBalance(false);
				setDbethBalance(false);
			});
	};

	// Done
	const approveContract = async (
		ercContractAddress: string,
		allowanceAmount: string,
		isFromCreateBet: boolean
	) => {
		let web3;
		setAllowanceAddress('');

		if (connector.connected) {
			toast('Please open your connected wallet for approve transaction', {
				duration: 20000
			});
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		//const balance = await getMetamaskBalance();

		const address = getLoginUserWalletAddress();

		//return;
		try {
			dispatch(
				updateApiLoader({
					apiLoader: true,
					showAlertWithText:
						Strings.do_not_close_refresh_the_page_it_may_take_while
				})
			);

			let a = new web3.eth.Contract(DBETH_TOKEN_ABI, ercContractAddress, {
				from: address
			});

			let allowanceAmountContract;
			if (isFromCreateBet) {
				let decimals = await a.methods.decimals().call();
				allowanceAmountContract = allowanceAmount * Math.pow(10, decimals);
			} else {
				allowanceAmountContract = allowanceAmount;
			}
			//console.log('decimals >>> ', decimals);
			console.log('approveContract :: allowanceAmount ::', allowanceAmount);
			console.log(
				'approveContract ::',
				'allowanceAmountContract ::' + allowanceAmountContract
			);

			a.methods
				.approve(BetContractAddress, allowanceAmountContract + '') //covert to wei
				.send({
					from: address,
					gasPrice: 80000000000,
					gasLimit: 8000000
					//nonce: nonce + 1,
					// nonce: accountNonce,
				})
				.then(function (result) {
					setAllowanceAddress(
						result?.events?.Approval?.returnValues?.spender ?? 'success'
					);
					dispatch(updateApiLoader({apiLoader: false}));

					console.log(
						'approveContract :: approve :: result :: ',
						JSON.stringify(result)
					);
				})
				.catch(error => {
					console.log(
						'approveContract :: approve :: error :: ',
						error.toString()
					);
					dispatch(updateApiLoader({apiLoader: false}));
					setAllowanceAddress('Error');
					if (error?.toString().includes('insufficient funds')) {
						showErrorAlert(
							Strings.txt_insufficient_balance,
							Strings.txt_add_more_fund
						);
					} else {
						showErrorAlert(
							Strings.txt_contract_approval_error,
							Strings.txt_something_wrong_try_again
						);
					}
				});
		} catch (error) {
			dispatch(updateApiLoader({apiLoader: false}));
			setAllowanceAddress('Error');
			showErrorAlert(
				Strings.txt_contract_approval_error,
				Strings.txt_something_wrong_try_again
			);
			console.log(error);
		}
	};

	// Done
	const getContractAllowance = async (ercContractAddress: string) => {
		setAllowedToken('');
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = new Web3(magic.rpcProvider);
		}

		//const balance = await getMetamaskBalance();

		const address = getLoginUserWalletAddress();

		try {
			//return;
			let a = new web3.eth.Contract(TOKEN_ABI, ercContractAddress, {
				from: address
			});

			a.methods
				.allowance(address, BetContractAddress)
				.call({from: address})
				.then(async function (result) {
					console.log('getContractAllowance :: allowance :: result ::', result);
					let decimals = await a.methods.decimals().call();
					console.log(
						'getContractAllowance :: allowance ::',
						'decimals :: ' + decimals,
						'${web3.utils.fromWei(result)} :: ' +
							`${web3.utils.fromWei(result)}`
					);
					setAllowedToken(`${parseFloat(result) / 10 ** decimals}`);
					// setAllowedToken(`${web3.utils.fromWei(result)}`);
				})
				.catch(error => {
					console.log(error);
					setAllowedToken('');
				});
		} catch (error) {
			console.log(error);
			setAllowedToken('');
		}
	};

	const initWeb3 = async () => {
		if (Platform.OS === 'web') {
			const provider = new WalletConnectProvider({
				rpc: {
					[chainIdPolygonNetwork]: RpcURL
				},
				chainId: chainIdPolygonNetwork,
				connector: connector,
				qrcode: true,
				qrcodeModal: QRCodeModal,
				qrcodeModalOptions: {
					mobileLinks: [
						'rainbow',
						'metamask',
						'argent',
						'trust',
						'imtoken',
						'pillar'
					],
					desktopLinks: ['metamask']
				}
			});
			// alert(connector.session.clientMeta.url + provider.isWalletConnect);

			// const provider = new WalletConnectProvider({
			//   rpc: {
			//     [chainIdPolygonNetwork]: RpcURL,
			//   },
			//   qrcodeModalOptions: {
			//     desktopLinks: [
			//       "ledger",
			//       "tokenary",
			//       "wallet",
			//       "wallet 3",
			//       "secuX",
			//       "ambire",
			//       "wallet3",
			//       "apolloX",
			//       "zerion",
			//       "sequence",
			//       "punkWallet",
			//       "kryptoGO",
			//       "nft",
			//       "riceWallet",
			//       "vision",
			//       "keyring",
			//     ],
			//     mobileLinks: [
			//       "rainbow",
			//       "metamask",
			//       "argent",
			//       "trust",
			//       "imtoken",
			//       "pillar",
			//     ],
			//   },
			//   qrcode: true,
			// });

			await provider.enable();

			const web3 = new Web3(provider);

			return web3;
		} else {
			const provider = new WalletConnectProvider({
				rpc: {
					[chainIdPolygonNetwork]: RpcURL
				},
				chainId: chainIdPolygonNetwork,
				connector: connector,
				qrcode: false
			});

			await provider.enable();

			const web3 = new Web3(provider);
			return web3;
		}
	};

	//Done
	const callCreateP2PBetSmartContract = async () => {
		setInit(false);
		// if (connector.connected) {
		let web3;
		if (connector.connected) {
			toast('Please open your connected wallet for approve transaction', {
				duration: 20000
			});
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		//const balance = await getMetamaskBalance();

		const address = getLoginUserWalletAddress();

		//console.log('balance', balance);
		//return;

		// const web3 = new Web3(magic.rpcProvider);
		// const user = await magic.user.getMetadata();
		// const address = user.publicAddress;
		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});
		console.log(
			'callCreateP2PBetSmartContract :: betData._betAmount ::' +
				betData._betAmount
		);
		try {
			dispatch(
				updateApiLoader({
					apiLoader: true,
					showAlertWithText: Strings.do_not_close_the_app_your_bet_will_be_ready
				})
			);
			//const nonce_ = await web3.eth.getTransactionCount(address);
			console.log('====================================');
			console.log(
				'callCreateP2PBetSmartContract :: betData ::',
				JSON.stringify(betData)
			);

			let betContractAmount = betData._betAmount * Math.pow(10, 6);
			console.log(
				'callCreateP2PBetSmartContract :: betContractAmount ::',
				betContractAmount
			);

			let createBetAmount =
				betData._tokenId === 2 || betData._tokenId === 3
					? betContractAmount
					: Web3.utils.toWei(betData._betAmount, 'ether');

			console.log(
				'callCreateP2PBetSmartContract :: createBetAmount ::',
				createBetAmount
			);
			console.log(
				'callCreateP2PBetSmartContract :: betData._opponentAmount ::',
				betData._opponentAmount
			);
			console.log(
				"callCreateP2PBetSmartContract :: Web3.utils.toWei(parseFloat(betData._opponentAmount).toFixed(decimalValue),'ether') ::",
				Web3.utils.toWei(
					parseFloat(betData._opponentAmount).toFixed(decimalValue),
					'ether'
				)
			);

			let betOpponentAmount = betData._opponentAmount * Math.pow(10, 6);
			console.log(
				'callCreateP2PBetSmartContract :: betOpponentAmount ::',
				betOpponentAmount
			);
			console.log(
				"callCreateP2PBetSmartContract :: Web3.utils.toWei(parseFloat(betData._opponentAmount).toFixed(decimalValue),'ether') ::",
				Web3.utils.toWei(
					parseFloat(betData._opponentAmount).toFixed(decimalValue),
					'ether'
				)
			);
			//return;
			let createBetOpponentAmount =
				betData._tokenId === 2 || betData._tokenId === 3
					? betOpponentAmount
					: Web3.utils.toWei(
							parseFloat(betData._opponentAmount).toFixed(decimalValue),
							'ether'
					  );

			console.log(
				'callCreateP2PBetSmartContract :: createBetOpponentAmount ::',
				createBetOpponentAmount
			);

			var createBetOpponentAmountBigNumber = await Web3.utils
				.toBN(parseInt(createBetOpponentAmount))
				.toString();

			console.log(
				'callCreateP2PBetSmartContract :: createBetOpponentAmountBigNumber ::',
				createBetOpponentAmountBigNumber
			);
			console.log('====================================');

			const res = await a.methods
				.ForwardCreateBet(
					betData._parentBetId,
					betData._streamCreator,
					createBetOpponentAmountBigNumber,
					betData._betEndingDate,
					betData._tokenId,
					betData._totalBetOption,
					betData._selectedBetMakerOption + 1,
					createBetAmount.toString(),
					betData._ISCUSTOMIZED
				)
				.send(
					betData._tokenId == 0
						? {
								from: address,
								//value: Web3.utils.toBN(parseInt(betData._betAmount)),
								value: Web3.utils.toWei(betData._betAmount, 'ether'),
								gasPrice: 60000000000,
								gasLimit: 6000000
								//nonce: nonce_,
						  }
						: {
								from: address,
								//value: Web3.utils.toBN(parseInt(betData._betAmount)),
								// value: Web3.utils.toWei(betData._betAmount, 'ether'),
								gasPrice: 60000000000,
								gasLimit: 6000000
								//nonce: nonce_,
						  }
				);
			// dispatch(updateApiLoader({apiLoader: false}));
			console.log('====================================');
			console.log(
				'callCreateP2PBetSmartContract :: res ::',
				JSON.stringify(res)
			);
			console.log('====================================');

			betCreateEvent(res?.transactionHash, res?.blockNumber);
			// console.log(
			//   '::DFG:: Bet id',
			//   res.events.BetCreated.returnValues.betAddress_,
			//   '::DFG::',
			// );
			// await analytics().logEvent("createP2pBet", {
			//   id: bet_id,
			//   item: "p2pBetSmartContractCalled",
			//   description: JSON.stringify(res),
			//   input: JSON.stringify(betData),
			// });
		} catch (error) {
			setBet_id('Error');
			dispatch(updateApiLoader({apiLoader: false}));
			if (error?.toString().includes('insufficient funds')) {
				showErrorAlert(
					Strings.txt_insufficient_balance,
					Strings.txt_add_more_fund
				);
			} else {
				showErrorAlert(
					Strings.txt_bet_not_create,
					Strings.txt_something_wrong_try_again
				);
			}

			try {
				// await analytics().logEvent("createP2pBet", {
				//   id: "createP2pBet",
				//   item: "p2pBetSmartContractError",
				//   description: JSON.stringify(error),
				//   input: JSON.stringify(betData),
				// });
			} catch (firebaseErr) {
				console.log(
					'callCreateP2PBetSmartContract :: firebaseErr ::',
					firebaseErr
				);
			}
			console.log(
				'Error cancelled transaction ::',
				'typeof error :: ' + typeof error,
				'error :: ' + JSON.stringify(error),
				"typeof error === 'object' :: " + typeof error === 'object'
			);
		}
	};

	//Done
	const callJoinP2PBetSmartContract = async (data: JoinBet) => {
		//setInit(false);
		// if (connector.connected) {
		// const web3 = await initWeb3();
		// const balance = await getMetamaskBalance();

		// const address = connector.accounts[0];
		// console.log('temp0??>>>>>>', address);

		// console.log('balance', balance);
		let web3;
		if (connector.connected) {
			toast('Please open your connected wallet for approve transaction', {
				duration: 20000
			});
			web3 = await initWeb3();
		} else {
			web3 = new Web3(magic.rpcProvider);
		}

		//const balance = await getMetamaskBalance();

		const address = getLoginUserWalletAddress();
		dispatch(
			updateApiLoader({
				apiLoader: true,
				showAlertWithText: Strings.do_not_close_the_app_your_bet_will_be_ready
			})
		);
		let date = new Date();
		const message = `IAMJOININGBETWITHTHISID${
			data._betContractId
		}${date.getMilliseconds()}`;
		console.log('callJoinP2PBetSmartContract :: message ::', message);
		const response = await returnMessageSignAndHash(message, web3, address);
		if (response.error) {
			dispatch(updateApiLoader({apiLoader: false}));
			showErrorAlert('', Strings.somethingWentWrong);
			return;
		}
		console.log(
			'callJoinP2PBetSmartContract ::',
			'data._betContractId :: ' + data._betContractId,
			'data._betEndTime :: ' + data._betEndTime,
			'response.hash :: ' + response.hash,
			'response.signature :: ' + response.signature,
			'data._betAmount :: ' + data._betAmount,
			'data._selectedBetTackerOption + 1 :: ' +
				data._selectedBetTackerOption +
				1,
			'data._tokenId :: ' + data._tokenId
		);

		//return;
		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});
		console.log(
			'callJoinP2PBetSmartContract ::',
			'data :: ' + data,
			'data._betContractId :: ' + data._betContractId,
			'data._betAmount :: ' + data._betAmount
		);
		try {
			// dispatch(
			// 	updateApiLoader({
			// 		apiLoader: true,
			// 		showAlertWithText: Strings.do_not_close_the_app_your_bet_will_be_ready
			// 	})
			// );
			console.log('====================================');
			console.log(
				'callJoinP2PBetSmartContract :: data ::',
				JSON.stringify(data)
			);
			console.log(
				"callJoinP2PBetSmartContract :: Web3.utils.toWei(data._betAmount, 'ether') >>>> ",
				Web3.utils.toWei(data._betAmount, 'ether')
			);
			console.log('====================================');
			if (data._tokenId == 0) {
				const res = await a.methods
					.ForwardJoinBet(
						data._betContractId,
						data._betEndTime,
						response.hash,
						response.signature,
						data._betAmount,
						data._selectedBetTackerOption + 1,
						data._tokenId
					)
					.send({
						from: address,
						value: data._betAmount,
						gasPrice: 60000000000,
						gasLimit: 8000000
						//nonce: nonce_,
					});
				dispatch(updateApiLoader({apiLoader: false}));
				console.log(
					'callJoinP2PBetSmartContract :: res ::',
					JSON.stringify(res)
				);

				// const bet_id = res.events.BetDeployed.returnValues._id;
				// console.log('::DFG:: Bet id>??', JSON.stringify(res), '::DFG::>???');
				setBet_id('success');
			} else {
				console.log(
					'callJoinP2PBetSmartContract :: else :: data._betAmount ::',
					data._betAmount
				);
				const res = await a.methods
					.ForwardJoinBet(
						data._betContractId,
						data._betEndTime,
						response.hash,
						response.signature,
						data._betAmount,
						data._selectedBetTackerOption + 1,
						data._tokenId
					)
					.send({
						from: address,
						gasPrice: 60000000000,
						gasLimit: 8000000
						//nonce: nonce_,
					});
				dispatch(updateApiLoader({apiLoader: false}));
				console.log(
					'callJoinP2PBetSmartContract :: else :: res ::',
					JSON.stringify(res)
				);
				setBet_id('success');
			}
		} catch (error) {
			setBet_id('Error');
			dispatch(updateApiLoader({apiLoader: false}));
			try {
				await analytics().logEvent('joinP2PBet', {
					id: 'joinP2PBet',
					item: 'joinP2PBetSmartContractError',
					description: JSON.stringify(error)
					//input: JSON.stringify({_bet_amount, _bet_contract_id}),
				});
			} catch (firebaseErr) {
				console.log(
					'callJoinP2PBetSmartContract :: firebaseErr ::',
					firebaseErr
				);
			}
			console.log(
				'Error cancelled transaction ::',
				'typeof error :: ' + typeof error,
				'error :: ' + JSON.stringify(error),
				"typeof error === 'object' :: " + typeof error === 'object'
			);
			if (error?.toString().includes('insufficient funds')) {
				showErrorAlert(
					Strings.txt_insufficient_balance,
					Strings.txt_add_more_fund
				);
			} else {
				showErrorAlert(
					Strings.txt_bet_not_join,
					Strings.txt_something_wrong_try_again
				);
			}
		}
	};

	//Done
	const getBase64Hash = async (uniqCode: string, privateKey: string) => {
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = new Web3(magic.rpcProvider);
		}

		const message = 'MtPelerin-' + uniqCode;

		const generatedPrivateKey = '0x' + privateKey;

		try {
			const a = await web3.eth.accounts.sign(message, generatedPrivateKey);
			console.log('::MtPelerin::', a);

			const base64Hash = await Buffer.from(
				a.signature.replace('0x', ''),
				'hex'
			).toString('base64');

			console.log('getBase64Hash :: base64Hash ::', base64Hash);

			return base64Hash;
		} catch (error) {
			console.log(
				'Error cancelled transaction ::',
				'typeof error :: ' + typeof error,
				'error :: ' + JSON.stringify(error),
				"typeof error === 'object' :: " + typeof error === 'object'
			);
			showErrorAlert('', Strings.txt_something_wrong_try_again);
		}
	};

	//Done
	const getDbethTokenBalance = async (address: string) => {
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		setDbethToken('0');

		let a = new web3.eth.Contract(DBETH_TOKEN_ABI, DebethTokenContractAddress, {
			from: address
		});

		a.methods
			.balanceOf(address)
			.call({from: address})
			.then(function (result) {
				a.methods
					.symbol()
					.call({from: address})
					.then(function (symbol) {
						console.log(
							'getDbethTokenBalance :: ${web3.utils.fromWei(result)} ${symbol} ::',
							`${web3.utils.fromWei(result)} ${symbol}`
						);
						setDbethToken(`${web3.utils.fromWei(result)} ${symbol}`);
						//return `${result / 10e17} ${symbol}`;
					});
			});
	};

	//Done
	const approveDbethTokenAllowance = async (amount: string) => {
		let web3;
		if (connector.connected) {
			toast('Please open your connected wallet for approve transaction', {
				duration: 20000
			});
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}
		setAllowanceAddress('');
		const address = getLoginUserWalletAddress();

		try {
			dispatch(
				updateApiLoader({
					apiLoader: true,
					showAlertWithText:
						Strings.do_not_close_refresh_the_page_it_may_take_while
				})
			);

			let a = new web3.eth.Contract(
				DBETH_TOKEN_ABI,
				DebethTokenContractAddress,
				{
					from: address
				}
			);
			console.log('approveDbethTokenAllowance :: amount ::', amount);

			let decimals = await a.methods.decimals().call();
			const allowanceAmountContract = amount * Math.pow(10, decimals);

			a.methods
				.approve(DisputeResolutionContractAddress, allowanceAmountContract + '')
				.send({
					from: address,
					//value: Web3.utils.toBN(parseInt(betData._betAmount)),
					gasPrice: 60000000000,
					gasLimit: 6000000
				})
				.then(function (result) {
					console.log(
						'approveDbethTokenAllowance :: result ::',
						JSON.stringify(result)
					);

					const transactionHash = result.events.Approval.returnValues.spender;

					console.log(
						'approveDbethTokenAllowance :: transactionHash ::',
						transactionHash
					);
					setAllowanceAddress(transactionHash);
					dispatch(updateApiLoader({apiLoader: false}));
				})
				.catch(function (error) {
					dispatch(updateApiLoader({apiLoader: false}));
					setAllowanceAddress('Error');

					if (error?.toString().includes('insufficient funds')) {
						showErrorAlert(
							Strings.txt_insufficient_balance,
							Strings.txt_add_more_fund
						);
					} else {
						showErrorAlert(
							Strings.txt_contract_approval_error,
							Strings.txt_something_wrong_try_again
						);
					}
					console.log(error);
				});
		} catch (error) {
			dispatch(updateApiLoader({apiLoader: false}));
			setAllowanceAddress('Error');

			showErrorAlert(
				Strings.txt_contract_approval_error,
				Strings.txt_something_wrong_try_again
			);

			console.log(error);
		}
	};

	//Done
	const getBetDetails = async (bet_address: string) => {
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}
		setBetTakerAddress('');
		setBetTakerLiquidity('');
		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(BET_ABI, BetContractAddress, {
			from: address
		});

		a.methods
			.betDetails(bet_address)
			.call({from: address})
			.then(function (result) {
				setBetTakerLiquidity(result?.betTakerRequiredLiquidity);
				setBetTakerAddress(result?.betTaker);
				console.log('getBetDetails :: result ::', result);
			})
			.catch(function () {
				setBetTakerLiquidity('Error');
			});
	};

	// Done manage 2 key
	const getBetClaimDetails = async (bet_address: string) => {
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}
		console.log('getBetClaimDetails :: bet_address ::', bet_address);
		setBetClaimStatus('');
		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});

		a.methods
			.ForwardGetBetStatus(bet_address)
			.call({from: address})
			.then(function (result) {
				setBetClaimStatus(result?._resolutionStatus);
				//setBetTakerAddress(result?.isResolved);
				console.log(
					'getBetClaimDetails :: ForwardGetBetStatus :: result ::',
					result
				);
			})
			.catch(function () {
				setBetClaimStatus('Error');
			});
	};

	//Done
	const getJuryStrike = async () => {
		setStrike(0);
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});

		a.methods
			.ForwardGetJuryStrike(address)
			.call({from: address})
			.then(function (result) {
				console.log(
					'getJuryStrike :: ForwardGetJuryStrike :: result ::',
					result
				);
				setStrike(result);
			});
	};

	//Done
	const getUserStrike = async (address: string) => {
		setStrike(0);
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});

		a.methods
			.ForwardGetUserStrike(address)
			.call({from: address})
			.then(function (result) {
				console.log(
					'getUserStrike :: ForwardGetUserStrike :: result ::',
					result
				);
				setStrike(result);
			});
	};

	//Done

	const getJuryTokensShare = async (userStrikes: string, juryVersion: any) => {
		setStrikePercentage('0');
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(CONFIG_TOKEN_ABI, ConfigContractAddress, {
			from: address
		});

		a.methods
			.getJuryTokensShare(userStrikes, juryVersion)
			.call({from: address})
			.then(function (result) {
				console.log('getJuryTokensShare :: result ::', result);
				setStrikePercentage(result);
			});
	};
	//Done

	const getTokensPerStrike = async (userStrikes: string) => {
		setDisputeDbethToken('0');
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(CONFIG_TOKEN_ABI, ConfigContractAddress, {
			from: address
		});

		a.methods
			.getTokensPerStrike(userStrikes)
			.call({from: address})
			.then(function (result) {
				console.log('getTokensPerStrike :: result ::', result);
				setDisputeDbethToken(web3.utils.fromWei(result));
			});
	};

	//Done
	const userInitialStake = async () => {
		setJuryDbethToken('0');
		setLastWithdrawalAmount('');
		setIsJury(false);
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});

		a.methods
			.ForwardGetJuryStatistics(address)
			.call({from: address})
			.then(function (result) {
				console.log(
					'userInitialStake :: ForwardGetJuryStatistics :: result ::',
					result
				);
				setJuryDbethToken(web3.utils.fromWei(result?.userInitialStake_));
				setLastWithdrawalAmount(web3.utils.fromWei(result?.lastWithdrawal_));
				setIsJury(result?.isActiveStaker_);
			});
	};

	//Done
	const addDbethStakeToken = async () => {
		setApproveTnsAddress('');
		let web3;
		if (connector.connected) {
			toast('Please open your connected wallet for approve transaction', {
				duration: 20000
			});
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});

		try {
			dispatch(
				updateApiLoader({
					apiLoader: true,
					showAlertWithText:
						Strings.do_not_close_refresh_the_page_it_may_take_while
				})
			);

			a.methods
				.ForwardStaking()
				.send({
					from: address,
					gasPrice: 80000000000,
					gasLimit: 8000000
					// nonce: nonce_,
				})
				.then(function (result) {
					console.log(
						'addDbethStakeToken :: ForwardStaking :: result ::',
						JSON.stringify(result)
					);

					const transactionHash = result.transactionHash;

					console.log(
						'addDbethStakeToken :: ForwardStaking :: transactionHash ::',
						transactionHash
					);

					setApproveTnsAddress(transactionHash);
					dispatch(updateApiLoader({apiLoader: false}));
				})
				.catch(function (error) {
					console.log('addDbethStakeToken :: error ::', error);
					dispatch(updateApiLoader({apiLoader: false}));
					setApproveTnsAddress('Error');

					if (error?.toString().includes('insufficient funds')) {
						showErrorAlert(
							Strings.txt_insufficient_balance,
							Strings.txt_add_more_fund
						);
					} else {
						showErrorAlert(
							Strings.txt_amount_not_stake,
							Strings.txt_something_wrong_try_again
						);
					}
				});
		} catch (error) {
			console.log('error', error);
			dispatch(updateApiLoader({apiLoader: false}));
			setApproveTnsAddress('Error');
			showErrorAlert(
				Strings.txt_amount_not_stake,
				Strings.txt_something_wrong_try_again
			);
		}
	};

	const returnMessageSignAndHash = async (message, web3, address) => {
		try {
			// let hash = await web3.eth.accounts.hashMessage(message);
			// let signature = connector.connected
			// 	? await connector.signPersonalMessage([address, hash])
			// 	: await web3.eth.personal.sign(hash, address);
			let hash = await web3.eth.accounts.hashMessage(message);
			let sig = await web3.eth.accounts.sign(
				hash,
				'a699c008e5bcda9e6b032b930c248eab436690f4f4cfe725553c5d5ed33045a7'
			);
			// let response = await  web3.eth.accounts.sign(message, 'a699c008e5bcda9e6b032b930c248eab436690f4f4cfe725553c5d5ed33045a7')
			console.log(
				'returnMessageSignAndHash ::',
				'hash :: ' + hash,
				'sig :: ' + sig
			);
			// let recoveredData = await  web3.eth.accounts.recover(response)
			// console.log("recoveredData>>>>", recoveredData)
			return {hash: hash, signature: sig.signature};
		} catch (error) {
			return {error: true};
		}
	};

	const personalSign = async bet_address => {
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();
		console.log('personalSign :: bet_address ::', bet_address);
		const d = new Date();
		let message = `IAMACCEPTINGINVITATIONONBET${bet_address}${d.getTime()}`;
		let hash = await web3.eth.accounts.hashMessage(message);
		console.log('personalSign :: hash ::', hash);

		try {
			let signature;
			if (connector.connected) {
				dispatch(
					updateApiLoader({
						apiLoader: true,
						showAlertWithText:
							Strings.do_not_close_refresh_the_page_it_may_take_while
					})
				);
				signature = await connector.signPersonalMessage([address, hash]);
				console.log('personalSign :: signature ::', signature);
				setHashObj({signature: signature, hash: hash});
				dispatch(updateApiLoader({apiLoader: false}));
			} else {
				dispatch(
					updateApiLoader({
						apiLoader: true,
						showAlertWithText:
							Strings.do_not_close_refresh_the_page_it_may_take_while
					})
				);
				signature = await web3.eth.personal.sign(hash, address);
				setHashObj({signature: signature, hash: hash});
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('personalSign :: signature :: else ::', signature);
			}
		} catch (error) {
			setHashObj({error: 'Error signing message'});
			dispatch(updateApiLoader({apiLoader: false}));
			console.log(
				'Error cancelled transaction ::',
				'typeof error :: ' + typeof error,
				'error :: ' + JSON.stringify(error),
				"typeof error === 'object' :: " + typeof error === 'object'
			);

			showErrorAlert('', Strings.txt_something_wrong_try_again);
		}
	};

	//Done
	const getDisputeConfigDbethToken = async (address: string) => {
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		setJuryDbethToken('0');
		setDisputeDbethToken('0');

		let a = new web3.eth.Contract(CONFIG_TOKEN_ABI, ConfigContractAddress, {
			from: address
		});

		a.methods
			.getDisputeConfig()
			.call({from: address})
			.then(function (result) {
				console.log(
					'getDisputeConfigDbethToken :: getDisputeConfig ::',
					'result :: ' + result
				);
				setJuryDbethToken(web3.utils.fromWei(result['1']));
				setDisputeDbethToken(web3.utils.fromWei(result['0']));
			});
	};

	//Done
	const getSymbol = async () => {
		setTokenSymbol('');
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(DBETH_TOKEN_ABI, DebethTokenContractAddress, {
			from: address
		});

		a.methods
			.symbol()
			.call({from: address})
			.then(function (result) {
				console.log('getSymbol ::symbol ::', 'result ::' + result);
				setTokenSymbol(result);
			});
	};

	//ForwardGetBetData

	const getForwardGetBetData = async (bet_address: string) => {
		setBetStatus('');
		setIsOpenDispute(false);
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});

		a.methods
			.ForwardGetBetData(bet_address)
			.call({from: address})
			.then(function (result) {
				console.log(
					'getForwardGetBetData :: ForwardGetBetData ::',
					'result?._betStatus ::' + result?._betStatus,
					'result?._isDisputed :: ' + result?._isDisputed
				);
				setBetStatus(result?._betStatus);
				setIsOpenDispute(result?._isDisputed);
			});
	};

	// Done
	const benBet = async (betAddress: string) => {
		let web3;
		if (connector.connected) {
			toast('Please open your connected wallet for approve transaction', {
				duration: 20000
			});
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});

		try {
			dispatch(
				updateApiLoader({
					apiLoader: true,
					showAlertWithText:
						Strings.do_not_close_refresh_the_page_it_may_take_while
				})
			);
			a.methods
				.ForwardBanBet(betAddress)
				.send({
					from: address,
					//value: Web3.utils.toBN(parseInt(betData._betAmount)),
					gasPrice: 60000000000,
					gasLimit: 6000000
				})
				.then(function () {
					setCancle_bet_id('success');
					dispatch(updateApiLoader({apiLoader: false}));
				})
				.catch(function (error) {
					console.log('benBet :: error ::', error);
					setCancle_bet_id('Error');
					dispatch(updateApiLoader({apiLoader: false}));
					showErrorAlert('', Strings.txt_something_wrong_try_again);
				});
		} catch (error) {
			console.log('error', error);
			setCancle_bet_id('Error');
			dispatch(updateApiLoader({apiLoader: false}));
			showErrorAlert('', Strings.txt_something_wrong_try_again);
		}
	};

	//Done
	const processVerdict = async (
		hash: string,
		sign: string,
		betAddress: string,
		resultOption: number
	) => {
		setVerdictAddress('');
		let web3;
		if (connector.connected) {
			toast('Please open your connected wallet for approve transaction', {
				duration: 20000
			});
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();
		console.log(
			'processVerdict :: ',
			'hash :: ' + hash,
			'sign :: ' + sign,
			'betAddress :: ' + betAddress,
			'resultOption :: ' + resultOption
		);

		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});

		try {
			dispatch(
				updateApiLoader({
					apiLoader: true,
					showAlertWithText:
						Strings.do_not_close_refresh_the_page_it_may_take_while
				})
			);
			a.methods
				.ForwardProvideVerdict(hash, sign, resultOption + '', betAddress)
				.send({
					from: address,
					//value: Web3.utils.toBN(parseInt(betData._betAmount)),
					gasPrice: 60000000000,
					gasLimit: 6000000
				})
				.then(function (result) {
					console.log(
						'processVerdict :: ForwardProvideVerdict ::',
						'result :: ' + JSON.stringify(result)
					);

					const transactionHash = result.transactionHash;

					console.log(
						'processVerdict :: ForwardProvideVerdict :: transactionHash ::',
						transactionHash
					);

					setVerdictAddress(transactionHash);

					dispatch(updateApiLoader({apiLoader: false}));
				})
				.catch(function (error) {
					console.log('processVerdict :: error ::', error);
					setVerdictAddress('Error');
					dispatch(updateApiLoader({apiLoader: false}));
					showErrorAlert('', Strings.txt_something_wrong_try_again);
				});
		} catch (error) {
			console.log('processVerdict :: error ::', error);
			setVerdictAddress('Error');
			dispatch(updateApiLoader({apiLoader: false}));
			showErrorAlert('', Strings.txt_something_wrong_try_again);
		}
	};

	//Done
	const claimBetAmount = async (betAddress: string) => {
		let web3;
		if (connector.connected) {
			toast('Please open your connected wallet for approve transaction', {
				duration: 20000
			});
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});

		try {
			dispatch(
				updateApiLoader({
					apiLoader: true,
					showAlertWithText:
						Strings.just_a_few_more_seconds_your_funds_are_being_transferred_to_your_wallet
				})
			);
			a.methods
				.ForwardWithdrawLiquidity(betAddress)
				.send({
					from: address,
					//value: Web3.utils.toBN(parseInt(betData._betAmount)),
					gasPrice: 60000000000,
					gasLimit: 6000000
				})
				.then(function (result) {
					console.log(
						'claimBetAmount :: ForwardWithdrawLiquidity :: result ::',
						result
					);
					setCancle_bet_id('success');
					dispatch(updateApiLoader({apiLoader: false}));
				})
				.catch(function (error) {
					console.log(
						'claimBetAmount :: ForwardWithdrawLiquidity :: error ::',
						error
					);
					setCancle_bet_id('Error');
					dispatch(updateApiLoader({apiLoader: false}));
					showErrorAlert('', Strings.txt_something_wrong_try_again);
				});
		} catch (error) {
			console.log('error', error);
			setCancle_bet_id('Error');
			dispatch(updateApiLoader({apiLoader: false}));
			showErrorAlert('', Strings.txt_something_wrong_try_again);
		}
	};

	//Done
	const resolveBetResult = async (
		betAddress: string,
		finalOption: string,
		hash: string[],
		maker: string,
		taker: string,
		usersAddress: string[],
		rewardPercentage: string[]
	) => {
		let web3;
		if (connector.connected) {
			toast('Please open your connected wallet for approve transaction', {
				duration: 20000
			});
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();
		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});

		console.log(
			'resolveBetResult ::',
			'betAddress ::' + betAddress,
			'finalOption ::' + finalOption,
			'hash ::' + hash,
			'maker ::' + maker,
			'taker ::' + taker
		);
		setClaimUserData([]);
		const hashArr = hash?.reverse();
		let userHash = await web3.eth.accounts.hashMessage(usersAddress.toString());

		let signUser = await web3.eth.accounts.sign(
			userHash,
			'a699c008e5bcda9e6b032b930c248eab436690f4f4cfe725553c5d5ed33045a7'
		);

		try {
			// dispatch(
			// 	updateApiLoader({
			// 		apiLoader: true,
			// 		showAlertWithText:
			// 			Strings.just_a_few_more_seconds_your_funds_are_being_transferred_to_your_wallet
			// 	})
			// );
			//BETADDRESS_, FINALOPTION_, HASH_ , MAKER_,  TAKER_, ISCUSTOMIZED_
			a.methods
				.ForwardResolveBet(
					betAddress,
					finalOption,
					hashArr,
					maker,
					taker,
					usersAddress,
					rewardPercentage,
					// [userHash, percentageHash],
					// signUser.signature,
					// signPercentage.signature
					userHash,
					signUser.signature
				)
				.send({
					from: address,
					//value: Web3.utils.toBN(parseInt(betData._betAmount)),
					gasPrice: 60000000000,
					gasLimit: 6000000
				})
				.then(function (result) {
					console.log(
						'resolveBetResult :: ForwardResolveBet ::',
						'result :: ' + JSON.stringify(result)
					);
					setResolveBetAddress(result?.transactionHash);
					if (usersAddress.length) {
						let dataEvent = Object.values(result?.events);
						console.log('resolveBetResult :: dataEvent ::', dataEvent);

						let amountData = [];
						usersAddress?.map(async eventItem => {
							let amountUserObj = await dataEvent.filter(function (item) {
								return item?.raw?.topics
									?.toString()
									.includes(eventItem.replace('0x', ''));
							});

							amountData.push({
								address: eventItem,
								amount: parseInt(amountUserObj[0]?.raw?.data) / 10 ** 6
							});
						});
						console.log(
							'resolveBetResult :: ForwardResolveBet ::',
							'amountData ::' + amountData
						);

						setClaimUserData(amountData);
					}
					// dispatch(updateApiLoader({apiLoader: false}));
				})
				.catch(function (error) {
					console.log('error', error);
					setResolveBetAddress('Error');
					dispatch(updateApiLoader({apiLoader: false}));
					showErrorAlert('', Strings.txt_something_wrong_try_again);
				});
		} catch (error) {
			console.log('error', error);
			setResolveBetAddress('Error');
			dispatch(updateApiLoader({apiLoader: false}));
			showErrorAlert('', Strings.txt_something_wrong_try_again);
		}
	};

	const liquidityWithdrawalEvent = async (betAddress: string) => {
		let web3;
		setCancelBetLiquidityAmount([]);
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		console.log('liquidityWithdrawalEvent :: betAddress ::', betAddress);

		let a = new web3.eth.Contract(LIQUIDITY_EVENT, betAddress);

		try {
			//BETADDRESS_, FINALOPTION_, HASH_ , MAKER_,  TAKER_, ISCUSTOMIZED_
			const currentBlock = await web3.eth.getBlockNumber();
			console.log('liquidityWithdrawalEvent :: currentBlock ::', currentBlock);

			a.getPastEvents(
				'LiquidityWithdrawal',
				{
					filter: {address: betAddress},
					fromBlock: 0,
					toBlock: 'latest'
				},
				async function (error, result) {
					if (error) {
						console.log('liquidityWithdrawalEvent :: if :: error ::', error);
					} else {
						setCancelBetLiquidityAmount(result);
						console.log(
							'liquidityWithdrawalEvent :: else :: result ::',
							result
						);
					}
				}
			);
		} catch (error) {
			console.log('liquidityWithdrawalEvent :: error ::', error);
		}
	};

	const claimRewardAmount = async () => {
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		setWithdrawAddress('');
		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(
			REWARD_DISTRIBUTION_ABI,
			RewardDistributionAddress,
			{
				from: address
			}
		);

		try {
			dispatch(
				updateApiLoader({
					apiLoader: true,
					showAlertWithText:
						Strings.just_a_few_more_seconds_your_funds_are_being_transferred_to_your_wallet
				})
			);
			a.methods
				.claimReward()
				.send({
					from: address,
					//value: Web3.utils.toBN(parseInt(betData._betAmount)),
					gasPrice: 60000000000,
					gasLimit: 6000000
				})
				.then(function (result) {
					console.log('claimRewardAmount :: claimReward :: result ::', result);
					const transactionHash = result.transactionHash;
					setWithdrawAddress(transactionHash);
					dispatch(updateApiLoader({apiLoader: false}));
				})
				.catch(function (error) {
					console.log('claimRewardAmount :: claimReward :: error ::', error);
					setWithdrawAddress('Error');
					dispatch(updateApiLoader({apiLoader: false}));
					showErrorAlert('', Strings.txt_something_wrong_try_again);
				});
		} catch (error) {
			console.log('claimRewardAmount :: error ::', error);
			setWithdrawAddress('Error');
			dispatch(updateApiLoader({apiLoader: false}));
			showErrorAlert('', Strings.txt_something_wrong_try_again);
		}
	};

	const getClaimRewardAllowance = async () => {
		setClaimRewardAllowance(0);
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = new Web3(magic.rpcProvider);
		}
		const address = getLoginUserWalletAddress();

		try {
			let a = new web3.eth.Contract(
				REWARD_DISTRIBUTION_ABI,
				RewardDistributionAddress,
				{
					from: address
				}
			);

			a.methods
				.userAllowance(address)
				.call({from: address})
				.then(async function (result) {
					console.log('getclaimRewardAllowance :: result ::', result);
					setClaimRewardAllowance(`${web3.utils.fromWei(result)}`);
				})
				.catch(error => {
					console.log(error);
					setAllowedToken('');
				});
		} catch (error) {
			console.log(error);
			setAllowedToken('');
		}
	};

	const resolvedBetEvent = async (betAddress: string, isDraw: boolean) => {
		let web3;
		setBetLiquidity([]);
		setLiquidity({});
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(BET_CLAIM_EVENT, betAddress);

		try {
			//BETADDRESS_, FINALOPTION_, HASH_ , MAKER_,  TAKER_, ISCUSTOMIZED_
			const currentBlock = await web3.eth.getBlockNumber();
			console.log('resolvedBetEvent :: currentBlock ::', currentBlock);

			a.getPastEvents(
				isDraw ? 'PostDrawDistribution' : 'PostUserLiquidity',
				{
					filter: {betId_: betAddress},
					fromBlock: 0,
					toBlock: 'latest'
				},
				async function (error, result) {
					if (error) {
						console.log('resolvedBetEvent :: error ::', error);
					} else {
						console.log('====================================');
						console.log(
							'resolvedBetEvent :: result ::',
							JSON.stringify(result)
						);
						console.log('====================================');

						a.methods
							.totalAvailableLiquidity()
							.call({from: address})
							.then(function (totalResult) {
								console.log(
									'resolvedBetEvent :: totalAvailableLiquidity :: totalResult ::',
									totalResult
								);

								a.methods
									.receivedYeild()
									.call({from: address})
									.then(function (receivedResult) {
										console.log(
											'resolvedBetEvent :: receivedYeild ::',
											'receivedResult ::' + receivedResult
										);

										//if (tempLiquidity && tempLiquidity !== 'error') {
										setBetLiquidity(result);
										// setLiquidity(tempLiquidity);
										//}
										setLiquidity({
											totalAvailableLiquidity: totalResult,
											receivedLiquidityFromAave: receivedResult
										});
										//return;
									})
									.catch(function (error) {
										console.log('resolvedBetEvent :: error ::', error);
										showErrorAlert('', Strings.txt_something_wrong_try_again);
										return 'error';
									});
							})
							.catch(function (error) {
								console.log('error', error);
								showErrorAlert('', Strings.txt_something_wrong_try_again);
								return 'error';
							});
					}
				}
			);
		} catch (error) {
			console.log('error ::', error);
		}
	};

	const betCreateEvent = async (bet_transactionHash, bet_blockNumber) => {
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(BET_ABI, BetContractAddress, {
			from: address
		});
		// a.events
		//   .BetCreated(
		//     {
		//       fromBlock: 'latest',
		//       toBlock: 'latest',
		//     },
		//     function (error, event) {
		//       console.log("event????????", event);
		//     },
		//   )
		//   .on('connected', function (subscriptionId) {
		//     console.log("subscriptionId????", subscriptionId);
		//   })
		//   .on('data', function (event) {
		//     if(bet_id !== event?.returnValues?.betAddress_) {
		//       setBet_id(event?.returnValues?.betAddress_);
		//     console.log("data event??????", event?.returnValues?.betAddress_);
		//     }
		//     // same results as the optional callback above
		//   })
		//   .on('changed', function (event) {
		//     console.log('====================================');
		//     console.log('event changed::',event);
		//     console.log('====================================');
		//     // remove event from local database
		//   })
		//   .on('error', function (error, receipt) {
		//     // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
		//   });
		a.getPastEvents(
			'BetCreated',
			{
				// filter: {blockNumber: bet_transactionHash},
				fromBlock: bet_blockNumber,
				toBlock: 'latest'
			},
			function (error, result) {
				if (error) {
					console.log('betCreateEvent :: error ::', error);
					dispatch(updateApiLoader({apiLoader: false}));
				} else {
					console.log('betCreateEvent :: result ::', result);
					// console.log('data event??????', result[0]?.returnValues?.betAddress_);
					if (result?.length) {
						const resultValue = result.filter(resObj => {
							return resObj?.transactionHash === bet_transactionHash;
						});
						console.log('betCreateEvent :: resultValue ::', resultValue);
						setBet_id(resultValue[0]?.returnValues?.betAddress_);
					}
				}
			}
		);
	};

	//Done
	const brodcastFinalVerdict = async (
		betAddress: string,
		hash: string[],
		maker: string,
		taker: string
	) => {
		let web3;
		if (connector.connected) {
			toast('Please open your connected wallet for approve transaction', {
				duration: 20000
			});
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();
		console.log(
			'brodcastFinalVerdict :: ',
			'address :: ' + address,
			'betAddress :: ' + betAddress,
			'hash :: ' + hash,
			'taker :: ' + taker,
			'maker :: ' + maker
		);

		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});
		const hashArr = hash.reverse();
		try {
			dispatch(
				updateApiLoader({
					apiLoader: true,
					showAlertWithText:
						Strings.do_not_close_refresh_the_page_it_may_take_while
				})
			);
			//BETADDRESS_, FINALOPTION_, HASH_ , MAKER_,  TAKER_, ISCUSTOMIZED_
			a.methods
				.ForwardBroadcastFinalVerdict(betAddress, hashArr, maker, taker)
				.send({
					from: address,
					//value: Web3.utils.toBN(parseInt(betData._betAmount)),
					gasPrice: 60000000000,
					gasLimit: 6000000
				})
				.then(function (result) {
					console.log(
						'brodcastFinalVerdict :: ForwardBroadcastFinalVerdict ::',
						'result :: ' + result
					);
					setResolveBetAddress(result?.transactionHash);
					dispatch(updateApiLoader({apiLoader: false}));
				})
				.catch(function (error) {
					console.log('error', error);
					setResolveBetAddress('Error');
					dispatch(updateApiLoader({apiLoader: false}));
					showErrorAlert('', Strings.txt_something_wrong_try_again);
				});
		} catch (error) {
			console.log('error', error);
			setResolveBetAddress('Error');
			dispatch(updateApiLoader({apiLoader: false}));
			showErrorAlert('', Strings.txt_something_wrong_try_again);
		}
	};

	//Done
	const claimJuryStackAmount = async () => {
		let web3;
		if (connector.connected) {
			toast('Please open your connected wallet for approve transaction', {
				duration: 20000
			});
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		setWithdrawAddress('');
		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});

		try {
			dispatch(
				updateApiLoader({
					apiLoader: true,
					showAlertWithText:
						Strings.do_not_close_refresh_the_page_it_may_take_while
				})
			);
			a.methods
				.ForwardWithdrawal()
				.send({
					from: address,
					//value: Web3.utils.toBN(parseInt(betData._betAmount)),
					gasPrice: 60000000000,
					gasLimit: 6000000
				})
				.then(function (result) {
					console.log(
						'claimJuryStackAmount :: ForwardWithdrawal ::',
						'result :: ' + result
					);
					const transactionHash = result.transactionHash;
					setWithdrawAddress(transactionHash);
					dispatch(updateApiLoader({apiLoader: false}));
				})
				.catch(function (error) {
					console.log('error', error);
					setWithdrawAddress('Error');
					dispatch(updateApiLoader({apiLoader: false}));
					showErrorAlert('', Strings.txt_something_wrong_try_again);
				});
		} catch (error) {
			console.log('error', error);
			setWithdrawAddress('Error');
			dispatch(updateApiLoader({apiLoader: false}));
			showErrorAlert('', Strings.txt_something_wrong_try_again);
		}
	};

	//Done
	const createDispute = async (
		hash: string,
		sign: string,
		betAddress: string,
		resultOption: number
	) => {
		setDisputeAddress('');
		let web3;
		if (connector.connected) {
			toast('Please open your connected wallet for approve transaction', {
				duration: 20000
			});
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();
		console.log(
			'createDispute ::',
			'hash :: ' + hash,
			'sign :: ' + sign,
			'betAddress :: ' + betAddress,
			'resultOption :: ' + resultOption
		);

		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});

		try {
			dispatch(
				updateApiLoader({
					apiLoader: true,
					showAlertWithText:
						Strings.do_not_close_refresh_the_page_it_may_take_while
				})
			);
			a.methods
				.ForwardCreateDisputeRoom(betAddress, resultOption + '', hash, sign)
				.send({
					from: address,
					//value: Web3.utils.toBN(parseInt(betData._betAmount)),
					gasPrice: 60000000000,
					gasLimit: 6000000
				})
				.then(function (result) {
					console.log(
						'createDispute :: ForwardCreateDisputeRoom ::',
						'result ::' + JSON.stringify(result)
					);
					const transactionHash = result.transactionHash;
					console.log('createDispute :: transactionHash :: ', transactionHash);
					setDisputeAddress(transactionHash);

					dispatch(updateApiLoader({apiLoader: false}));
				})
				.catch(function (error) {
					console.log('error ::', error);
					setDisputeAddress('Error');
					dispatch(updateApiLoader({apiLoader: false}));
					showErrorAlert('', Strings.txt_something_wrong_try_again);
				});
		} catch (error) {
			console.log('error', error);
			setDisputeAddress('Error');
			dispatch(updateApiLoader({apiLoader: false}));
			showErrorAlert('', Strings.txt_something_wrong_try_again);
		}
	};

	//Done
	const createDisputeRoom = async (
		hash: string,
		sign: string,
		betAddress: string,
		resultOption: number
	) => {
		setDisputeAddress('');
		let web3;
		if (connector.connected) {
			toast('Please open your connected wallet for approve transaction', {
				duration: 20000
			});
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();
		console.log(
			'createDisputeRoom ::',
			'hash :: ' + hash,
			'sign :: ' + sign,
			'betAddress :: ' + betAddress,
			'resultOption :: ' + resultOption
		);

		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});

		try {
			dispatch(
				updateApiLoader({
					apiLoader: true,
					showAlertWithText:
						Strings.do_not_close_refresh_the_page_it_may_take_while
				})
			);
			a.methods
				.ForwardBypassDisputeRoom(betAddress, resultOption + '', hash, sign)
				.send({
					from: address,
					//value: Web3.utils.toBN(parseInt(betData._betAmount)),
					gasPrice: 60000000000,
					gasLimit: 6000000
				})
				.then(function (result) {
					console.log(
						'createDisputeRoom :: ForwardBypassDisputeRoom ::',
						'result ::' + JSON.stringify(result)
					);

					const transactionHash = result.transactionHash;

					console.log(
						'createDisputeRoom :: transactionHash ::',
						transactionHash
					);

					setDisputeAddress(transactionHash);

					dispatch(updateApiLoader({apiLoader: false}));
				})
				.catch(function (error) {
					console.log('createDispute :: error ::', error);
					setDisputeAddress('Error');
					dispatch(updateApiLoader({apiLoader: false}));
					showErrorAlert('', Strings.txt_something_wrong_try_again);
				});
		} catch (error) {
			console.log('error', error);
			setDisputeAddress('Error');
			dispatch(updateApiLoader({apiLoader: false}));
			showErrorAlert('', Strings.txt_something_wrong_try_again);
		}
	};

	//Done
	const getJuryVoteStatus = async (betAddress: string) => {
		setIsJuryVoted(false);
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(SMART_CONTRACT_ABI, SmartContractAddress, {
			from: address
		});

		a.methods
			.ForwardGetUserVoteStatus(address, betAddress)
			.call({from: address})
			.then(function (result) {
				console.log('getJuryVoteStatus :: result ::', result);
				setIsJuryVoted(result);
			});
	};

	const getJuryVersion = async () => {
		setJuryVersion(0);
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(
			DISPUTE_RESOLUTION_TOKEN_ABI,
			DisputeResolutionContractAddress,
			{
				from: address
			}
		);

		a.methods
			.getJuryVersion(address)
			.call({from: address})
			.then(function (result) {
				console.log('getJuryVersion :: result ::', result);
				setJuryVersion(result);
			});
	};

	const getPassiveIncome = async () => {
		setPassiveIncomeAmount(0);
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(CONFIG_TOKEN_ABI, ConfigContractAddress, {
			from: address
		});

		// a.methods
		// 	.getAaveFeeConfig()
		// 	.call({from: address})
		// 	.then(function (result) {
		// 		console.log('====================================');
		// 		console.log('getAaveFeeConfig :: result ::', result);
		// 		console.log('====================================');
		// 		const tempAmount = parseInt(result['0'] / 2);
		// 		if (tempAmount > 0) {
		// 			setPassiveIncomeAmount(tempAmount);
		// 		} else {
		// 			setPassiveIncomeAmount(0);
		// 		}
		// 	})
		// 	.catch(function (error) {
		// 		console.log('error', error);
		// 		showErrorAlert('', Strings.txt_something_wrong_try_again);
		// 	});
	};

	const getLiquidity = async betAddress => {
		setLiquidity({});
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = await new Web3(magic.rpcProvider);
		}

		const address = getLoginUserWalletAddress();

		let a = new web3.eth.Contract(BET_CLAIM_EVENT, betAddress, {
			from: address
		});

		console.log('getLiquidity :: betAddress :: ', betAddress);

		a.methods
			.totalAvailableLiquidity()
			.call({from: address})
			.then(function (totalResult) {
				console.log(
					'getLiquidity :: totalAvailableLiquidity ::',
					'totalResult ::' + totalResult
				);

				a.methods
					.receivedYeild()
					.call({from: address})
					.then(function (receivedResult) {
						console.log(
							'getLiquidity :: receivedYeild ::',
							'receivedResult ::' + receivedResult
						);
						setLiquidity({
							totalAvailableLiquidity: totalResult,
							receivedLiquidityFromAave: receivedResult
						});
						//return;
					})
					.catch(function (error) {
						console.log('getLiquidity :: receivedYeild :: error', error);
						showErrorAlert('', Strings.txt_something_wrong_try_again);
						return 'error';
					});
			})
			.catch(function (error) {
				console.log(
					'getLiquidity :: totalAvailableLiquidity :: error ::',
					error
				);
				showErrorAlert('', Strings.txt_something_wrong_try_again);
				return 'error';
			});
	};

	const transferMaticToken = async (transferAmount, receiverAddress) => {
		setMaticTransfer({});
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = new Web3(magic.rpcProvider);
		}
		const address = getLoginUserWalletAddress();
		try {
			dispatch(
				updateApiLoader({
					apiLoader: true,
					showAlertWithText:
						Strings.just_a_few_more_seconds_your_funds_are_being_transferred_from_your_wallet
				})
			);
			console.log(
				'transferMaticToken ::',
				"Web3.utils.toWei('1', 'ether') :: " + Web3.utils.toWei('1', 'ether')
			);
			const transactionConfig = {
				from: address,
				to: receiverAddress,
				value: Web3.utils.toWei(transferAmount, 'ether'),
				gasPrice: 40000000000,
				gasLimit: 4000000
			};
			let result = await web3.eth.sendTransaction(transactionConfig);
			console.log('transferMaticToken :: result ::', result);
			setMaticTransfer(result);
			dispatch(updateApiLoader({apiLoader: false}));
		} catch (error) {
			dispatch(updateApiLoader({apiLoader: false}));
			console.log(
				'transferMaticToken ::',
				'typeof error :: ' + typeof error,
				'error :: ' + JSON.stringify(error),
				"typeof error === 'object' :: " + typeof error === 'object'
			);

			if (error?.toString().includes('insufficient funds')) {
				showErrorAlert(
					Strings.txt_insufficient_balance,
					Strings.enough_balance_to_transfer
				);
			} else {
				showErrorAlert('', Strings.txt_something_wrong_try_again);
			}
		}
	};
	// Done
	const transferERCToken = async (
		ercContractAddress: string,
		transferAmount,
		receiverAddress
	) => {
		setErcTokenTransfer({});
		let web3;
		if (connector.connected) {
			web3 = await initWeb3();
		} else {
			web3 = new Web3(magic.rpcProvider);
		}
		const address = getLoginUserWalletAddress();
		try {
			dispatch(
				updateApiLoader({
					apiLoader: true,
					showAlertWithText:
						Strings.just_a_few_more_seconds_your_funds_are_being_transferred_from_your_wallet
				})
			);
			let a = new web3.eth.Contract(TOKEN_ABI, ercContractAddress, {
				from: address
			});
			let decimals = await a.methods.decimals().call();
			let transferAmountContract = transferAmount * Math.pow(10, decimals);
			console.log('transferERCToken :: decimals ::', decimals);
			console.log(
				'transferERCToken :: transferAmountContract ::',
				transferAmountContract
			);
			const transferedToken = await a.methods
				.transfer(receiverAddress, transferAmountContract)
				.send({
					from: address,
					gas: 6721975
				});
			setErcTokenTransfer(transferedToken);
			console.log('transferERCToken :: transferedToken ::', transferedToken);
			dispatch(updateApiLoader({apiLoader: false}));
		} catch (error) {
			dispatch(updateApiLoader({apiLoader: false}));
			console.log('transferERCToken :: error :: ', error);
			if (error?.toString().includes('insufficient funds')) {
				showErrorAlert(
					Strings.txt_insufficient_balance,
					Strings.enough_balance_to_transfer
				);
			} else {
				showErrorAlert('', Strings.txt_something_wrong_try_again);
			}
		}
	};

	return {
		bet_id,
		handleChange,
		getBalanceFromContract,
		tokenBalance,
		getContractAllowance,
		allowedToken,
		approveContract,
		handleJoinContract,
		getBase64Hash,
		getDbethTokenBalance,
		approveDbethTokenAllowance,
		getJuryStrike,
		getUserStrike,
		brodcastFinalVerdict,
		addDbethStakeToken,
		personalSign,
		strike,
		dbethToken,
		getDisputeConfigDbethToken,
		getSymbol,
		tokenSymbol,
		benBet,
		cancle_bet_id,
		hashObj,
		dbethBalance,
		allowanceAddress,
		claimBetAmount,
		resolveBetResult,
		resolveBetAddress,
		verdictAddress,
		processVerdict,
		juryDbethToken,
		disputeDbethToken,
		approveTnsAddress,
		getBetDetails,
		betTakerLiquidity,
		lastWithdrawalAmount,
		getJuryTokensShare,
		userInitialStake,
		strikePercentage,
		betTakerAddress,
		claimJuryStackAmount,
		withdrawAddress,
		createDispute,
		getBetClaimDetails,
		betClaimStatus,
		resolvedBetEvent,
		betLiquidity,
		createDisputeRoom,
		disputeAddress,
		getTokensPerStrike,
		isJuryVoted,
		getJuryVoteStatus,
		isJury,
		betStatus,
		getForwardGetBetData,
		isJury,
		isOpenDispute,
		juryVersion,
		getJuryVersion,
		passiveIncomeAmount,
		getPassiveIncome,
		getLiquidity,
		liquidity,
		liquidityWithdrawalEvent,
		claimRewardAmount,
		cancelBetLiquidityAmount,
		getClaimRewardAllowance,
		claimRewardAllowance,
		claimUserData,
		transferMaticToken,
		transferERCToken,
		maticTransfer,
		ercTokenTransfer
	};
};
