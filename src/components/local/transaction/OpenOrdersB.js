import * as React from 'react'
import styled from 'styled-components';
import ReactTable from 'react-table';
import { transformToTokenName } from '../../../utilities/helpers';

export default class OpenOrdersB extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        }
    }

    cancelOrder = (event, cellInfo) => {
        let dataObject = cellInfo.original;
        console.log("Cancelling Order -> ", dataObject, this.props.data);
        return this.props.cancelOrder(dataObject);
    }

    render() {
        const { TRANSACTION, OPEN_ORDERS } = this.props.languageConfig;
        /* 
            orderID: obj,
            instrumentPair: transformToTokenName(myOrders.prTrade[i]).productName + '/'+ transformToTokenName(myOrders.prBase[i]).productName,
            prices: convertPriceArray(myOrders.prices),
            qtys: convertVolumeArray(myOrders.qtys, transformToTokenName(myOrders.prTrade[i]).decimal),
            sells: myOrders.sells[i]
        */
        console.log("DATA IN aaaprivate trades --> ", this.props.data)
        return this.state.isLogin ? (
            <OpenOrder>
                <div className="table table-hover">
                    <ReactTable
                        data={this.props.data}
                        columns={[
                            {
                                Header: OPEN_ORDERS.INSTRUMENT_TEXT,
                                id: OPEN_ORDERS.INSTRUMENT_TEXT,
                                class: "headerW",
                                accessor: "instrumentPair"
                            },
                            {
                                Header: OPEN_ORDERS.TYPE_TEXT,
                                id: OPEN_ORDERS.TYPE_TEXT,
                                class: "headerW",
                                accessor: (d) => d.sells ? OPEN_ORDERS.SELL : OPEN_ORDERS.BUY
                            }, {
                                Header: OPEN_ORDERS.PRICE_TEXT,
                                id: OPEN_ORDERS.PRICE_TEXT,
                                class: "headerW",
                                accessor: "prices"
                            }, {
                                Header: OPEN_ORDERS.TOTAL_TEXT,
                                id: OPEN_ORDERS.TOTAL_TEXT,
                                class: "headerW",
                                accessor: "qtys"
                            },
                            //  {
                            //     Header: OPEN_ORDERS.REMAINING_TEXT,
                            //     id: OPEN_ORDERS.REMAINING_TEXT,
                            //     class: "headerW",
                            //     accessor: OPEN_ORDERS.REMAINING_TEXT
                            // }, {
                            //     Header: OPEN_ORDERS.TIME_TEXT,
                            //     id: OPEN_ORDERS.TIME_TEXT,
                            //     class: "headerW",
                            //     accessor: OPEN_ORDERS.TIME_TEXT
                            // }, 
                            {
                                Header: OPEN_ORDERS.CANCEL,
                                id: OPEN_ORDERS.CANCEL,
                                class: "headerW",
                                Cell: (cellInfo) => <button onClick={(e) => this.cancelOrder(e, cellInfo)} type="button">Cancel Order</button>
                            },

                        ]}
                        defaultPageSize={10}
                        className="-striped -highlight"
                    />

                </div>
            </OpenOrder>
        ) : <div className="no-data-wrap"><p>{TRANSACTION.LOGIN_REQUIRED}</p></div>;
    }
}

const OpenOrder = styled.div`
  
`
