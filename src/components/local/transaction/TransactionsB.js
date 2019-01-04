import * as React from 'react'
import styled from 'styled-components';
import ReactTable from 'react-table';
import { divideBigNumbers, transformToTokenName } from '../../../utilities/helpers';
import { config } from '../../../utilities/config';

export default class TransactionsB extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.dwRecords !== this.props.dwRecords){
            this.setState({data: this.props.dwRecords});
            console.log("**********************************************");
            console.log(this.props.dwRecords);
            console.log("**********************************************");
        }
    }

    constructTime = (timestamp) => {
        let dateString = new Date(timestamp * 1000);
        return dateString.getMonth()+1 + "." + dateString.getDate() + "/" + dateString.getHours() + "." + dateString.getMinutes();
      }

    render() {
        const {TRANSACTION, OPEN_ORDERS, TRADES} = this.props.languageConfig;

        return this.state.isLogin ? (
          <Transaction>
            <div className="table table-hover">
              <ReactTable
                data={this.state.data}
                columns={[
                        {
                            Header: OPEN_ORDERS.INSTRUMENT_TEXT,
                            id: OPEN_ORDERS.INSTRUMENT_TEXT,
                            class: "headerW",
                            accessor: d => transformToTokenName(+d.prCode).productName
                        },
                        {
                            Header: OPEN_ORDERS.TYPE_TEXT,
                            id: OPEN_ORDERS.TYPE_TEXT,
                            class: "headerW",
                            accessor: (d) => d.isDeposit ? OPEN_ORDERS.DEPOSIT : OPEN_ORDERS.WITHDRAW
                        },{
                            Header: TRADES.QUANTITY_TEXT,
                            id: TRADES.QUANTITY_TEXT,
                            class: "headerW",
                            accessor:"qtys"
                        },
                        // {
                        //     Header: OPEN_ORDERS.PRICE_TEXT,
                        //     id: OPEN_ORDERS.PRICE_TEXT,
                        //     class: "headerW",
                        //     accessor: "price"
                        // },{
                        //     Header: OPEN_ORDERS.REMAINING_TEXT,
                        //     id: OPEN_ORDERS.REMAINING_TEXT,
                        //     class: "headerW",
                        //     accessor: OPEN_ORDERS.REMAINING_TEXT
                        // },
                        {
                            Header: OPEN_ORDERS.TIME_TEXT,
                            id: OPEN_ORDERS.TIME_TEXT,
                            class: "headerW",
                            accessor: d => this.constructTime(+d.timestamp)
                        },
                        // {
                        //     Header: OPEN_ORDERS.CANCEL,
                        //     id: OPEN_ORDERS.CANCEL,
                        //     class: "headerW",
                        //     accessor: d => <button>Cancel</button>
                        // },

                    ]}
                defaultPageSize={10}
                className="-striped -highlight"
              />

            </div>
          </Transaction>
        ) : <div className="no-data-wrap"><p>{TRANSACTION.LOGIN_REQUIRED}</p></div>;
    }
}

const Transaction = styled.div`
  
`
