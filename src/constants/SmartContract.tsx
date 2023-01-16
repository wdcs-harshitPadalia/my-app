export const TOKEN_ABI = [
	{inputs: [], stateMutability: 'nonpayable', type: 'constructor'},
	{
		anonymous: false,
		inputs: [
			{indexed: true, internalType: 'address', name: 'owner', type: 'address'},
			{
				indexed: true,
				internalType: 'address',
				name: 'spender',
				type: 'address'
			},
			{indexed: false, internalType: 'uint256', name: 'value', type: 'uint256'}
		],
		name: 'Approval',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'previousOwner',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newOwner',
				type: 'address'
			}
		],
		name: 'OwnershipTransferred',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{indexed: true, internalType: 'address', name: 'from', type: 'address'},
			{indexed: true, internalType: 'address', name: 'to', type: 'address'},
			{indexed: false, internalType: 'uint256', name: 'value', type: 'uint256'}
		],
		name: 'Transfer',
		type: 'event'
	},
	{
		inputs: [],
		name: '_totalSupply',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'address', name: 'owner', type: 'address'},
			{internalType: 'address', name: 'spender', type: 'address'}
		],
		name: 'allowance',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'address', name: 'spender', type: 'address'},
			{internalType: 'uint256', name: 'amount', type: 'uint256'}
		],
		name: 'approve',
		outputs: [{internalType: 'bool', name: '', type: 'bool'}],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{internalType: 'address', name: 'account', type: 'address'}],
		name: 'balanceOf',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'decimals',
		outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'address', name: 'spender', type: 'address'},
			{internalType: 'uint256', name: 'subtractedValue', type: 'uint256'}
		],
		name: 'decreaseAllowance',
		outputs: [{internalType: 'bool', name: '', type: 'bool'}],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'address', name: 'spender', type: 'address'},
			{internalType: 'uint256', name: 'addedValue', type: 'uint256'}
		],
		name: 'increaseAllowance',
		outputs: [{internalType: 'bool', name: '', type: 'bool'}],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'name',
		outputs: [{internalType: 'string', name: '', type: 'string'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [{internalType: 'address', name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'renounceOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'symbol',
		outputs: [{internalType: 'string', name: '', type: 'string'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'totalSupply',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'address', name: 'to', type: 'address'},
			{internalType: 'uint256', name: 'amount', type: 'uint256'}
		],
		name: 'transfer',
		outputs: [{internalType: 'bool', name: '', type: 'bool'}],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'address', name: 'from', type: 'address'},
			{internalType: 'address', name: 'to', type: 'address'},
			{internalType: 'uint256', name: 'amount', type: 'uint256'}
		],
		name: 'transferFrom',
		outputs: [{internalType: 'bool', name: '', type: 'bool'}],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
];

export const CONFIG_TOKEN_ABI = [
	{
		inputs: [
			{
				internalType: 'address',
				name: 'admin_',
				type: 'address'
			}
		],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		name: 'AaveFeeConfigUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		name: 'FeeDeductionConfigUpdated',
		type: 'event'
	},
	{
		inputs: [],
		name: 'Aave_APY_Admin_Distribution',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'Aave_APY_Bet_Participant_Distribution',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'After_Full_Swap_Treasury_Wallet_Transfer',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'After_Full_Swap_Without_Trend_Setter_Treasury_Wallet_Transfer',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'Bet_Trend_Setter_Reward',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'Burn_Amount',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'Burn_Amount_Without_TrendSetter',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'DBETH_Swap_Amount_WithOut_Trend_Setter',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'DBETH_Swap_Amount_With_Trend_Setter',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'LendingPoolAddressProvider',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'Pool_Distribution_Amount',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'Pool_Distribution_Amount_Without_TrendSetter',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'UniswapV2Factory',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'UniswapV2Router',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'WETHGateway',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'aDAI',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'aWMATIC',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'aaveTimeThreshold',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'admin',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		name: 'betLevels',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		name: 'betRanges',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'blackListedAssets',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'burnAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'countUserBets',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'developerAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'escrowAmount',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getAaveConfig',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getAaveRecovery',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getAaveTimeThresold',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getAddresses',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getAdmin',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'asset_',
				type: 'address'
			}
		],
		name: 'getBlacklistedAsset',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getDisputeConfig',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getFeeDeductionConfig',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getHighestBetLavelrange',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'strike_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'version_',
				type: 'uint256'
			}
		],
		name: 'getJuryTokensShare',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getLatestVersion',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'tokenA_',
				type: 'address'
			}
		],
		name: 'getPairAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address'
			}
		],
		name: 'getPlatformFeePercantageOnBetLavel',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getPlatformFeePercantages',
		outputs: [
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'strike_',
				type: 'uint256'
			}
		],
		name: 'getTokensPerStrike',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getUniswapRouterAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getWalletAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'highestRange',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		name: 'juryTokensSharePerStrike',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		name: 'platformfeePercentOnBetLevels',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'poolAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'requirePaymentForJury',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'aave_apy_bet_participant_distrubution_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'aave_apy_bet_admin_distrubution_',
				type: 'uint256'
			}
		],
		name: 'setAaveFeeConfig',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'threshold_',
				type: 'uint256'
			}
		],
		name: 'setAaveThreshold',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'lendingPoolAddressProvider_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'wethGateway_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'aWMATIC_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'aDAI_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'uniswapV2Factory',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'uniswapV2Router',
				type: 'address'
			}
		],
		name: 'setAddresses',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'admin_',
				type: 'address'
			}
		],
		name: 'setAdmin',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'betLevel_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'lowerBound_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'upperBound_',
				type: 'uint256'
			}
		],
		name: 'setBetRangeOnDifferentLavels',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'asset_',
				type: 'address'
			}
		],
		name: 'setBlacklistedAsset',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'escrowAmount_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'requirePaymentForJury_',
				type: 'uint256'
			}
		],
		name: 'setDisputeConfig',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'after_full_swap_treasury_wallet_transfer_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'after_full_swap_without_trend_setter_treasury_wallet_transfer_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'dbeth_swap_amount_with_trend_setter_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'dbeth_swap_amount_without_trend_setter_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'bet_trend_setter_reward_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'pool_distribution_amount_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'burn_amount_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'pool_distribution_amount_without_trendsetter_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'burn_amount_without_trendsetter',
				type: 'uint256'
			}
		],
		name: 'setFeeDeductionConfig',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'highestRange_',
				type: 'uint256'
			}
		],
		name: 'setHighestBetLavelrange',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256[]',
				name: 'strike_',
				type: 'uint256[]'
			},
			{
				internalType: 'uint256[]',
				name: 'requiredShare_',
				type: 'uint256[]'
			}
		],
		name: 'setJuryTokensSharePerStrike',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'tokenA_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'tokenB_',
				type: 'address'
			}
		],
		name: 'setPairAddresses',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256[]',
				name: 'betlevels',
				type: 'uint256[]'
			},
			{
				internalType: 'uint256[]',
				name: 'feePercents',
				type: 'uint256[]'
			}
		],
		name: 'setPlatformFeePercantageOnBetLevel',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'strike_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'requiredPayment',
				type: 'uint256'
			}
		],
		name: 'setTokensPerStrike',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address'
			}
		],
		name: 'setUserBets',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'developer_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'burnAddress_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'poolAddress_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'treasury_',
				type: 'address'
			}
		],
		name: 'setWalletAddress',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'tokenPair',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'tokenStatisticsVersionCounter',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		name: 'tokensPerStrike',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'treasury',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	}
];

