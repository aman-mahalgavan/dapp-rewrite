import React from 'react';
import * as Constants from '../constants/constants';
import initState from './initialState';
import { toast } from 'react-toastify';
import ToastComponent from '../components/global/toastComponent'
import { etherscanTx } from '../utilities/helpers';


export default (state = initState, action) => {
    if(!state) {
        return null;
    }
    switch (action.type) {
        case Constants.default.Success.SMARTCONTRACT_OBJECT_SUCCESS:
            return {
                ...state,
                GlobalSmartContractObject: action.GlobalSmartContractObject
            }
        case Constants.default.Failure.SMARTCONTRACT_OBJECT_FAILURE:
            return {
                ...state,
                GlobalSmartContractObject_Error: action.error
            }
        case Constants.default.Success.PLACE_BUY_ORDER_SUCCESS:
        // https://kovan.etherscan.io/tx/0x3ee3b2cc25003fc006a0788e7a2affc3370b5149b5ce3aedd1dc9bebfd71ac52
            toast.success(<ToastComponent message={action.buyOrderStatus.etherscanLink} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                buyOrderStatus: action.buyOrderStatus
            }
        case Constants.default.Success.PLACE_SELL_ORDER_SUCCESS:
            toast.success(<ToastComponent message={action.sellOrderStatus.etherscanLink} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                sellOrderStatus: action.sellOrderStatus
            }
        case Constants.default.Success.DEPOSIT_ETH_SUCCESS:
            toast.success(<ToastComponent message={action.depositedEth.etherscanLink} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                depositEthStatus: action.depositedEth
            }
        case Constants.default.Success.WITHDRAW_ETH_SUCCESS:
            toast.success(<ToastComponent message={action.withdrawAmount.etherscanLink} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                depositEthStatus: action.withdrawAmount
            }
        case Constants.default.Success.CANCEL_ORDER_SUCCESS:
            toast.success(<ToastComponent message={action.cancelOrderStatus.etherscanLink} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                cancelOrderStatus: action.cancelOrderStatus
            }
        case Constants.default.Success.CANCEL_ORDERS_SUCCESS:
            toast.success(<ToastComponent message={action.cancelOrdersStatus.etherscanLink} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',

            })
            return {
                ...state,
                cancelOrdersStatus: action.cancelOrdersStatus
            }
        case Constants.default.Success.GET_DEPOSIT_WITHDRAWL_RECORDS_SUCCESS:
            return {
                ...state,
                depositWithdrawlRecords: action.depositWithdrawlRecords
            }
        case Constants.default.Success.GET_ORDERBOOK_SUCCESS:
            
            return {
                ...state,
                orderBook: action.orderbook
            }
        case Constants.default.Success.GET_MY_ORDERS_SUCCESS:
            return {
                ...state,
                myOrders: action.myOrders
            }
        case Constants.default.Success.GET_BALANCE_SUCCESS:
            return {
                ...state,
                balance: action.balance
            }
        case Constants.default.Success.GET_MY_ACCOUNTID_SUCCESS:
            return {
                ...state,
                accountId: action.accountId
            }
        case Constants.default.Success.GET_BESTBID_BESTASK_SUCCESS:
            return {
                ...state,
                bestBidBestAsk: action.bestBidBestAsk
            }
        // case Constants.default.Success.RECEIVED_SMARTCONTRACTS:
        //     toast.success(<ToastComponent message={action..etherscanLink} />, {
        //         position: toast.POSITION.BOTTOM_CENTER,
        // className: 'toast-notification',
        //        
        //     })
        //     return {
        //         ...state
        //     }
        // case Constants.default.Success.WEB3_OBJECT_SUCCESS:
        //     toast.success(<ToastComponent message={action..etherscanLink} />, {
        //         position: toast.POSITION.BOTTOM_CENTER,
        // className: 'toast-notification',
        //        
        //     })
        //     return {
        //         ...state
        //     }
        case Constants.default.Success.DEPOSIT_TOKEN_SUCCESS:
            toast.success(<ToastComponent message={action.depositedToken.etherscanLink} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state
            }
        case Constants.default.Success.WITHDRAW_TOKEN_SUCCESS:
            toast.success(<ToastComponent message={action.withdrawnAmount.etherscanLink} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state
            }
        // case Constants.default.Success.FETCH_TRADE_HISTORY_SUCCESS:
        //     toast.success(<ToastComponent message={action..etherscanLink} />, {
        //         position: toast.POSITION.BOTTOM_CENTER,
                // className: 'toast-notification',
                //
        //     })
        //     return {
        //         ...state
        //     }
        // case Constants.default.Success.FETCH_ORDER_HISTORY_SUCCESS:
        //     toast.success(<ToastComponent message={action..etherscanLink} />, {
        //         position: toast.POSITION.BOTTOM_CENTER,
                // className: 'toast-notification',
                //
        //     })
            return {
                ...state
            }
        case Constants.default.Failure.PLACE_BUY_ORDER_FAILURE:
            toast.error(<ToastComponent message={action.e.message} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                error: action.e.message
            }
        case Constants.default.Failure.GET_ORDERBOOK_FAILURE:
            toast.error(<ToastComponent message={action.e.message} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                error: action.e.message
            }
        case Constants.default.Failure.GET_MY_ORDERS_FAILURE:
            toast.error(<ToastComponent message={action.e.message} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                error: action.e.message
            }
        case Constants.default.Failure.PLACE_SELL_ORDER_FAILURE:
            toast.error(<ToastComponent message={action.e.message} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                error: action.e.message
            }
        case Constants.default.Failure.DEPOSIT_ETH_FAILURE:
            toast.error(<ToastComponent message={action.e.message} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                error: action.e.message
            }
        case Constants.default.Failure.WITHDRAW_ETH_FAILURE:
            toast.error(<ToastComponent message={action.e.message} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                error: action.e.message
            }
        case Constants.default.Failure.DEPOSIT_TOKEN_FAILURE:
            toast.error(<ToastComponent message={action.e.message} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                error: action.e.message
            }
        case Constants.default.Failure.WITHDRAW_TOKEN_FAILURE:
            toast.error(<ToastComponent message={action.e.message} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                error: action.e.message
            }
        case Constants.default.Failure.GET_BALANCE_FAILURE:
            toast.error(<ToastComponent message={action.e.message} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                error: action.e.message
            }
        case Constants.default.Failure.GET_MY_ACCOUNTID_FAILURE:
            toast.error(<ToastComponent message={action.e.message} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                error: action.e.message
            }
        case Constants.default.Failure.GET_BESTBID_BESTASK_FAILURE:
            toast.error(<ToastComponent message={action.e.message} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                error: action.e.message
            }
        case Constants.default.Failure.GET_DEPOSIT_WITHDRAWL_RECORDS_FAILURE:
            toast.error(<ToastComponent message={action.e.message} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                error: action.e.message
            }
        case Constants.default.Failure.FETCH_TRADE_HISTORY_FAILURE:
            toast.error(<ToastComponent message={action.e.message} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                error: action.e.message
            }
        case Constants.default.Failure.FETCH_ORDER_HISTORY_FAILURE:
            toast.error(<ToastComponent message={action.e.message} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                error: action.e.message
            }
        case Constants.default.Failure.CANCEL_ORDER_FAILURE:
            toast.error(<ToastComponent message={action.e.message} />, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-notification',
               
            })
            return {
                ...state,
                error: action.e.message
            }
        default:
            return state;
    }
}



