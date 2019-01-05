import * as React from 'react'
import styled from 'styled-components';
import {addBigNumbers, divideBigNumbers, multiplyBigNumbers} from "../../../utilities/helpers";

export default class OrderbookA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    // componentDidUpdate(prevProps) {
    //   console.log    ("Order book in props --> ", this.props.data)
    //   if (this.props.data !== prevProps.data) {
    //     this.setState({ data: this.props.data });
    //   } else if (this.props.data === prevProps.data){
    //     this.forceUpdate();
    //   }
    // }

    handleChangePrice(val) {
        this.props.handleChangePrice(val);
    }

    render() {
        const {BUTTONS} = this.props.languageConfig;
        const {priceA = [], priceB = [], volumeA = [], volumeB = []} = this.props.data ? this.props.data : [[], [], [], []];
        let bidTotal = "0";
        let askTotal = "0";
        let _obj = {
            bidOrder: [],
            askOrder: []
        };
        priceA.forEach((o, i) => {
            _obj.bidOrder.push({
                priceA: o,
                volume: volumeA[i]
            });
            bidTotal = addBigNumbers(bidTotal, volumeA[i]);
            _obj.askOrder.push({
                priceB: priceB[i],
                volume: volumeB[i]
            });
            askTotal = addBigNumbers(askTotal, volumeB[i])
        })

        const setRowAmount = 15; //amount of show

        return (
            <Book id="moduleOrderBook" className="bookview">
                <div id="orderBookActions" className="buttons-holder">
                    <span
                        id="cancelBids"
                        onClick={() => {
                            //cancel all bid order
                        }}
                    >
                        {BUTTONS.TEXT_BUYS_CANCEL}
                    </span>
                    <span onClick={() => {
                        //cancel all order
                    }}
                    >
                        {BUTTONS.TEXT_ALL_CANCEL}
                    </span>
                    <span
                        id="cancelAsks"
                        onClick={() => {
                            //cancel all ask order
                        }}
                    >
                        {BUTTONS.TEXT_SELLS_CANCEL}
                    </span>

                </div>
                <div id="bookHolder">
                    <div id="book" className="noselect">
                        <div id="bookTable" className="booktable">
                            <div id="askRows">
                                {
                                    _obj.bidOrder.reverse().map((item, i) => {
                                        const bar = `${item.volume / bidTotal * 100}%`;
                                        return item.volume === "0" ? (
                                            <span className="bookrow" key={i}
                                                  onClick={() => this.handleChangePrice(item.priceA)}>
                                                <div className="CellMyOrders">-</div>
                                                <div className="CellBidPrice CellPrice">-</div>
                                                <div className="CellMyOrders price">-</div>
                                            </span>
                                        ) : (
                                            <span className="bookrow" key={i}
                                                  onClick={() => this.handleChangePrice(item.priceA)}>
                                                    <div className="CellPublicOrders">
                                                        <span className="volume">{item.volume}</span>
                                                        <span className="CellAskBar" style={{width: bar}}/>
                                                    </div>
                                                    <div className="CellBidPrice CellPrice">{item.priceA}
                                                        </div>
                                                    <div className="CellMyOrders price">-</div>
                                                </span>
                                        )
                                    })
                                }
                            </div>
                            <div id="bidRows">
                                {
                                    _obj.askOrder.map((item, i) => {
                                        const bar = `${item.volume / askTotal * 100}%`;
                                        return item.volume === "0" ? (
                                            <span className="bookrow" key={i}
                                                  onClick={() => this.handleChangePrice(item.priceB)}>
                                                <div className="CellMyOrders price">-</div>
                                                <div className="CellBidPrice CellPrice">-</div>
                                                <div className="CellMyOrders">-</div>
                                            </span>
                                        ) : (
                                            <span className="bookrow" key={i}
                                                  onClick={() => this.handleChangePrice(item.priceB)}>
                                                    <div className="CellMyOrders price">-</div>
                                                    <div className="CellBidPrice CellPrice">{item.priceB}</div>
                                                    <div className="CellPublicOrders">
                                                        <span className="volume">{item.volume}</span>
                                                        <span className="CellBidBar" style={{width: bar}}/></div>
                                                </span>

                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Book>
        )
    }
}

const Book = styled.div`
    .bookrow {
        height: 35px;
        .CellMyOrders, .CellBidPrice, .CellPublicOrders {
            line-height: 35px;
            position: relative;
            .volume {
                z-index: 2;
                position: relative;
            }
        }
        .CellAskBar {
            background-color: rgb(204, 227, 241);
            background-position: 50% center;
            position: absolute;
            height: 20px;
            top: 9px;
            right: -1px;
            z-index: 1;
        }
        .CellBidBar {
            background-color: rgb(241, 203, 202);
            background-position: 50% center;
            position: absolute;
            height: 20px;
            top: 9px;
            left: -1px;
            z-index: 1;
        }
    }
    `