export const BET_ABI = [
	{
		inputs: [
			{
				internalType: 'address',
				name: 'admin_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'config_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'aggregator_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'verifier_',
				type: 'address'
			}
		],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'admin_',
				type: 'address'
			}
		],
		name: 'AdminUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'BetCreated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'BetJoined',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'DrawMatch',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'tokenAddress_',
				type: 'address'
			}
		],
		name: 'TokenActivated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'tokenAddress_',
				type: 'address'
			}
		],
		name: 'TokenDeActivated',
		type: 'event'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'tokenAddress_',
				type: 'address'
			}
		],
		name: 'ActivateToken',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'tokenAddress_',
				type: 'address'
			}
		],
		name: 'DeActivateToken',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'admin',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'banBet',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'betDetails',
		outputs: [
			{
				internalType: 'address',
				name: 'parentBet',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betInitiator',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betTaker',
				type: 'address'
			},
			{
				internalType: 'bool',
				name: 'isCustomised',
				type: 'bool'
			},
			{
				internalType: 'address',
				name: 'winner',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'betTakerRequiredLiquidity',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'betStartingTime',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'betEndingTime',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'winnerOption',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'totalBetOptions',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isDisputed',
				type: 'bool'
			},
			{
				internalType: 'bool',
				name: 'isDrawed',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'betStatus',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		name: 'bets',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'tokenAddress_',
				type: 'address'
			}
		],
		name: 'checkTokenExistance',
		outputs: [
			{
				internalType: 'bool',
				name: 'check_',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'parentBet_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betId_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'betTakerRequiredLiquidity_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'betEndingTime_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'tokenId_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'totalBetOptions_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'selectedOptionByUser_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'tokenLiqidity_',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isCustomized_',
				type: 'bool'
			}
		],
		name: 'createBet',
		outputs: [
			{
				internalType: 'bool',
				name: '_status',
				type: 'bool'
			},
			{
				internalType: 'address',
				name: '_betTrendSetter',
				type: 'address'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'disputeRooms',
		outputs: [
			{
				internalType: 'address',
				name: 'betCreator',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betTaker',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'totalOptions',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'finalOption',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'userStakeAmount',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isResolvedByAdmin',
				type: 'bool'
			},
			{
				internalType: 'uint256',
				name: 'disputeCreatedAt',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isResolved',
				type: 'bool'
			},
			{
				internalType: 'uint256',
				name: 'jurySize',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'disputedOption',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isCustomized',
				type: 'bool'
			},
			{
				internalType: 'address',
				name: 'disputeCreator',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'parentBet_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'underlyingBetCounter_',
				type: 'uint256'
			}
		],
		name: 'getChildBetAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getFoundationFactoryDetails',
		outputs: [
			{
				internalType: 'address',
				name: '_admin',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_verifier',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_config',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_aggregator',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_disputeResolver',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'parentBet_',
				type: 'address'
			}
		],
		name: 'getReplicatedBetData',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenId_',
				type: 'uint256'
			}
		],
		name: 'getTokenAddress',
		outputs: [
			{
				internalType: 'address',
				name: 'tokenAddress_',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'tokenAddress_',
				type: 'address'
			}
		],
		name: 'getTokenSatatus',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'isActiveStaker',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'isAdminWithdrawed',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes',
				name: '',
				type: 'bytes'
			}
		],
		name: 'isSignatureUsed',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'isTokenValid',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'newBetEndingTime',
				type: 'uint256'
			},
			{
				internalType: 'bytes32',
				name: 'authorisedHash',
				type: 'bytes32'
			},
			{
				internalType: 'bytes',
				name: 'authorisedSignature',
				type: 'bytes'
			},
			{
				internalType: 'uint256',
				name: 'tokenLiqidity_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'selectedOptionByUser_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'tokenId_',
				type: 'uint256'
			}
		],
		name: 'joinBet',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'juryStrike',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'juryVersion',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'lastWithdrawal',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'postDisputeProcess',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'provideBetData',
		outputs: [
			{
				internalType: 'address',
				name: 'betInitiator',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betTaker',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'totalBetOptions',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isDisputed',
				type: 'bool'
			},
			{
				internalType: 'bool',
				name: '_betStatus',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'raiseDispute',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'replicatedBets',
		outputs: [
			{
				internalType: 'address',
				name: 'betTrendSetter',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'underlyingBetCounter',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'finalOption_',
				type: 'uint256'
			},
			{
				internalType: 'bytes32[]',
				name: 'hash_',
				type: 'bytes32[]'
			},
			{
				internalType: 'bytes',
				name: 'maker_',
				type: 'bytes'
			},
			{
				internalType: 'bytes',
				name: 'taker_',
				type: 'bytes'
			},
			{
				internalType: 'address[]',
				name: 'userPackage_',
				type: 'address[]'
			},
			{
				internalType: 'uint256[]',
				name: 'percentagePackage_',
				type: 'uint256[]'
			},
			{
				internalType: 'bytes32[]',
				name: 'packageHash_',
				type: 'bytes32[]'
			},
			{
				internalType: 'bytes',
				name: 'userPackageSig_',
				type: 'bytes'
			},
			{
				internalType: 'bytes',
				name: 'percentagePackageSig',
				type: 'bytes'
			}
		],
		name: 'resolveBet',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'resolver_',
				type: 'address'
			}
		],
		name: 'setDisputeResolver',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'tokenAddress_',
				type: 'address'
			}
		],
		name: 'setToken',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'totalBets',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'admin_',
				type: 'address'
			}
		],
		name: 'updateAdmin',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'aggregator_',
				type: 'address'
			}
		],
		name: 'updateAggregator',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'config_',
				type: 'address'
			}
		],
		name: 'updateConfig',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'verifier_',
				type: 'address'
			}
		],
		name: 'updateVerifier',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'userAllowance',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'userInitialStake',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'userStrikes',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'usersStake',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'verifier',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'withdrawLiquidity',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		stateMutability: 'payable',
		type: 'receive'
	}
];

