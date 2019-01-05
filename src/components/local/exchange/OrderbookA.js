import * as React from 'react'
import styled from 'styled-components';

export default class OrderbookA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    // componentDidUpdate(prevProps) {
    //   console.log("Order book in props --> ", this.props.data)
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
        const { BUTTONS } = this.props.languageConfig;
        const { priceA = [], priceB = [], volumeA = [], volumeB = [] } = this.props.data ? this.props.data : [[], [], [], []];
        let _obj = {
            bidOrder: [],
            askOrder: []
        };
        priceA.forEach((o, i) => {
            if(i<10){
                _obj.bidOrder.push({
                    priceA: o,
                    volume: volumeA[i]
                });
                _obj.askOrder.push({
                    priceB: priceB[i],
                    volume: volumeB[i]
                });
            }
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

                                        return item.volume === "0" ? (
                                            <span className="bookrow" key={i} onClick={() => this.handleChangePrice(item.priceA)}>
                                                <div className="CellMyOrders">-</div>
                                                <div className="CellBidPrice CellPrice">-</div>
                                                <div className="CellMyOrders price">-</div>
                                            </span>
                                        ) : (
                                                <span className="bookrow" key={i} onClick={() => this.handleChangePrice(item.priceA)}>
                                                    <div className="CellPublicOrders">{item.volume}</div>
                                                    <div className="CellBidPrice CellPrice">{item.priceA}</div>
                                                    <div className="CellMyOrders price">-</div>
                                                </span>
                                            )
                                    })
                                }
                            </div>
                            <div id="bidRows">
                                {
                                    _obj.askOrder.map((item, i) => {
                                        return item.volume === "0" ? (
                                            <span className="bookrow" key={i} onClick={() => this.handleChangePrice(item.priceB)}>
                                                <div className="CellMyOrders price">-</div>
                                                <div className="CellBidPrice CellPrice">-</div>
                                                <div className="CellMyOrders">-</div>
                                            </span>
                                        ) : (
                                                <span className="bookrow" key={i} onClick={() => this.handleChangePrice(item.priceB)}>
                                                    <div className="CellMyOrders price">-</div>
                                                    <div className="CellBidPrice CellPrice">{item.priceB}</div>
                                                    <div className="CellPublicOrders">{item.volume}</div>
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
      }
  }
`