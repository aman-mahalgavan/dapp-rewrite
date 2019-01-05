import * as Constants from '../constants/constants';

export const putSmartContractToStore = () => ({
    type: Constants.default.Requests.SMARTCONTRACT_OBJECT_REQUEST
});

export const placeBuyOrderRequest = (price, amount, base, trade) => {
    return {
        type: Constants.default.Requests.PLACE_BUY_ORDER_REQUEST,
        payload: {price, amount, base, trade}
    }
};

export const placeSellOrderRequest = (price, amount, base, trade) => {
    return {
        type: Constants.default.Requests.PLACE_SELL_ORDER_REQUEST,
        payload: { price, amount, base, trade }
    }
};

export const getOrderBookRequest = (prTrade, prBase, numOfRecordsToFetch) => {
    return {
        type: Constants.default.Requests.GET_ORDERBOOK_REQUEST,
        payload: { prTrade, prBase, numOfRecordsToFetch }
    }
};

export const getMyOrdersRequest = (trade, base) => {
    return {
        type: Constants.default.Requests.GET_MY_ORDERS_REQUEST,
        payload: { trade, base }
    }
};

export const cancelOrderRequest = (orderId) => {
    return {
        type: Constants.default.Requests.CANCEL_ORDER_REQUEST,
        payload: { orderId }
    }
};

export const cancelOrdersRequest = (idArray) => {
    return {
        type: Constants.default.Requests.CANCEL_ORDERS_REQUEST,
        payload: { idArray }
    }
};

export const getBalanceRequest = (id) => {
    return {
        type: Constants.default.Requests.GET_BALANCE_REQUEST,
        payload: { id }
    }
};

export const getDWRecordsRequest = (id) => {
    return {
        type: Constants.default.Requests.GET_DEPOSIT_WITHDRAWL_RECORDS_REQUEST,
        payload: { id }
    }
};

export const placeDepositEthRequest = (amount) => {
    return {
        type: Constants.default.Requests.DEPOSIT_ETH_REQUEST,
        payload: { amount }
    }
};


export const placeWithdrawEthRequest = (amount) => {
    return {
        type: Constants.default.Requests.WITHDRAW_ETH_REQUEST,
        payload: { amount }
    }
};

export const placeDepositTokenRequest = (prAddress, amount) => {
    return {
        type: Constants.default.Requests.DEPOSIT_TOKEN_REQUEST,
        payload: { prAddress, amount }
    }
};

export const placeWithdrawTokenRequest = (prAddress, amount) => {
    return {
        type: Constants.default.Requests.WITHDRAW_TOKEN_REQUEST,
        payload: { prAddress, amount }
    }
};

export const getMyAccountIdRequest = () => {
    return {
        type: Constants.default.Requests.GET_MY_ACCOUNTID_REQUEST
    }
}

export const getBestBidBestAsk = (trade, base) => {
    return {
        type: Constants.default.Requests.GET_BESTBID_BESTASK_REQUEST,
        payload: { trade, base }
    }
}