export const DISPUTE_RESOLUTION_TOKEN_ABI = [
	{
		inputs: [
			{
				internalType: 'address',
				name: 'admin_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'config_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'aggregator_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'dbethAddress_',
				type: 'address'
			}
		],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'DisputeRoomCreation',
		type: 'event'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'finalVerdictByAdmin_',
				type: 'uint256'
			},
			{
				internalType: 'address[]',
				name: 'users_',
				type: 'address[]'
			},
			{
				internalType: 'bytes32[]',
				name: 'hash_',
				type: 'bytes32[]'
			},
			{
				internalType: 'bytes',
				name: 'maker_',
				type: 'bytes'
			},
			{
				internalType: 'bytes',
				name: 'taker_',
				type: 'bytes'
			}
		],
		name: 'adminResolution',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'finalVerdictByAdmin_',
				type: 'uint256'
			},
			{
				internalType: 'bytes32[]',
				name: 'hash_',
				type: 'bytes32[]'
			},
			{
				internalType: 'bytes',
				name: 'maker_',
				type: 'bytes'
			},
			{
				internalType: 'bytes',
				name: 'taker_',
				type: 'bytes'
			}
		],
		name: 'adminResolutionForUnavailableEvidance',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'user_',
				type: 'address'
			}
		],
		name: 'adminWithdrawal',
		outputs: [
			{
				internalType: 'bool',
				name: 'status_',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'betDetails',
		outputs: [
			{
				internalType: 'address',
				name: 'parentBet',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betInitiator',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betTaker',
				type: 'address'
			},
			{
				internalType: 'bool',
				name: 'isCustomised',
				type: 'bool'
			},
			{
				internalType: 'address',
				name: 'winner',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'betTakerRequiredLiquidity',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'betStartingTime',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'betEndingTime',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'winnerOption',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'totalBetOptions',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isDisputed',
				type: 'bool'
			},
			{
				internalType: 'bool',
				name: 'isDrawed',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'betStatus',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		name: 'bets',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			},
			{
				internalType: 'bytes32[]',
				name: 'hash_',
				type: 'bytes32[]'
			},
			{
				internalType: 'bytes',
				name: 'makerSig_',
				type: 'bytes'
			},
			{
				internalType: 'bytes',
				name: 'takerSig_',
				type: 'bytes'
			}
		],
		name: 'brodcastFinalVerdict',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'disputedOption_',
				type: 'uint256'
			},
			{
				internalType: 'bytes32',
				name: 'hash_',
				type: 'bytes32'
			},
			{
				internalType: 'bytes',
				name: 'signature_',
				type: 'bytes'
			}
		],
		name: 'createDispute',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'disputedOption_',
				type: 'uint256'
			},
			{
				internalType: 'bytes32',
				name: 'hash_',
				type: 'bytes32'
			},
			{
				internalType: 'bytes',
				name: 'signature_',
				type: 'bytes'
			}
		],
		name: 'createDisputeRoom',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'disputeRooms',
		outputs: [
			{
				internalType: 'address',
				name: 'betCreator',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betTaker',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'totalOptions',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'finalOption',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'userStakeAmount',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isResolvedByAdmin',
				type: 'bool'
			},
			{
				internalType: 'uint256',
				name: 'disputeCreatedAt',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isResolved',
				type: 'bool'
			},
			{
				internalType: 'uint256',
				name: 'jurySize',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'disputedOption',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isCustomized',
				type: 'bool'
			},
			{
				internalType: 'address',
				name: 'disputeCreator',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'forwardVerdict',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'getBetStatus',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			},
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getDisputeResolverDetails',
		outputs: [
			{
				internalType: 'address',
				name: 'admin_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'config_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'aggregator_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'facory_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'dbethAddress_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'jurySize_',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'user_',
				type: 'address'
			}
		],
		name: 'getJuryStatistics',
		outputs: [
			{
				internalType: 'uint256',
				name: 'usersStake_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'lastWithdrawal_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'userInitialStake_',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isActiveStaker_',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'user_',
				type: 'address'
			}
		],
		name: 'getJuryStrike',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'user_',
				type: 'address'
			}
		],
		name: 'getJuryVersion',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'user_',
				type: 'address'
			}
		],
		name: 'getUserStrike',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'user_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betAddress',
				type: 'address'
			}
		],
		name: 'getUserVoteStatus',
		outputs: [
			{
				internalType: 'bool',
				name: '_status',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'isActiveStaker',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'isAdminWithdrawed',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes',
				name: '',
				type: 'bytes'
			}
		],
		name: 'isSignatureUsed',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'isTokenValid',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'juryStrike',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'juryVersion',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'lastWithdrawal',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'hash_',
				type: 'bytes32'
			},
			{
				internalType: 'bytes',
				name: 'signature_',
				type: 'bytes'
			},
			{
				internalType: 'uint256',
				name: 'selectedVerdict_',
				type: 'uint256'
			},
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'processVerdict',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'replicatedBets',
		outputs: [
			{
				internalType: 'address',
				name: 'betTrendSetter',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'underlyingBetCounter',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'aggregator_',
				type: 'address'
			}
		],
		name: 'setAggregator',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'config_',
				type: 'address'
			}
		],
		name: 'setConfig_',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'factory_',
				type: 'address'
			}
		],
		name: 'setFactory',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'stake',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'userAllowance',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'userInitialStake',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'userStrikes',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'usersStake',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'withdraw',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	}
];

