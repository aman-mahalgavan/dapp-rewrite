import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import TickerA from '../components/local/exchange/TickerA';
import OrderbookA from '../components/local/exchange/OrderbookA';
import OrderentryA from '../components/local/exchange/OrderentryA';
import OpenOrdersA from '../components/local/exchange/OpenOrdersA';
import PrivateTradesA from '../components/local/exchange/PrivateTradesA';
import BalanceA from '../components/local/exchange/BalanceA';
import PublicTradesA from '../components/local/exchange/PublicTradesA';
import InstrumentSelectA from '../components/local/exchange/InstrumentSelectA';
import Actions from '../actions/index';
import { config, filterMarkets } from '../utilities/config';
import { ToastContainer, toast } from 'react-toastify';
import ToastComponent from '../components/global/toastComponent'


class ExchangeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabSelected: 0,
            baseCurrency: null,
            tradeCurrency: null,
            baseName: '',
            tradeName: '',
            price: 0,
            marketsData: []
        };
    }

    componentDidMount() {
        // dispatch Action to get data for Orderbook
        const baseName = filterMarkets().find(data => data.market.productId === 1);
        const defaultTrade = config.trades.find(data => data.productId === 3);
        const tradesForBase = baseName.market.trades.map(x => x.productId);
        const marketDataFromConfig = filterMarkets();
        this.props.getOrderbook(3, 1, 10);
        this.props.getBalance();
        this.changeTabData(1);
        this.props.getMyOrders(3, 1);
        this.props.getMyAccountId();
        this.props.fetchTradeHistory(null, 3, 1);
        // if(this.state.accountID){
        // }
        this.setState((state, props) => {
            return {
                marketsData: marketDataFromConfig,
                baseName: baseName.market.productName,
                tradeName: defaultTrade.productName,
                baseCurrency: baseName.market.productId,
                tradeCurrency: defaultTrade.productId,
            }
        });
    }

    componentDidUpdate(prevProps) {

        if (prevProps.orderBook !== this.props.orderBook) {
            this.setState({ orderBook: this.props.orderBook });
            // this.props.fetchTradeHistory(null, 3, 1);
        }

        if (prevProps.myAccountId !== this.props.myAccountId) {
            console.log("C ", this.props.myAccountId);
            this.props.fetchOrderHistory(this.props.myAccountId, 3, 1);
        }

        if (prevProps.tradeHistory !== this.props.tradeHistory) {
            this.setState({ tradeHistory: this.props.tradeHistory });
        }

        if (prevProps.myOrders !== this.props.myOrders) {
            let _array = [];
            this.props.myOrders.forEach((o, i) => {
                if (+o.prBase === this.state.baseCurrency && +o.prTrade === this.state.tradeCurrency) {
                    _array.push({
                        instrumentPair: o.instrumentPair,
                        prBase: o.prBase,
                        prTrade: o.prTrade,
                        prices: o.prices,
                        qtys: o.qtys,
                        isSell: o.sells,
                        orderID: o.orderID
                    })
                }
            });
            this.setState((state, props) => { return { myOrders: _array } });
        }



        if (prevProps.bestBidBestAsk !== this.props.bestBidBestAsk) {

            this.state.marketsData.forEach(obj => {
                if (obj.market.productId === this.state.baseCurrency) {
                    obj.market.trades.forEach((x, index) => {
                        obj.market.trades[index] = { ...obj.market.trades[index], bestBid: this.props.bestBidBestAsk.bestBidPrice[index], bestAsk: this.props.bestBidBestAsk.bestAskPrice[index] };
                    });
                }
            })
            this.setState({ marketsData: this.state.marketsData })
        }
        if (prevProps.balance !== this.props.balance) {
            const baseObj = filterMarkets().find(data => data.market.productId === this.state.baseCurrency);
            const tradeObj = baseObj.market.trades.find(data => data.productId === this.state.tradeCurrency);
            let selectedTokensBalances = [];
            this.props.balance.forEach(x => {
                if (x.name === baseObj.market.productName) {
                    selectedTokensBalances.push(x);
                }
                if (x.name === tradeObj.productName) {
                    selectedTokensBalances.push(x);
                }
            });

            this.setState({ selectedTokensBalances });
        }
    }

    changeTabData = (base) => {
        this.setState({ baseCurrency: base })
        const baseObj = filterMarkets().find(data => data.market.productId === base);
        const tradesForBase = baseObj.market.trades.map(x => x.productId);
        this.props.getBestBidBestAsk(tradesForBase, [baseObj.market.productId]);
    }

    changeTradeCurrency = (base, trade) => {

        const baseObj = filterMarkets().find(data => data.market.productId === base);
        const tradeObj = baseObj.market.trades.find(data => data.productId === trade);

        this.props.getOrderbook(trade, base, 10);
        this.props.fetchTradeHistory(null, trade, base);
        this.props.fetchOrderHistory(this.props.myAccountId, trade, base);

        const filteredData = this.props.myOrders && this.props.myOrders.filter(obj => {
            return +obj.prBase === base && +obj.prTrade === trade
        });

        let _array = [];
        this.props.myOrders.forEach((o, i) => {
            if (+o.prBase === base && +o.prTrade === trade) {
                _array.push({
                    instrumentPair: o.instrumentPair,
                    prBase: o.prBase,
                    prTrade: o.prTrade,
                    price: o.prices,
                    qty: o.qtys,
                    isSell: o.sells,
                    orderID: o.orderID
                })
            }
        });

        const selectedTokensBalances = [];
        this.props.balance.forEach(x => {
            if (x.name === baseObj.market.productName) {
                selectedTokensBalances.push(x);
            }
            if (x.name === tradeObj.productName) {
                selectedTokensBalances.push(x);
            }
        })

        this.setState({
            baseCurrency: base,
            tradeCurrency: trade,
            baseName: baseObj.market.productName,
            tradeName: tradeObj.productName,
            openOrders: _array,
            selectedTokensBalances,
            myOrders: filteredData
        });

    }

    handleBuySellPrice = (val) => {
        this.setState({ price: val });
    }

    placeBuyOrder = (price, amount) => {
        this.props.placeBuyOrder(price, amount, this.state.baseCurrency, this.state.tradeCurrency);
    }

    placeSellOrder = (price, amount) => {
        this.props.placeSellOrder(price, amount, this.state.baseCurrency, this.state.tradeCurrency);
    }

    cancelOpenOrder = (val) => {
        console.log("object for cancel --> ", val);
        this.props.cancelOrderRequest(val)
    }

    render() {
        const { ORDER_HISTORY, TRADES } = this.props.languageConfig;

        const isMobile = false;
        const list = [
            {
                tabName: "historyTab",
                apTranslate: ORDER_HISTORY["UNFINISHED_ORDER"],
                text: "Open Orders"
            },
            {
                tabName: "tradesTab",
                apTranslate: ORDER_HISTORY["TITLE_TEXT"],
                text: "Order History"
            }
        ];

        return (
            <Exchange id="wrap">
                <ExchangeColumn1>
                    <div id="ticker">
                        <TickerA
                            languageConfig={this.props.languageConfig}
                            baseName={this.state.baseName}
                            tradeName={this.state.tradeName}
                        />
                    </div>
                    <div className="example-grow">
                        <div className="parent">
                            <div className="item">
                                {!isMobile && (
                                    <div className="chart-wrap">
                                        <form className="module-trigger chart-trigger">
                                            <input id="chart-trigger-1" type="radio" name="tabs" defaultChecked />
                                            <label htmlFor="chart-trigger-1" className="price-ch-btn">
                                                Price chart
                                                </label>
                                            <div className="clear" />

                                            <div className="trigger-content">
                                                <div id="chart-trigger-content-1">
                                                    <div>*Chart Area</div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                <div className="quotation">

                                    <OrderbookA
                                        languageConfig={this.props.languageConfig}
                                        data={this.state.orderBook}
                                        handleChangePrice={this.handleBuySellPrice}
                                        
                                    />
                                </div>


                                <div className="orderPanel">
                                    <div className="account-overview">
                                        <BalanceA
                                            languageConfig={this.props.languageConfig}
                                            baseName={this.state.baseName}
                                            tradeName={this.state.tradeName}
                                            balance={this.props.balance}
                                            selectedTokensBalances={this.state.selectedTokensBalances}
                                        />

                                        <div className="order-entry-head">
                                            <form>
                                                <div className="trigger-content">
                                                    <div id="trigger-content-1">

                                                        <div className="order-entry">
                                                            <OrderentryA
                                                                languageConfig={this.props.languageConfig}
                                                                buyOrder={this.placeBuyOrder}
                                                                sellOrder={this.placeSellOrder}
                                                                price={this.state.price}
                                                                baseName={this.state.baseName}
                                                                tradeName={this.state.tradeName}

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>

                                <div className="publicTrades">
                                    <PublicTradesA
                                        languageConfig={this.props.languageConfig}
                                        base={this.state.baseCurrency}
                                        trade={this.state.tradeCurrency}
                                        data={this.state.tradeHistory}
                                        baseName={this.state.baseName}
                                        tradeName={this.state.tradeName}
                                    />
                                </div>

                                <div className="open-order-head">
                                    <div className="tab_list">
                                        <ul>
                                            {
                                                list.map((item, index) => {
                                                    return (
                                                        <li
                                                            key={index}
                                                            className={this.state.tabSelected === index ? "active" : ""}
                                                            data-tab={item.tabName}
                                                            onClick={(e) => {
                                                                this.setState({
                                                                    tabSelected: index
                                                                })
                                                            }}
                                                        >
                                                            {item.text}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="tab_container">
                                        <div
                                            id="historyTab"
                                            className={this.state.tabSelected === 0 ? "tab_cont active" : "tab_cont"}
                                        >
                                            <OpenOrdersA languageConfig={this.props.languageConfig} data={this.state.myOrders} base={this.state.baseCurrency} trade={this.state.tradeCurrency} cancelOrderRequest={ this.cancelOpenOrder}/>
                                        </div>
                                        <div
                                            id="tradesTab"
                                            className={this.state.tabSelected === 1 ? "tab_cont active" : "tab_cont"}
                                        >
                                            <PrivateTradesA languageConfig={this.props.languageConfig} data={this.props.orderHistory} base={this.state.baseCurrency} accountId={this.props.myAccountId} trade={this.state.tradeCurrency} />
                                            {/* <PrivateTradesA languageConfig={this.props.languageConfig} records={this.state.dwRecords} /> */}
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>

                    {
                        isMobile && (
                            <div className="chart-wrap">
                                <form className="module-trigger chart-trigger">
                                    <input id="chart-trigger-1" type="radio" name="tabs" defaultChecked />
                                    <label htmlFor="chart-trigger-1" className="price-ch-btn">Price chart</label>
                                    <div className="clear" />

                                    <div className="trigger-content">
                                        <div id="chart-trigger-content-1" />
                                    </div>
                                </form>
                            </div>
                        )
                    }
                </ExchangeColumn1>
                <ExchangeColumn2>
                    <div id="inst">
                        <InstrumentSelectA
                            handleTradeCurrencyChange={this.changeTradeCurrency}
                            languageConfig={this.props.languageConfig}
                            data={this.state.marketsData}
                            changeTabData={this.changeTabData}
                            baseName={this.state.baseName}
                            tradeName={this.state.tradeName}
                        />

                    </div>
                </ExchangeColumn2>

            </Exchange>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orderBook: state.smartContract.orderBook,
        balance: state.smartContract.balance,
        myOrders: state.smartContract.myOrders,
        bestBidBestAsk: state.smartContract.bestBidBestAsk,
        dwRecords: state.smartContract.depositWithdrawlRecords,
        myAccountId: state.smartContract.accountId,
        tradeHistory: state.main.tradeHistory,
        orderHistory: state.main.orderHistory
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        placeBuyOrder: (x, y, z, k) => dispatch(Actions.smartContract.placeBuyOrderRequest(x, y, z, k)),
        placeSellOrder: (x, y, z, k) => dispatch(Actions.smartContract.placeSellOrderRequest(x, y, z, k)),
        getOrderbook: (x, y, z) => dispatch(Actions.smartContract.getOrderBookRequest(x, y, z)),
        getBalance: () => dispatch(Actions.smartContract.getBalanceRequest()),
        getBestBidBestAsk: (x, y) => dispatch(Actions.smartContract.getBestBidBestAsk(x, y)),
        getMyOrders: (x, y) => dispatch(Actions.smartContract.getMyOrdersRequest(x, y)),
        getDWRecords: (x) => dispatch(Actions.smartContract.getDWRecordsRequest(x)),
        getMyAccountId: () => dispatch(Actions.smartContract.getMyAccountIdRequest()),
        fetchTradeHistory: (x, y, z) => dispatch(Actions.global.fetchTradeHistory(x, y, z)),
        fetchOrderHistory: (x, y, z) => dispatch(Actions.global.fetchOrderHistory(x, y, z)),
        cancelOrderRequest: (x) => dispatch(Actions.smartContract.cancelOrderRequest(x)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExchangeContainer));


const Exchange = styled.div`
    background-color:#f5f5f5;
    display:flex;
    flex-direction:row;
    place-content:stretch space-between;
    justify-content:space-between;
    align-items:stretch;
    width:1260px;
    margin:40px auto;
    padding:40px 0 60px 0;
    min-height:800px;
    @media(max-width : 1024px) {
        width: 100%;
        padding: 1rem 0 2rem 0;
        position:relative;
        flex-direction: column-reverse;
    }
`

const ExchangeColumn1 = styled.div`
    width:67%;
    max-width:67%;
    table {
        border-collapse : collapse;
    }
    .toasty{
        box-shadow: 5px 5px 5px #f00;
    }
    .tab_cont{
        .pull-right, .paging-wrap {
            margin: 14px 0 13px;
            float: none;
            text-align: center;
        }
        .pagi, .paging {
            overflow: hidden;
            float: none;
            display: table;
            margin: 0 auto;
            li {
                display: inline-block !important;
                margin: 0 4px;
                cursor: pointer;
                a {
                    color: #999;
                    font-size: 15px;
                }
                &.active {
                    a {
                        color: #036;
                        font-size: 15px;
                        font-weight: bold;
                    }
                }
            }
        }
    }
    #ticker {
        min-height:79px;
        box-shadow: 2px 2px 4px #dee1e7;
        .ticker-wrapper {
            min-height:79px;
            // border-bottom:2px solid #036;
            > div {
                margin:0;
            }
            .currentCoin {
                display:flex;
                flex-direction:row;
                align-items:center;
                height:100%;
                max-height:100%;
                place-content:center space-between;
                justify-content:space-between;
                background:#fff;
                min-height: 79px;
                .marketInfo {
                    position:relative;
                    margin:0 0 0 12px;
                    min-width:205px;
                    width:20%;
                    line-height:1.2;
                    h3 {
                        color:#1a1a1a;
                        font-size:25px;
                        font-weight:bold;
                        line-height:1.2;
                        padding:0 0 0 15px;
                        margin:-7px 0 0 0;
                        letter-spacing:-2.1px;
                    }
                    h4 {
                        color:#1a1a1a;
                        font-weight:bold;
                        font-size:14px;
                        padding:0 0 0 36px;
                        margin:2px 0 0 0;
                    }
                }
                .currentCurrency {
                    position:relative;
                    min-width:260px;
                    width:35.4%;
                    text-align:right;
                    box-sizing: border-box;
                    display:flex;
                    flex-direction: row;
                    place-content:center flex-end;
                    align-items:center;
                    justify-content: flex-end;
                    line-height:1.2;
                    margin:-5px 25px 0 0;
                    padding:0 0 0 9px;
                    .lastPrice {
                        font-weight:bold;
                        font-size:25px;
                        letter-spacing:-.75px;
                        span {
                            font-size:18px;
                            margin:0 0 0 -1px;
                        }
                    }
                    .currentCurrencyLh {
                        &.KRW {
                            width:100%;
                        }
                    }
                    .currentDayPx {
                        margin:4px 0 0 0;
                        .dayBeforeTxt {
                            display:none;
                        }
                        div {
                            display:inline-block;
                            font-weight:bold;
                            &.cuKrw {
                                position:relative;
                                padding:0 0 0 14px;
                                margin:0 8px 0 0;
                                &::before {
                                    display:block;
                                    content:'';
                                    width:0;
                                    height:0;
                                    position:absolute;
                                    top:58%;
                                    left:0;
                                    border-left:5px solid transparent;
                                    border-right:5px solid transparent;
                                    border-bottom:0;
                                    margin:-4px 0 0 0;
                                }
                            }
                        }
                    }
                }
                .priceToKrw {
                    padding:0 0 12px 0;
                    margin:0 0 0 7px;
                    font-size:14px;
                    color:#666;
                    font-weight:700;
                }
                .priceStatus {
                    width:140px;
                    font-size:14px;
                    font-weight:600;
                    max-width:155px;
                    position:relative;
                    .priceHigh {
                        border-bottom:1px solid #d9d9d9;
                        color:#ff6666;
                    }
                    .priceLow {
                        color:#06c;
                    }
                    .priceStatusRoot {
                        padding:0 14px 0 10px;
                        display:flex;
                        flex-direction:row;
                        place-content:center space-between;
                        justify-content:space-between;
                        align-items:center;
                        height:30px;
                        .dataNumber {
                            text-align:right;
                            font-weight:bold;
                        }
                        .priceToKrw {
                            color:#666;
                            font-size:10px;
                            margin:-2px 0 0 0;
                            letter-spacing:0;
                            padding:0 0 3px 0;
                        }
                        .remark1 {
                            color:#ff6666;
                        }
                        .remark2 {
                            color:#3c92ca;
                        }
                    }
                }
                .volStatus {
                    box-sizing: border-box;
                    width:190px;
                    position:relative;
                    font-size: 13px;
                    font-weight:600;
                    margin:0 18px 0 0;
                    .vol {
                        border-bottom:1px solid #d9d9d9;
                        border-left:1px solid #d9d9d9;
                    }
                    .trade {
                        border-left:1px solid #d9d9d9;
                    }
                    .volStatusRoot {
                        padding-left:10px;
                        display:flex;
                        flex-direction:row;
                        place-content:center space-between;
                        justify-content:space-between;
                        align-items:center;
                        height:30px;
                        .dataNumber {
                            text-align:right;
                        }
                    }
                }
            }
            &.up {
                .lastPrice, .currentDayPx {
                    color:#f33;
                }
                .currentDayPx {
                    .cuKrw {
                        &::before {
                            border-top:8px solid #ea1721;
                            transform:rotate(180deg);
                        }
                    }
                }
            }
            &.down {
                .lastPrice, .currentDayPx {
                    color:#06c;
                }
                .currentDayPx {
                    .cuKrw {
                        &::before {
                            border-top:8px solid #06c;
                        }
                    }
                }
            }
            .CMCInfo {
                width : 100%;
                height : 30px;
                line-height : 30px;
                border-top : 2px solid #036;
                background : #fff;
                ul {
                    list-style : disc;
                    li {
                        float : left;
                        margin-left : 50px;
                        letter-spacing: 0.5px;
                    }
                }
            }
        }
    }
    .example-grow {
        padding:10px 0 0 0;
        .item {
            display:flex;
            flex-flow: row wrap;
            place-content:flex-start space-between;
            justify-content:space-between;
            .chart-wrap {
                width:100%;
                min-height:400px;
                background:#fff;
                box-shadow: 2px 2px 4px #dee1e7;
                //padding:15px 0 0 0;
            }
            .quotation {
                width:47.8%;
                margin:10px 0 0 0;
                box-shadow: 2px 2px 4px #dee1e7;
                background:#fff;
                .emptyOrderBook{height:550px;line-height:550px;text-align:center;}
                .bookrow{
                  min-height: 35px;
                }
                h3 {
                    text-align:center;
                    color:#1a1a1a;
                    font-size:16px;
                    height:38px;
                    line-height:38px;
                    border-bottom:1px solid #d9d9d9;
                    font-weight:bold;
                }
                .buttons-holder {
                    height:40px;
                    display:flex;
                    place-content:stretch space-between;
                    justify-content:space-between;
                    flex-direction:row;
                    border-bottom:2px solid #036;
                    span {
                        height:100%;
                        line-height:40px;
                        width:33.3%;
                        text-align:center;
                        color:#1a1a1a;
                        font-size:16px;
                        cursor: pointer;
                        font-weight: bold;
                    }
                }
                #bookHolder {
                    height:508px;
                    text-align: center;
                    font-weight: bold;
                    font-size : 14px;
                    overflow-y: scroll;
                    &::-webkit-scrollbar-track {
                        background: #efefef;
                        -webkit-border-radius: 10px;
                        border-radius: 10px;
                        -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, .2);
                    }
                    &::-webkit-scrollbar-thumb {
                        height: 50px;
                        width: 50px;
                        background: #003366;
                        -webkit-border-radius: 8px;
                        border-radius: 8px;
                        -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, .1);
                    }
                    &::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                        border: 3px solid #fff;
                    }
                    &::-webkit-scrollbar-button:start:decrement, &::-webkit-scrollbar-button:end:increment {
                        display: block;
                        height: 10px;
                        background: #efefef;
                    }
                    .bookrow {
                        height:36px;
                        cursor: pointer;
                        .price {
                            display:block;
                            height:38px;
                            line-height:38px;
                            &.up {
                                color:#f33;
                            }
                            &.down {
                                color:#06c;
                            }
                            .normal {
                                color:#1a1a1a;
                            }
                        }
                        .priceKrw {
                            display:block;
                            padding:5px 0;
                            line-height: 1;
                            text-align:right;
                            padding-right:25px;
                            &.up {
                                color:#f33;
                            }
                            &.down {
                                color:#06c;
                            }
                            .normal {
                                color:#1a1a1a;
                            }
                        }
                        .krwInfo {
                            font-size:10px;
                            color:#666;
                        }
                    }
                    #askRows {
                        .bookrow {
                            display:flex;
                            flex-direction: row;
                            place-content:stretch space-between;
                            justify-content:space-between;
                            &:nth-child(even) {
                                background:#f7f7f7;
                            }
                            .CellPublicOrders{
                                padding-right:35px;
                                text-align:right;
                                width:33%;
                                overflow:hidden;
                                white-space:nowrap;
                                box-sizing: border-box;
                            }
                            .CellPrice {
                                width:33%;
                                box-sizing: border-box;
                                position: relative;
                                //color:#f33;
                                font-weight:bold;
                                background: rgba(0, 102, 204, 0.1);

                                .bookViewBorder{
                                    width:100%;
                                    height:100%;
                                    position: absolute;
                                    border:2px solid black;
                                    box-sizing: border-box;
                                    z-index: 2;

                                }
                            }
                            .CellMyOrders {
                                width:33%;
                                box-sizing: border-box;
                                position: relative;
                                .open-order-highlight{
                                    float:left;
                                    font-weight:bold;
                                    font-size:12px;
                                }
                                i{
                                   font-size: 18px;
                                    line-height: 32px;
                                    cursor: pointer;
                                    color: rgba(238, 27, 30, .7);
                                    float:right;
                                }
                            }
                        }
                    }
                    #bidRows {
                        .bookrow {
                            display:flex;
                            flex-direction: row;
                            place-content:stretch space-between;
                            justify-content:space-between;
                            &:nth-child(even) {
                                background:#f7f7f7;
                            }
                            .CellPublicOrders {
                                padding-right:35px;
                                text-align:right;
                                width:33%;
                                overflow:hidden;
                                white-space:nowrap;
                                box-sizing: border-box;
                            }
                            .CellPrice {
                                width:33%;
                                box-sizing: border-box;
                                position: relative;
                                //color:#06c;
                                font-weight:bold;
                                background: rgba(255, 51, 51, 0.1);

                                .bookViewBorder{
                                    width:100%;
                                    height:100%;
                                    position: absolute;
                                    border:2px solid black;
                                    box-sizing: border-box;
                                    z-index: 2;

                                }
                            }
                            .CellMyOrders {
                                width:33%;
                                box-sizing: border-box;
                                position: relative;
                                .open-order-highlight{
                                    float:left;
                                    font-weight:bold;
                                    font-size:12px;
                                }
                                i{
                                    font-size: 18px;
                                    line-height: 32px;
                                    cursor: pointer;
                                    color: rgba(238, 27, 30, .7);
                                    float:right;
                                }
                            }
                        }
                    }
                    #bookSpread {
                        height: 0px;
                        box-sizing: border-box;
                        background:#fff;
                        text-align:center;
                        border-top:1px solid #d9d9d9;
                        border-bottom:1px solid #d9d9d9;
                        .krwInfo {
                            color:#666;
                            font-size:12px;
                        }
                    }
                    &.krwOrder {
                        .bookrow {
                            height:30px;
                            min-height:30px;
                            .price {
                                height:30px;
                                line-height:30px;
                            }
                            .CellBidBar, .CellAskBar {
                                top:5px !important;
                            }
                        }
                    }
                }
            }
            .orderPanel {
                width:51%;
                margin:10px 0 0 0;
                height:100%;
                .ap-list {
                    width:100%;
                    background:#fff;
                    box-shadow: 2px 2px 4px #dee1e7;
                    th {
                        height:40px;
                        border-bottom:2px solid #036;
                        font-size:16px;
                        text-align: center;
                    }
                    td {
                        font-size:14px;
                        height:38px;
                        text-align:right;
                        font-weight: bold;
                        &.symbol {
                            text-align: center;
                            padding-right:0;
                        }
                        &.able {
                            padding-right:38px;
                        }
                        &.total {
                            padding-right:25px;
                        }
                    }
                    .first-row {
                        td {
                            border-bottom:1px solid #d9d9d9;
                        }
                    }
                }

                .emptyOrderEntry{
                    height:345px;line-height:345px;margin:11px 0 0 0;text-align:center;background:#fff;
                }

                .order-entry-head {
                    height: 340px;
                    margin:11px 0 0 0;
                    padding:0 0 11px 0;
                    background:#fff;
                    box-shadow: 2px 2px 4px #dee1e7;
                    .d-select {
                        height:39px;
                        display:flex;
                        flex-direction: row;
                        place-content: center space-between;
                        justify-content:space-between;
                        align-items:center;
                        label {
                            width:50%;
                            height:39px;
                            line-height:39px;
                            text-align:center;
                            cursor:pointer;
                            border-bottom:1px solid #d9d9d9;
                            color:#999;
                            font-size:16px;
                            font-weight:bold;
                            &.active {
                                color:#fff;
                                &.buy {
                                    background:#ff6666;
                                }
                                &.sell {
                                    background:#3c92ca;
                                }
                            }
                            &:first-child {
                                border-right:1px solid #d9d9d9;
                            }
                        }
                    }
                    .percent_tab {
                        display:flex;
                        flex-direction: row;
                        place-content: center flex-end;
                        justify-content:flex-end;
                        align-items: center;
                        height:43px;
                        .percent_button {
                            width:48px;
                            height:24px;
                            margin:0 20px 0 0;
                            border-radius:10px;
                            color:#666;
                            font-size:12px;
                            border:0 none;
                            padding:0;
                            cursor: pointer;
                            background:#f2f2f2;
                            font-weight:bold;
                            outline: 0 none;
                            &.active {
                                color:#fff;
                            }
                        }
                        &.buy {
                            .active {
                                background: #ff6666;
                            }
                        }
                        &.sell {
                            .active {
                                background:#3c92ca;
                            }
                        }
                    }
                    .input-data {
                        padding:0 24px;
                        .form-group {
                            display:flex;
                            flex-direction:row;
                            place-content:center space-between;
                            justify-content: space-between;
                            align-items:center;
                            height:40px;
                            margin-bottom:20px;
                            label {
                                width:35%;
                            }
                            .input-group {
                                width:65%;
                                position:relative;
                                display:flex;
                                flex-direction: row;
                                place-content: center flex-end;
                                justify-content: flex-end;
                                align-items:center;
                                border:1px solid #d9d9d9;
                                border-radius: 10px;
                                height:40px;
                                box-sizing: border-box;
                                padding:0 10px;
                                input {
                                    width: 100%;
                                    border:0 none;
                                    height:37px;
                                    padding:0 5px;
                                    text-align: right;
                                    font-size:14px;
                                    color:#999;
                                    font-weight:bold;
                                    outline: 0 none;
                                }
                                .coinSymbol {
                                    font-size:14px;
                                    color:#999;
                                    font-weight:bold;
                                }
                                .orderArrow{
                                    .top_arrow{
                                        height:10px;
                                        width:10px;
                                        background:url('/static/images/icon/top.png') 0 0 no-repeat;
                                        background-size:10px 10px;
                                        cursor : pointer;
                                    }
                                    .bottom_arrow{
                                        height:10px;
                                        width:10px;
                                        background:url('/static/images/icon/bottom.png') 0 0 no-repeat;
                                        background-size:10px 10px;
                                        margin-top :5px;
                                        cursor: pointer;
                                    }
                                }
                                label.error {

                                }
                            }
                        }
                    }
                    .summary-wrap {
                        margin:0 23px;
                        padding:30px 0 ;
                        .min-order-price {
                            display:flex;
                            flex-direction: row;
                            place-content:center space-evenly;
                            justify-content: space-evenly;
                            align-items:center;
                            font-size:12px;
                            color:#666;
                            margin:15px 0;
                            word-spacing: -1px;
                        }
                        .order-price {
                            display:flex;
                            flex-direction: row;
                            place-content:center space-between;
                            justify-content: space-between;
                            align-items:center;
                            font-size:14px;
                            color:#1a1a1a;
                            font-weight:bold;
                            .sub-total-price {
                                color:#036;
                                font-size:18px;
                                font-weight:bold;
                            }
                        }
                        .order-amount {
                            display:flex;
                            flex-direction: row;
                            place-content:center space-between;
                            justify-content: space-between;
                            align-items:center;
                            font-size:14px;
                            color:#1a1a1a;
                            margin:0 0 10px 0;
                        }
                        &.buy {
                            border-top:2px solid #f33;
                        }
                        &.sell {
                            border-top:2px solid #036;
                        }
                    }
                    .button-wrap {
                        //.not-login {
                        //    margin:10px 0 0 0;
                        //    display:flex;
                        //    flex-direction: row;
                        //    place-content: center space-between;
                        //    justify-content: space-between;
                        //    align-items: center;
                        //    height:38px;
                        //    padding:0 24px;
                        //    .modal-btn {
                        //        height:38px;
                        //        line-height:38px;
                        //        display:block;
                        //        text-align:center;
                        //        font-size:14px;
                        //        font-weight:bold;
                        //        &.register-btn {
                        //            width:28%;
                        //            color:#036;
                        //            background:#f2f2f2;
                        //        }
                        //        &.login-btn {
                        //            width:66%;
                        //            color:#fff;
                        //            background:#06c;
                        //        }
                        //    }
                        //}
                        //.loggedin {
                            margin:10px 0 0 0;
                            display:flex;
                            flex-direction: row;
                            place-content: center space-between;
                            justify-content: space-between;
                            align-items: center;
                            height:38px;
                            padding:0 24px;
                            .btn {
                                height:38px;
                                line-height:38px;
                                display:block;
                                text-align:center;
                                font-size:14px;
                                font-weight:bold;
                                padding:0;
                                border-radius: 0;
                                box-shadow:none;
                                border:0 none;
                                cursor: pointer;
                                &.set-default {
                                    width:28%;
                                    color:#036;
                                    background:#f2f2f2;
                                    outline: 0;
                                }
                                &.btn-action {
                                    width:66%;
                                    color:#fff;
                                    &.buy {
                                        background:#ff6666;
                                        opacity: 1;
                                    }
                                    &.sell {
                                        background:#3c92ca;
                                        opacity: 1;
                                    }
                                }
                            }
                        //}
                    }
                }
            }
            .publicTrades {
                width:47.8%;
                background:#fff;
                margin:10px 0 0 0;
                align-self: flex-start;
                box-shadow: 2px 2px 4px #dee1e7;
                h3 {
                  text-align:center;
                  color:#1a1a1a;
                  font-size:16px;
                  height:38px;
                  line-height:38px;
                 
                  font-weight: bold;
                  margin-block-start:unset;
                  margin-block-end:unset;
                }
                .recent-trades-table {
                    width:100%;
                    td{
                         border-bottom:1px solid #d9d9d9;
                    }
                    th {
                        height:40px;
                        text-align:center;
                        color:#1a1a1a;
                        font-size:16px;
                        border-bottom:2px solid #036;
                        width:33.3%;
                        span {
                            font-size:14px;
                            color:#666;
                        }
                    }
                }
                .rowDataWrap {
                    height:405px;
                    overflow-y: scroll;
                    &::-webkit-scrollbar-track {
                        background: #efefef;
                        -webkit-border-radius: 10px;
                        border-radius: 10px;
                        -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, .2);
                    }
                    &::-webkit-scrollbar-thumb {
                        height: 50px;
                        width: 50px;
                        background: #003366;
                        -webkit-border-radius: 8px;
                        border-radius: 8px;
                        -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, .1);
                    }
                    &::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                        border: 3px solid #fff;
                    }
                    &::-webkit-scrollbar-button:start:decrement, &::-webkit-scrollbar-button:end:increment {
                        display: block;
                        height: 10px;
                        background: #efefef;
                    }
                    table {
                        width:100%;
                        max-width:100%;
                        tr {
                            td {
                                height:38px;
                                text-align: right;
                                font-weight: bold;
                                font-size:14px;
                                &.numberData {
                                    padding-right:29px;
                                    font-weight: normal;
                                }
                                &.priceData {
                                    padding-right:25px;
                                }
                                &.timeData {
                                    text-align: center;
                                    font-weight: normal !important;
                                    .time {
                                        color:#666;
                                        font-size:11px;
                                    }
                                }
                            }
                            &:nth-child(even) {
                                td {
                                    background:#f7f7f7;
                                }
                            }
                        }
                    }
                }
            }
            .open-order-head {
                box-shadow: 2px 2px 4px #dee1e7;
                width:51%;
                margin:-40px 0 0 0;
                height:100%;
                background: #fff;
                .tab_cont{
                    display:none;
                }
                .active {
                    display : block;
                }
                .tab_list {
                    height:38px;
                    ul {
                        display:flex;
                        place-content: center space-between;
                        justify-content: space-between;
                        align-items:center;
                        padding: 0;
                        list-style : none;
                        margin: 0;
                        li {
                            width:50%;
                            text-align:center;
                            height:38px;
                            line-height:38px;
                            color:#999;
                            font-size:16px;
                            font-weight: bold;
                            border-bottom:1px solid #d9d9d9;
                            cursor:pointer;
                            &.active {
                                color:#fff;
                                background:#364958;
                            }
                            &.first-child {
                                border-right:1px solid #d9d9d9;
                            }
                        }
                    }
                }
                .tab_container {
                    table {
                        width:100%;
                        .no-data {
                            text-align:center;
                            border-bottom:0 none;
                            height:40px;
                        }
                        th {
                            text-align:center;
                            height:40px;
                            border-bottom:2px solid #036;
                        }
                        td {
                            height:38px;
                            border-bottom:1px solid #d9d9d9;
                            text-align:center;
                            color:#1a1a1a;
                            font-size:13px;
                            font-weight:bold;
                            &.buyFont {
                                color:#f33;
                            }
                            &.sellFont {
                                color:#06c;
                            }
                            &.dataNubmer {
                                text-align:right;
                                padding-right:10px;
                            }
                            &.dataTime {
                                span {
                                    display:block;
                                    &.time {
                                        color:#666;
                                    }
                                }
                            }
                            &.button {
                                padding:6px 0;
                                cursor: pointer;
                                .btn-action {
                                    background:#f2f2f2;
                                    color:#036;
                                    border-radius: 5px;
                                    padding:5px;
                                    font-size:14px;
                                    border:0 none;
                                    &.hover {
                                        color:#fff;
                                        background:#036;
                                    }
                                }
                            }
                        }
                    }
                    .no-data-wrap {
                        display:flex;
                        place-content:center center;
                        justify-content: center;
                        align-items: center;
                        height:38px;
                        text-align:center;
                    }
                }
            }
        }
    }
    @media(max-width: 1024px) {
        width: 100%;
        max-width: 100%;
        .chart-wrap {
            //display: none;
            .module-trigger{
                height:400px;
            }
        }
        #ticker{
            min-height: 5rem;
            box-shadow: 2px 2px 4px #dee1e7;
            .ticker-wrapper {
                min-height: 5rem;
                border-bottom: 0;
                .currentCoin {
                    width: 100%;
                    height: 5rem;
                    min-height: 5rem;
                    .marketInfo {
                        display:none;
                    }
                    .currentCurrency {
                        min-width: 0;
                        margin:0;
                        width:100%;
                        padding:0;
                        place-content: flex-start space-between;
                        align-items:flex-start;
                        justify-content: space-between;
                        text-align:left;
                        .currentCurrencyLh {
                            width:85%;
                            padding:0 0 0 10px;
                            box-sizing:border-box;
                            .lastPrice {
                                font-size: 1.8rem;
                                span {
                                    font-size: 1.4rem;
                                }
                            }
                            &.KRW {
                                padding:0 0 0 8%;
                            }
                            .currentDayPx {
                                .dayBeforeTxt {
                                    display:inline-block;
                                    color:#1a1a1a;
                                    margin:0 5px 0 0;
                                }
                                .cuKrw {
                                    &::before {
                                        top:40%;
                                    }
                                }
                            }
                        }
                        .currentCurrencyRh {
                            width:50%;
                            .priceToKrw {
                                text-align:right;
                                margin:0;
                                padding:5px 10px 0 0;
                                font-size:1.2rem;
                                box-sizing:border-box;
                            }
                        }
                    }
                    .priceStatus, .volStatus {
                        display: none;
                        &.KRW {
                            width:60%;
                            max-width:unset;
                            display:block;
                            padding:0;
                            .priceStatusRoot {
                                height:unset;
                                place-content:center flex-start;
                                justify-content: flex-start;
                                font-size:1.2rem;
                                .remark {
                                    margin:0 10px 0 0;
                                }
                            }
                            .priceHigh {
                                border:0 none;
                                padding-top:5px;
                            }
                        }
                    }
                    .marketInfo {
                        min-width: 0;
                        width: 47%;
                        h3 {
                            padding:2px 0 5px 30px;
                            font-size: 1.2rem;
                        }
                        h4 {
                            font-size: 1rem;
                        }
                    }
                }
                &.normal {
                    .cuKrw {
                        padding:0 !important;
                    }
                }
                 .CMCInfo {
                    height : 2rem;
                    line-height : 2rem;
                    border-top : 2px solid #036;
                    background : #fff;
                    ul {
                        list-style : disc;
                        li {
                            float : left;
                            margin-left : 2rem;
                            letter-spacing: 0.3px;
                        }
                    }
                }
            }
        }
        .example-grow {
            padding : 0;
            .item {
                .quotation {
                    width: 100%;
                    margin:0;
                    padding: 0;
                    border-top:2px solid #036;
                    .emptyOrderBook{height:150px;line-height:150px;font-size:15px;text-align:center;}
                    #bookHolder {
                        height: 15rem;
                        -webkit-overflow-scrolling: touch;
                        &.krwOrder {
                            .bookrow {
                                height:2rem;
                                line-height:2rem;
                                min-height: 2rem;
                                .price {
                                    height:2rem;
                                    line-height:2rem;
                                }
                            }
                        }
                    }
                    .buttons-holder {
                        height: 2rem;
                        span {
                            font-size: 1.1rem;
                            line-height:2rem;
                        }
                    }

                }
                .orderPanel {
                    float:left;
                    width: 100%;
                    margin: 0.5rem 0 0 0;
                    .ap-list {
                        tr {
                            th {
                                height:2rem;
                                font-size: 1.1rem;
                            }
                            td {
                                height:2rem;
                                font-size:1.1rem;
                            }
                        }
                    }
                    .emptyOrderEntry{
                        height:145px;line-height:145px;margin:11px 0 0 0;font-size:15px;text-align:center;background:#fff;
                    }
                    .order-entry-head {
                        margin: 0.5rem 0 0 0;
                        padding: 0 0 0.5rem 0;
                        background: #fff;
                        .pad {
                            height: 2rem !important;
                            .d-select {
                                height: 2rem;
                                label {
                                    height: 2rem;
                                    line-height: 2rem;
                                    font-size: 1.1rem;
                                }
                            }
                        }
                        .input-data {
                            padding: 0 1rem;
                            .form-group {
                                height: 2.5rem;
                                margin-bottom : 0.5rem;
                                .input-group {
                                    width: 55%;
                                    height: 2.5rem;
                                    input {
                                        height: 2.2rem;
                                        width:100%;
                                        font-size: 1.1rem;
                                        padding-bottom: 0.1rem;
                                    }
                                    span {
                                        font-size: 1.1rem !important;
                                    }
                                }
                            }
                        }
                        .summary-wrap {
                            margin: 0 1rem;
                            .order-amount {
                                margin: 0;
                            }
                            .order-price {
                                .summary-item {
                                    font-size: 1.2rem;
                                }
                            }
                            .min-order-price {
                                margin: 0.5rem 0;
                                .summary-item {
                                    font-size: 0.9rem;
                                }
                            }
                        }
                        .button-wrap {
                             height: 3rem !important;;
                            .loggedin {
                                margin: 0;
                                .btn {
                                    height: 2.5rem;
                                    line-height: 2.5rem;
                                }
                            }

                        }
                    }
                }
                .open-order-head {
                    width: 100%;
                    float:left;
                    margin: 0.5rem 0 0 0;
                    .tab_list {
                        height: 2.5rem;
                        ul {
                            li {
                                height:2.5rem;
                                line-height: 2.5rem;
                                font-size: 1.2rem;
                            }
                        }
                    }
                    .tab_container {
                        table {
                            tr {
                                th {
                                    height:2rem;
                                    line-height:2rem;
                                    font-size: 1rem;
                                }
                                td {
                                    height: 2rem;
                                    font-size: 1rem;
                                }
                            }
                        }
                    }
                }
                .publicTrades {
                    width: 100%;
                    float: left;
                    margin: 0.5rem 0 0;
                    .ap-header{display:none;}
                    .recent-trades-table {
                        tr {
                            th {
                                height: 2.5rem;
                                font-size: 1.2rem;
                            }
                        }
                    }
                    .rowDataWrap {
                        height: 16rem;
                        -webkit-overflow-scrolling: touch;
                        table {
                            tr {
                                td {
                                    height: 2.5rem;
                                    font-size: 1.2rem;
                                }
                            }
                        }
                    }
                }
            }
        }

        .chart-wrap{
            margin:1rem 0 0 0;
            border-top:2px solid #036;
        }
    }
`

const ExchangeColumn2 = styled.div`
    width:32.5%;
    max-width:33%;
    .coinsWrap {
        box-shadow: 2px 2px 4px #dee1e7;
        .coinsTab {
            height:38px;
            display:flex;
            flex-direction:row;
            place-content:center space-between;
            justify-content: space-between;
            align-items:center;
            border-bottom:1px solid #d9d9d9;
            button {
                height:38px;
                width:100%;
                background:#fff;
                color:#999;
                font-size:16px;
                border:0 none;
                border-right:1px solid #d9d9d9;
                cursor:pointer;
                font-weight:bold;
                padding:0;
                outline: none;
                &:last-child {
                    border-right:0 none;
                }
                &.active {
                    background:#364958;
                    color:#fff;
                }
            }
        }
        .coinTable {
            width:409px;
            th {
                height:40px;
                border-bottom:2px solid #364958;
                padding: 0;
                color:#1a1a1a;
                font-size:16px;
                text-align:center;
                background:#fff;
                cursor: pointer;
                &:hover {
                    text-decoration: underline;
                }
                img {
                    height: 14px;
                    margin-left: 3px;
                    vertical-align: -2px;
                }
            }
            tbody {
                tr {
                    cursor:pointer;
                    td {
                        height:38px;
                        background-color:#fff;
                        border-bottom:2px solid #f2f2f2;
                        color:#1a1a1a;
                        font-size:14px;
                        padding-top:5px;
                        padding-bottom:5px;
                        &.dataNumber {
                            text-align:right;
                            padding-right:14px;
                            font-size:13px;
                            font-weight:bold;
                            color:#1a1a1a;
                            .coinToKrw {
                                color:#666;
                                font-size:10px;
                            }
                        }
                        &.dataPer {
                            font-weight:normal;
                            padding-right:8px;
                        }
                        &.up {
                            color:#f33;
                        }
                        &.down {
                            color:#06c;
                        }
                        &.coinSymbol {
                            padding-left:26px;
                        }
                        .marketSymbol {
                            font-size:10px;
                            color:#666;
                        }
                        .coinSymbolText {
                            color:#1a1a1a;
                            font-size:13px;
                            font-weight:bold;
                            &.kr {
                                letter-spacing: -1px;
                            }
                        }
                        &.volume {
                            text-align: right;
                            font-size : 12px;
                            padding-right : 9px;
                        }
                    }
                }
            }
        }
    }
    @media(max-width:1024px) {
        //display: none;
        width:100%;
        max-width: 100%;


        .mobileWrapper {
            position:relative;
            .setCoinMarket {
                width:100%;
                height:60px;
                border:0 none;
                background:#fff;
                margin:0 0 10px 0;
                color:#666;
                font-size:1.4rem;
                font-weight: bold;
                outline: none;
                .marketSelector {
                    display:inline-block;
                    padding:0 0 0 26px;
                }
                i {
                    vertical-align: -1px;
                }
            }
            .coinsWrap {
                position:absolute;
                top:70px;
                left:0;
                z-index:9;
                width:100%;
                &.mobile {
                    display:none;
                }
                &.on {
                    display:block;
                }
                .coinTable {
                    width:100%;
                }
            }
            .coinTable {
                tbody {
                    tr {
                        td {
                            &.coinSymbol {
                                padding:0 0 0 33px;
                                background-position: 8px 50% !important;
                            }
                            &.dataNumber {
                                padding-right:8px;
                            }
                        }
                    }
                }
            }
        }
    }
`
