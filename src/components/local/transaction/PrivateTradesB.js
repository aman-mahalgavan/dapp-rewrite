import * as React from 'react'
import styled from 'styled-components';
import ReactTable from 'react-table';
import { divideBigNumbers, transformToTokenName } from '../../../utilities/helpers';
import { config } from '../../../utilities/config';

export default class PrivateTradesB extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        }
    }

    constructTime = (timestamp) => {
        let dateString = new Date(timestamp * 1000);
        return dateString.getMonth()+1 + "." + dateString.getDate() + "/" + dateString.getHours() + "." + dateString.getMinutes();
      }

    render() {
        const {TRANSACTION, TRADES} = this.props.languageConfig;
        console.log("DATA IN private trades --> ", this.props.data)
        return this.state.isLogin ? (
          <PrivateOrder>
            <div className="table table-hover">
              <ReactTable
                data={this.props.data}
                columns={[
                        {
                            Header: TRADES.INSTRUMENT_TEXT,
                            id: TRADES.INSTRUMENT_TEXT,
                            class: "headerW",
                            accessor: "instruement"
                        },
                        {
                            Header: TRADES.SIDE_TEXT,
                            id: TRADES.SIDE_TEXT,
                            class: "headerW",
                            accessor: d=>d.side === "BUY" && TRADES.BUY || d.side === "SELL" && TRADES.SELL
                        },{
                            Header: TRADES.QUANTITY_TEXT,
                            id: TRADES.QUANTITY_TEXT,
                            class: "headerW",
                            accessor: d => d.qty
                        },{
                            Header: TRADES.PRICE_TEXT,
                            id: TRADES.PRICE_TEXT,
                            class: "headerW",
                            accessor: d => divideBigNumbers(d.price, config.basePrice)
                        },
                        // {
                        //     Header: TRADES.TOTAL_TEXT,
                        //     id: TRADES.TOTAL_TEXT,
                        //     class: "headerW",
                        //     accessor: TRADES.TOTAL_TEXT
                        // },{
                        //     Header: TRADES.FEE_TEXT,
                        //     id: TRADES.FEE_TEXT,
                        //     class: "headerW",
                        //     accessor: TRADES.FEE_TEXT
                        // },
                        {
                            Header: TRADES.TIME_TEXT,
                            id: TRADES.TIME_TEXT,
                            class: "headerW",
                            accessor: d => this.constructTime(+d.timestamp)
                        },
                        // {
                        //     Header: TRADES.STATUS,
                        //     id: TRADES.STATUS,
                        //     class: "headerW",
                        //     accessor: "status"
                        // },

                    ]}
                defaultPageSize={10}
                className="-striped -highlight"
              />

            </div>
          </PrivateOrder>
        ) : <div className="no-data-wrap"><p>{TRANSACTION.LOGIN_REQUIRED}</p></div>;
    }
}

const PrivateOrder = styled.div`

`
