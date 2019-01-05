import { call, put, takeEvery, all } from 'redux-saga/effects'
import Lodash from 'lodash';
import Web3 from 'web3';
import BN from 'bn.js';
import { Decimal } from 'decimal.js';
import store from '../store/reduxStore';
import * as Constants from '../constants/constants';
import { config, filterMarkets, contractList } from '../utilities/config';
import { etherscanTx, etherscanUrl, divideBigNumbers, multiplyBigNumbers, convertPriceArray, convertVolumeArray, transformToTokenName, convertQtyEach, convertPriceEach, addBigNumbers} from '../utilities/helpers.js';

let data = [];
const coinList = config.base.concat(config.trades);
coinList.forEach((obj, i) => {
    data.push({
        product: obj.productName,
        prCode: obj.productId,
        tokenAddress: obj.tokenAddress,
        decimal: obj.decimal
    });
    if (i === 0) {
        if (obj.prTrade && obj.prTrade.length > 0) {
            obj.prTrade.forEach(o => {
                data.push({
                    product: o.productName,
                    prCode: o.productId,
                    tokenAddress: o.tokenAddress,
                    decimal: o.decimal
                });
            })
        }
    }
});

function* getMyAccountId() {
    try {
        const { GlobalWeb3Object, GlobalSmartContractObject } = store.getState().smartContract;
        const FromAddress = yield GlobalWeb3Object.eth.getAccounts();
        const id = yield GlobalSmartContractObject.methods.GetMyAccountId().call({
            from: FromAddress[0]
        });

        yield put({ type: Constants.default.Success.GET_MY_ACCOUNTID_SUCCESS, accountId: id });
    }
    catch(e){
        yield put({ type: Constants.default.Failure.GET_MY_ACCOUNTID_FAILURE, e});
    }
}

function* getOrderBook(params) {
    try {
        const { GlobalWeb3Object, GlobalSmartContractObject } = store.getState().smartContract;
        const FromAddress = yield GlobalWeb3Object.eth.getAccounts();
        const { prTrade, prBase, numOfOrdersToFetch = 10 } = params.payload;
        const res = yield call(GlobalSmartContractObject.methods.GetHoga, prTrade, prBase, numOfOrdersToFetch)
        const orderBook = yield call(res.call, {
            from: FromAddress[0]
        })

        const tradeDecimal = transformToTokenName(prTrade).decimal; // coinList.find(coin => coin.productId === prTrade).decimal;
        yield put({
            type: Constants.default.Success.GET_ORDERBOOK_SUCCESS, orderbook: {
                priceA: convertPriceArray(orderBook.priceA),
                priceB: convertPriceArray(orderBook.priceB),
                volumeA: convertVolumeArray(orderBook.volumeA, tradeDecimal),
                volumeB: convertVolumeArray(orderBook.volumeB, tradeDecimal)
            }
        });
    }
    catch(e){
            yield put({type: Constants.default.Failure.GET_ORDERBOOK_FAILURE, e});
    }
}

function* getMyOrders(params) {
    try {
        const { trade, base } = params.payload;
        const { GlobalWeb3Object, GlobalSmartContractObject } = store.getState().smartContract;
        const FromAddress = yield GlobalWeb3Object.eth.getAccounts();
        const res = yield call(GlobalSmartContractObject.methods.GetMyOrders)
        const myOrders = yield call(res.call, {
            from: FromAddress[0]
        })
        let result = [];
        const prices = convertPriceArray(myOrders.prices);

        myOrders.orderId.forEach((obj, i) => {
            result.push({
                orderID: obj,
                prTrade: myOrders.prTrade[i],
                prBase: myOrders.prBase[i],
                instrumentPair: transformToTokenName(myOrders.prTrade[i]).productName + '/' + transformToTokenName(myOrders.prBase[i]).productName,
                prices: prices[i],
                qtys: convertQtyEach(myOrders.qtys[i], transformToTokenName(myOrders.prTrade[i]).decimal),
                sells: myOrders.sells[i]
            });
        });
        yield put({ type: Constants.default.Success.GET_MY_ORDERS_SUCCESS, myOrders: result });

    }
    catch(e){
        yield put({ type: Constants.default.Failure.GET_MY_ORDERS_FAILURE, e });

    }
}