export const SMART_CONTRACT_ABI = [
	{
		inputs: [
			{
				internalType: 'address',
				name: 'admin_',
				type: 'address'
			}
		],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'finalVerdictByAdmin_',
				type: 'uint256'
			},
			{
				internalType: 'address[]',
				name: 'users_',
				type: 'address[]'
			},
			{
				internalType: 'bytes32[]',
				name: 'hash_',
				type: 'bytes32[]'
			},
			{
				internalType: 'bytes',
				name: 'maker_',
				type: 'bytes'
			},
			{
				internalType: 'bytes',
				name: 'taker_',
				type: 'bytes'
			}
		],
		name: 'ForwardAdminResolution',
		outputs: [
			{
				internalType: 'bool',
				name: '_status',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'finalVerdictByAdmin_',
				type: 'uint256'
			},
			{
				internalType: 'bytes32[]',
				name: 'hash_',
				type: 'bytes32[]'
			},
			{
				internalType: 'bytes',
				name: 'maker_',
				type: 'bytes'
			},
			{
				internalType: 'bytes',
				name: 'taker_',
				type: 'bytes'
			}
		],
		name: 'ForwardAdminResolutionForUnavailableEvidance',
		outputs: [
			{
				internalType: 'bool',
				name: '_status',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'user_',
				type: 'address'
			}
		],
		name: 'ForwardAdminWithdrawal',
		outputs: [
			{
				internalType: 'bool',
				name: 'status_',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'ForwardBanBet',
		outputs: [
			{
				internalType: 'bool',
				name: '_status',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			},
			{
				internalType: 'bytes32[]',
				name: 'hash_',
				type: 'bytes32[]'
			},
			{
				internalType: 'bytes',
				name: 'maker_',
				type: 'bytes'
			},
			{
				internalType: 'bytes',
				name: 'taker_',
				type: 'bytes'
			}
		],
		name: 'ForwardBroadcastFinalVerdict',
		outputs: [
			{
				internalType: 'bool',
				name: '_status',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'disputedOption_',
				type: 'uint256'
			},
			{
				internalType: 'bytes32',
				name: 'hash_',
				type: 'bytes32'
			},
			{
				internalType: 'bytes',
				name: 'signature_',
				type: 'bytes'
			}
		],
		name: 'ForwardBypassDisputeRoom',
		outputs: [
			{
				internalType: 'bool',
				name: '_status',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'parentBet_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'betTakerRequiredLiquidity_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'betEndingTime_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'tokenId_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'totalBetOptions_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'selectedOptionByUser_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'tokenLiqidity_',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isCustomized_',
				type: 'bool'
			}
		],
		name: 'ForwardCreateBet',
		outputs: [
			{
				internalType: 'bool',
				name: '_status',
				type: 'bool'
			},
			{
				internalType: 'address',
				name: '_betTrendSetter',
				type: 'address'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'disputedOption_',
				type: 'uint256'
			},
			{
				internalType: 'bytes32',
				name: 'hash_',
				type: 'bytes32'
			},
			{
				internalType: 'bytes',
				name: 'signature_',
				type: 'bytes'
			}
		],
		name: 'ForwardCreateDisputeRoom',
		outputs: [
			{
				internalType: 'bool',
				name: '_status',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'ForwardGetBetData',
		outputs: [
			{
				internalType: 'address',
				name: '_betInitiator',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_betTaker',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_totalBetOptions',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: '_isDisputed',
				type: 'bool'
			},
			{
				internalType: 'bool',
				name: '_betStatus',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'ForwardGetBetStatus',
		outputs: [
			{
				internalType: 'bool',
				name: '_resolutionStatus',
				type: 'bool'
			},
			{
				internalType: 'bool',
				name: '_isResolvedByAdim',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'user_',
				type: 'address'
			}
		],
		name: 'ForwardGetJuryStatistics',
		outputs: [
			{
				internalType: 'uint256',
				name: 'usersStake_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'lastWithdrawal_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'userInitialStake_',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isActiveStaker_',
				type: 'bool'
			},
			{
				internalType: 'uint256',
				name: 'juryVerion_',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'user_',
				type: 'address'
			}
		],
		name: 'ForwardGetJuryStrike',
		outputs: [
			{
				internalType: 'uint256',
				name: '_strike',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'user_',
				type: 'address'
			}
		],
		name: 'ForwardGetUserStrike',
		outputs: [
			{
				internalType: 'uint256',
				name: '_strike',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'user_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betAddress',
				type: 'address'
			}
		],
		name: 'ForwardGetUserVoteStatus',
		outputs: [
			{
				internalType: 'bool',
				name: '_status',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'newBetEndingTime',
				type: 'uint256'
			},
			{
				internalType: 'bytes32',
				name: 'authorisedHash',
				type: 'bytes32'
			},
			{
				internalType: 'bytes',
				name: 'authorisedSignature',
				type: 'bytes'
			},
			{
				internalType: 'uint256',
				name: 'tokenLiqidity_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'selectedOptionByUser_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'tokenId_',
				type: 'uint256'
			}
		],
		name: 'ForwardJoinBet',
		outputs: [
			{
				internalType: 'bool',
				name: '_status',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'hash_',
				type: 'bytes32'
			},
			{
				internalType: 'bytes',
				name: 'signature_',
				type: 'bytes'
			},
			{
				internalType: 'uint256',
				name: 'selectedVerdict_',
				type: 'uint256'
			},
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'ForwardProvideVerdict',
		outputs: [
			{
				internalType: 'bool',
				name: '_status',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'finalOption_',
				type: 'uint256'
			},
			{
				internalType: 'bytes32[]',
				name: 'hash_',
				type: 'bytes32[]'
			},
			{
				internalType: 'bytes',
				name: 'maker_',
				type: 'bytes'
			},
			{
				internalType: 'bytes',
				name: 'taker_',
				type: 'bytes'
			},
			{
				internalType: 'address[]',
				name: 'userPackage_',
				type: 'address[]'
			},
			{
				internalType: 'uint256[]',
				name: 'percentagePackage_',
				type: 'uint256[]'
			},
			{
				internalType: 'bytes32[]',
				name: 'packageHash_',
				type: 'bytes32[]'
			},
			{
				internalType: 'bytes',
				name: 'userPackageSig_',
				type: 'bytes'
			},
			{
				internalType: 'bytes',
				name: 'percentagePackageSig',
				type: 'bytes'
			}
		],
		name: 'ForwardResolveBet',
		outputs: [
			{
				internalType: 'bool',
				name: '_status',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'ForwardStaking',
		outputs: [
			{
				internalType: 'bool',
				name: '_status',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betAddress_',
				type: 'address'
			}
		],
		name: 'ForwardWithdrawLiquidity',
		outputs: [
			{
				internalType: 'bool',
				name: '_status',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'ForwardWithdrawal',
		outputs: [
			{
				internalType: 'bool',
				name: '_status',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getAdmin',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getAggregatorAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getConfigAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getDisputeResolverAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getFoundationFactoryAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getLiquidityHolderDeployer',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'admin_',
				type: 'address'
			}
		],
		name: 'setAdmin',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'aggregator_',
				type: 'address'
			}
		],
		name: 'setAggregatorAddress',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'config_',
				type: 'address'
			}
		],
		name: 'setConfigAddress',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'disputeResolver_',
				type: 'address'
			}
		],
		name: 'setDisputeResolverAddress',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'foundationFactory_',
				type: 'address'
			}
		],
		name: 'setFoundationFactoryAddress',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'holderDeployer_',
				type: 'address'
			}
		],
		name: 'setLiquidityHolderDeployer',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		stateMutability: 'payable',
		type: 'receive'
	}
];