function* getBestBidBestAsk(params) {
    try {
        const { trade, base } = params.payload;
        trade.forEach((o, i) => {
            if (i < (trade.length - 1))
                base.push(base[0]);
        })
        const { GlobalWeb3Object, GlobalSmartContractObject } = store.getState().smartContract;
        const FromAddress = yield GlobalWeb3Object.eth.getAccounts();
        const bestBidBestAsk = yield GlobalSmartContractObject.methods.getOrderBookInfo(trade, base).call({
            from: FromAddress[0]
        });
        let result = {
            bestAskPrice: convertPriceArray(bestBidBestAsk.bestAskPrice),
            bestBidPrice: convertPriceArray(bestBidBestAsk.bestBidPrice)
        }


        yield put({ type: Constants.default.Success.GET_BESTBID_BESTASK_SUCCESS, bestBidBestAsk: result });

    }
    catch(e){
        yield put({ type: Constants.default.Failure.GET_BESTBID_BESTASK_FAILURE, e });

    }
}

function* GetDepositWithdrawlRecords(params) {
    try {

        const { id } = params.payload;

        const { GlobalWeb3Object, GlobalSmartContractObject } = store.getState().smartContract;
        const FromAddress = yield GlobalWeb3Object.eth.getAccounts();

        const depositWithdrawlRecords = yield GlobalSmartContractObject.methods.GetDWrecords(id).call({
            from: FromAddress[0]
        });
        const result = depositWithdrawlRecords.isDeposit.map((o, i) => {
            return {
                isDeposit: o,
                qtys: convertQtyEach(depositWithdrawlRecords.qty[i], transformToTokenName(depositWithdrawlRecords.prCode[i]).decimal),
                timestamp: depositWithdrawlRecords.timestamp[i],
                prCode: depositWithdrawlRecords.prCode[i]
            }

        });

        yield put({ type: Constants.default.Success.GET_DEPOSIT_WITHDRAWL_RECORDS_SUCCESS, depositWithdrawlRecords: result })
    }
    catch(e){
        yield put({ type: Constants.default.Failure.GET_DEPOSIT_WITHDRAWL_RECORDS_FAILURE, e })

    }
}

function* cancelOrder(params) {
    try {
        const { orderId } = params.payload;
        const { GlobalWeb3Object, GlobalSmartContractObject } = store.getState().smartContract;
        const FromAddress = yield GlobalWeb3Object.eth.getAccounts();

        const result = yield GlobalSmartContractObject.methods.cancelOrder(orderId).send({
            from: FromAddress[0]
        });
        let network = yield GlobalWeb3Object.eth.net.getNetworkType();
        let etherscanLink = etherscanTx( network, 'Check Status: View Tx status', result.transactionHash);
        result["etherscanLink"] = etherscanLink;
        yield put({type: Constants.default.Success.CANCEL_ORDER_SUCCESS, cancelOrderStatus: result});
    }
    catch(e){
        yield put({type: Constants.default.Failure.CANCEL_ORDER_FAILURE, e});

    }
}

function* cancelOrders(params) {
    try {
        const { idArray } = params.payload;
        const { GlobalWeb3Object, GlobalSmartContractObject } = store.getState().smartContract;
        const FromAddress = yield GlobalWeb3Object.eth.getAccounts();

        const result = yield GlobalSmartContractObject.methods.cancelOrders(idArray).send({
            from: FromAddress[0]
        });
        let network = yield GlobalWeb3Object.eth.net.getNetworkType();
        let etherscanLink = etherscanTx( network, 'Check Status: View Tx status', result.transactionHash);
        result["etherscanLink"] = etherscanLink;
        yield put({type: Constants.default.Success.CANCEL_ORDERS_SUCCESS, cancelOrdersStatus: result});
    }
    catch(e){
        yield put({type: Constants.default.Failure.CANCEL_ORDERS_FAILURE, e});

    }
}


function* placeBuyOrder(params) {
    try {
        const { GlobalWeb3Object, GlobalSmartContractObject } = store.getState().smartContract;
        const FromAddress = yield GlobalWeb3Object.eth.getAccounts();
        const { price, amount, base, trade } = params.payload;
        const isSell = false;
        const ownerId = config.ownerId; // get the ownerId from the config
        const basePrice = config.basePrice;

        const tradeDecimal = coinList.find(coin => coin.productId === trade).decimal;

        let BN_Price = multiplyBigNumbers(price, basePrice);  //new BN(calculated_price.toString(10));

        let BN_Amount = multiplyBigNumbers(amount, tradeDecimal);//new BN(calculated_amount.toString(10));


        const order = yield GlobalSmartContractObject.methods.LimitOrder(ownerId, trade, base, isSell, BN_Price, BN_Amount).send({
            from: FromAddress[0]
        });
        let network = yield GlobalWeb3Object.eth.net.getNetworkType();
        let etherscanLink = etherscanTx( network, 'Check Status: View Tx status', order.transactionHash);
        order["etherscanLink"] = etherscanLink;
        yield put({ type: Constants.default.Success.PLACE_BUY_ORDER_SUCCESS, buyOrderStatus: order });
    }
    catch(e){
        yield put({ type: Constants.default.Failure.PLACE_BUY_ORDER_FAILURE, e });
    }
}

function* placeSellOrder(params) {
    try {
        const { GlobalWeb3Object, GlobalSmartContractObject } = store.getState().smartContract;
        const FromAddress = yield GlobalWeb3Object.eth.getAccounts();

        const { price, amount, base, trade } = params.payload;
        const isSell = true;
        const ownerId = config.ownerId; // get the ownerId from the config
        const basePrice = config.basePrice;

        const tradeDecimal = coinList.find(coin => coin.productId === trade).decimal;

        let BN_Price = multiplyBigNumbers(price, basePrice);

        let BN_Amount = multiplyBigNumbers(amount, tradeDecimal);


        const order = yield GlobalSmartContractObject.methods.LimitOrder(ownerId, trade, base, isSell, BN_Price, BN_Amount).send({
            from: FromAddress[0]
        });
        let network = yield GlobalWeb3Object.eth.net.getNetworkType();
        let etherscanLink = etherscanTx( network, 'Check Status: View Tx status', order.transactionHash);
        order["etherscanLink"] = etherscanLink;
        yield put({ type: Constants.default.Success.PLACE_SELL_ORDER_SUCCESS, sellOrderStatus: order });
    }
    catch(e){
        yield put({ type: Constants.default.Failure.PLACE_SELL_ORDER_FAILURE, e });
    }
}

function* getBalance(params) {
    try {
        const { GlobalWeb3Object, GlobalSmartContractObject } = store.getState().smartContract;

        const FromAddress = yield GlobalWeb3Object.eth.getAccounts();
        let prCodesArray = [];
        let tokens = [];
        for (let c of data) {
            if (+c.prCode) {
                prCodesArray.push(+c.prCode);
            }
            tokens.push({ name: c.product, address: c.tokenAddress, decimal: c.decimal });
        }

        let productArray = Lodash.uniq(prCodesArray);
        const res = yield call(GlobalSmartContractObject.methods.getBalance, productArray)
        const balance = yield call(res.call, {
            from: FromAddress[0]
        });
        let _result = [];
        balance.available.forEach((obj, index) => {
              let holdAmount = divideBigNumbers(balance.reserved[index], tokens[index].decimal);
              let availableAmount = divideBigNumbers(obj.toString(), tokens[index].decimal);
              let totalAmount = addBigNumbers(holdAmount, availableAmount);
            _result.push({
                name: tokens[index].name,
                hold: holdAmount,
                available: availableAmount,
                total: totalAmount,
                tokenAddress: tokens[index].address
            });
        });
        yield put({ type: Constants.default.Success.GET_BALANCE_SUCCESS, balance: _result });
    }
    catch(e){
        yield put({ type: Constants.default.Failure.GET_BALANCE_FAILURE, e });
    }
}

function* depositEthRequest(params) {
    try {
        const { GlobalWeb3Object, GlobalSmartContractObject } = store.getState().smartContract;
        const FromAddress = yield GlobalWeb3Object.eth.getAccounts();
        const { amount } = params.payload;
        const deposit = yield GlobalSmartContractObject.methods.depositETH().send({
            from: FromAddress[0],
            value: Web3.utils.toWei(amount, 'ether')
        });
        let network = yield GlobalWeb3Object.eth.net.getNetworkType();
        let etherscanLink = etherscanTx( network, 'Check Status: View Tx status', deposit.transactionHash);
        deposit["etherscanLink"] = etherscanLink;
        yield put({ type: Constants.default.Success.DEPOSIT_ETH_SUCCESS, depositedEth: deposit });
    }
    catch(e){
        yield put({ type: Constants.default.Failure.DEPOSIT_ETH_FAILURE, e });
    }
}