export const BET_CLAIM_EVENT = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'betId_',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'betMaker_',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'betTaker_',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'admin_',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'betMakerAmount_',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'betTakerAmount_',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'adminAmount_',
				type: 'uint256'
			}
		],
		name: 'PostDrawDistribution',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'betId_',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'winner_',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'looser_',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'winnerAmount_',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'looserAmount_',
				type: 'uint256'
			}
		],
		name: 'PostUserLiquidity',
		type: 'event'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betWinnerAddress_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betLosserAddress_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'agreegatorAddress_',
				type: 'address'
			}
		],
		name: 'claimReward',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			}
		],
		name: 'collectDeveloperFee',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'forwarderFlag',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'instanceDeployer',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'winner_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'looser_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'treasury_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'winnerAmount_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'looserAmount_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'treasuryValue_',
				type: 'uint256'
			}
		],
		name: 'payReward',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betWinnerAddress_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betLooserAddress_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'treasury_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'agreegatorAddress_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			}
		],
		name: 'processAaveDistribution',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			}
		],
		name: 'processAaveDistributionForDraw',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			}
		],
		name: 'processAaveRecovery',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			}
		],
		name: 'processBan',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			}
		],
		name: 'processDrawMatch',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			}
		],
		name: 'processUSDTSwap',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenLiquidity_',
				type: 'uint256'
			},
			{
				internalType: 'address',
				name: 'tokenAddress_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betCreator_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betTrendSetter_',
				type: 'address'
			}
		],
		name: 'receiveLiquidityCreator',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenLiquidity_',
				type: 'uint256'
			},
			{
				internalType: 'address',
				name: 'betTaker_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			},
			{
				internalType: 'bool',
				name: 'forwarderFlag_',
				type: 'bool'
			}
		],
		name: 'receiveLiquidityTaker',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'receivedYeild',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'totalAvailableLiquidity',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'user_',
				type: 'address'
			}
		],
		name: 'withdrawLiquidity',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		stateMutability: 'payable',
		type: 'receive'
	}
];

export const LIQUIDITY_EVENT = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount_',
				type: 'uint256'
			}
		],
		name: 'LiquidityWithdrawal',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'betId_',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'betMaker_',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'betTaker_',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'admin_',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'betMakerAmount_',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'betTakerAmount_',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'adminAmount_',
				type: 'uint256'
			}
		],
		name: 'PostDrawDistribution',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'betId_',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'winner_',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'looser_',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'winnerAmount_',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'looserAmount_',
				type: 'uint256'
			}
		],
		name: 'PostUserLiquidity',
		type: 'event'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betWinnerAddress_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betLosserAddress_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'agreegatorAddress_',
				type: 'address'
			},
			{
				internalType: 'address[]',
				name: 'userPackage_',
				type: 'address[]'
			},
			{
				internalType: 'uint256[]',
				name: 'percentagePackage_',
				type: 'uint256[]'
			}
		],
		name: 'claimReward',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			}
		],
		name: 'collectDeveloperFee',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'forwarderFlag',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'agreegatorAddress_',
				type: 'address'
			},
			{
				internalType: 'address[]',
				name: 'userPackage_',
				type: 'address[]'
			},
			{
				internalType: 'uint256[]',
				name: 'percentagePackage_',
				type: 'uint256[]'
			}
		],
		name: 'getDistribution',
		outputs: [
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'instanceDeployer',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'winner_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'looser_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'treasury_',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'winnerAmount_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'looserAmount_',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'treasuryValue_',
				type: 'uint256'
			}
		],
		name: 'payReward',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'betWinnerAddress_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betLooserAddress_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'treasury_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'agreegatorAddress_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			}
		],
		name: 'processAaveDistribution',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			}
		],
		name: 'processAaveDistributionForDraw',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			}
		],
		name: 'processAaveRecovery',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			}
		],
		name: 'processBan',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			}
		],
		name: 'processDrawMatch',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			}
		],
		name: 'processUSDTSwap',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenLiquidity_',
				type: 'uint256'
			},
			{
				internalType: 'address',
				name: 'tokenAddress_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betCreator_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betTrendSetter_',
				type: 'address'
			}
		],
		name: 'receiveLiquidityCreator',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenLiquidity_',
				type: 'uint256'
			},
			{
				internalType: 'address',
				name: 'betTaker_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'registry_',
				type: 'address'
			},
			{
				internalType: 'bool',
				name: 'forwarderFlag_',
				type: 'bool'
			}
		],
		name: 'receiveLiquidityTaker',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'receivedYeild',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'totalAvailableLiquidity',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'user_',
				type: 'address'
			}
		],
		name: 'withdrawLiquidity',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		stateMutability: 'payable',
		type: 'receive'
	}
];