function* withdrawEthRequest(params) {
    try {
        const { GlobalWeb3Object, GlobalSmartContractObject } = store.getState().smartContract;
        const FromAddress = yield GlobalWeb3Object.eth.getAccounts();

        const { amount } = params.payload;
        const withdrawAmount = yield GlobalSmartContractObject.methods.withdrawETH(Web3.utils.toWei(amount, 'ether')).send({
            from: FromAddress[0]
        });
        let network = yield GlobalWeb3Object.eth.net.getNetworkType();
        let etherscanLink = etherscanTx( network, 'Check Status: View Tx status', withdrawAmount.transactionHash);
        withdrawAmount["etherscanLink"] = etherscanLink;
        yield put({ type: Constants.default.Success.WITHDRAW_ETH_SUCCESS, withdrawnAmount: withdrawAmount });
    }
    catch(e){
        yield put({ type: Constants.default.Failure.WITHDRAW_ETH_FAILURE, e });
    }
}

function* depositTokenRequest(params) {
    try {
        const { GlobalWeb3Object, GlobalSmartContractObject } = store.getState().smartContract;
        const FromAddress = yield GlobalWeb3Object.eth.getAccounts();
        const { prAddress, amount } = params.payload;
        const config = coinList.find(coin => coin.tokenAddress === prAddress);
        let BN_Amount = multiplyBigNumbers(amount.toString(), config.decimal)
        const deposit = yield GlobalSmartContractObject.methods.depositWithdrawToken(prAddress, BN_Amount, true).send({
            from: FromAddress[0]
        });
        let network = yield GlobalWeb3Object.eth.net.getNetworkType();
        let etherscanLink = etherscanTx( network, 'Check Status: View Tx status', deposit.transactionHash);
        deposit["etherscanLink"] = etherscanLink;
        yield put({ type: Constants.default.Success.DEPOSIT_TOKEN_SUCCESS, depositedToken: deposit });
    }
    catch(e){
        yield put({ type: Constants.default.Failure.DEPOSIT_TOKEN_FAILURE, e });
    }
}

function* withdrawTokenRequest(params) {
    try {
        const { GlobalWeb3Object, GlobalSmartContractObject } = store.getState().smartContract;
        const FromAddress = yield GlobalWeb3Object.eth.getAccounts();
        const { prAddress, amount } = params.payload;
        const config = coinList.find(coin => coin.tokenAddress === prAddress);
        let BN_Amount = multiplyBigNumbers(amount.toString(), config.decimal)
        const withdrawAmount = yield GlobalSmartContractObject.methods.depositWithdrawToken(prAddress, BN_Amount, false).send({
            from: FromAddress[0]
        });
        let network = yield GlobalWeb3Object.eth.net.getNetworkType();
        let etherscanLink = etherscanTx( network, 'Check Status: View Tx status', withdrawAmount.transactionHash);
        withdrawAmount["etherscanLink"] = etherscanLink;
        yield put({ type: Constants.default.Success.WITHDRAW_TOKEN_SUCCESS, withdrawnAmount: withdrawAmount });
    }
    catch(e){
        yield put({ type: Constants.default.Failure.WITHDRAW_TOKEN_FAILURE, e });
    }
}

function* actionWatcher() {
    yield takeEvery(Constants.default.Requests.PLACE_BUY_ORDER_REQUEST, placeBuyOrder)
    yield takeEvery(Constants.default.Requests.PLACE_SELL_ORDER_REQUEST, placeSellOrder)

    yield takeEvery(Constants.default.Requests.GET_ORDERBOOK_REQUEST, getOrderBook)
    yield takeEvery(Constants.default.Requests.GET_MY_ORDERS_REQUEST, getMyOrders)

    yield takeEvery(Constants.default.Requests.DEPOSIT_ETH_REQUEST, depositEthRequest)
    yield takeEvery(Constants.default.Requests.WITHDRAW_ETH_REQUEST, withdrawEthRequest)

    yield takeEvery(Constants.default.Requests.DEPOSIT_TOKEN_REQUEST, depositTokenRequest)
    yield takeEvery(Constants.default.Requests.WITHDRAW_TOKEN_REQUEST, withdrawTokenRequest)

    yield takeEvery(Constants.default.Requests.GET_BALANCE_REQUEST, getBalance)
    yield takeEvery(Constants.default.Requests.GET_MY_ACCOUNTID_REQUEST, getMyAccountId)

    yield takeEvery(Constants.default.Requests.GET_BESTBID_BESTASK_REQUEST, getBestBidBestAsk)
    yield takeEvery(Constants.default.Requests.GET_DEPOSIT_WITHDRAWL_RECORDS_REQUEST, GetDepositWithdrawlRecords)

    yield takeEvery(Constants.default.Requests.CANCEL_ORDER_REQUEST, cancelOrder)
    yield takeEvery(Constants.default.Requests.CANCEL_ORDERS_REQUEST, cancelOrders)
}

export default function* smartContractSaga() {
    yield all([
        actionWatcher()
    ]);
}