export const DBETH_TOKEN_ABI = [
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'initialSupply',
				type: 'uint256'
			}
		],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'owner',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'spender',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'value',
				type: 'uint256'
			}
		],
		name: 'Approval',
		type: 'event'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'spender',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			}
		],
		name: 'approve',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'spender',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'subtractedValue',
				type: 'uint256'
			}
		],
		name: 'decreaseAllowance',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'spender',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'addedValue',
				type: 'uint256'
			}
		],
		name: 'increaseAllowance',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			}
		],
		name: 'transfer',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'from',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'value',
				type: 'uint256'
			}
		],
		name: 'Transfer',
		type: 'event'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'from',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			}
		],
		name: 'transferFrom',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'spender',
				type: 'address'
			}
		],
		name: 'allowance',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'account',
				type: 'address'
			}
		],
		name: 'balanceOf',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'decimals',
		outputs: [
			{
				internalType: 'uint8',
				name: '',
				type: 'uint8'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'name',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'symbol',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'totalSupply',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	}
];

export const REWARD_DISTRIBUTION_ABI = [
	{
		inputs: [
			{
				internalType: 'address',
				name: 'admin_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'tokenAddress_',
				type: 'address'
			}
		],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		inputs: [],
		name: 'admin',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address[]',
				name: 'user_',
				type: 'address[]'
			},
			{
				internalType: 'uint256[]',
				name: 'amount_',
				type: 'uint256[]'
			}
		],
		name: 'approveReward',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'betDetails',
		outputs: [
			{
				internalType: 'address',
				name: 'parentBet',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betInitiator',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betTaker',
				type: 'address'
			},
			{
				internalType: 'bool',
				name: 'isCustomised',
				type: 'bool'
			},
			{
				internalType: 'address',
				name: 'winner',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'betTakerRequiredLiquidity',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'betStartingTime',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'betEndingTime',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'winnerOption',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'totalBetOptions',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isDisputed',
				type: 'bool'
			},
			{
				internalType: 'bool',
				name: 'isDrawed',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'betStatus',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		name: 'bets',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'claimReward',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'disputeRooms',
		outputs: [
			{
				internalType: 'address',
				name: 'betCreator',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'betTaker',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'totalOptions',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'finalOption',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'userStakeAmount',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isResolvedByAdmin',
				type: 'bool'
			},
			{
				internalType: 'uint256',
				name: 'disputeCreatedAt',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isResolved',
				type: 'bool'
			},
			{
				internalType: 'uint256',
				name: 'jurySize',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'disputedOption',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isCustomized',
				type: 'bool'
			},
			{
				internalType: 'address',
				name: 'disputeCreator',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'isActiveStaker',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'isAdminWithdrawed',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes',
				name: '',
				type: 'bytes'
			}
		],
		name: 'isSignatureUsed',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'isTokenValid',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'juryStrike',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'juryVersion',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'lastWithdrawal',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'amount_',
				type: 'uint256'
			}
		],
		name: 'refilTokens',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'replicatedBets',
		outputs: [
			{
				internalType: 'address',
				name: 'betTrendSetter',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'underlyingBetCounter',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'tokenAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'admin_',
				type: 'address'
			}
		],
		name: 'updateAdmin',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'userAllowance',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'userInitialStake',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'userStrikes',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'usersStake',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	}
];

//TODO: add a way to get the contract address from the network

export const ConfigContractAddress =
	'0xacFa8D3661425acE092c778E3deC4c9686a91deB';

export const BetContractAddress = '0x80E552EE16B84da8CcCB0b584a1407BF3DBfbEca';

export const DisputeResolutionContractAddress =
	'0xc1C05fc1923b7eEe11D2fC2e1E26CC6Bc923423D';

export const SmartContractAddress =
	'0xc0BaDE1dFE17526cce0fA34e02aA6D9d940e7e21';

export const DebethTokenContractAddress =
	'0xf04A870D9124c4bBE1b2C2B80eb6020A11B22499';

export const LiquidityHolderAddress =
	'0xF339f8C7DD14f280c35CFD31733971A14E7DD760';

export const RewardDistributionAddress =
	'0xF49E70BbD85f3e7C6F204D12f1501A54b9c7467e';
