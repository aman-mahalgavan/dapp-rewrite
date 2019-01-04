import * as React from 'react'
import styled from 'styled-components';
import { divideBigNumbers, transformToTokenName } from "../../../utilities/helpers";
import { config } from "../../../utilities/config";

export default class PublicTradesA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page : 0
        }

    }

    componentDidUpdate(prevProps){
      if(prevProps.data !== this.props.data){
        console.log("Public Trades == > ", this.props.data)
        this.setState({data: this.props.data})
      }
    }
    

    gotoPage = (page) => this.setState({ page });

    constructTime = (timestamp) => {
      let dateString = new Date(timestamp * 1000);
      return dateString.getMonth()+1 + "." + dateString.getDate() + "/" + dateString.getHours() + "." + dateString.getMinutes();
    }

    render() {
        const {PUBLIC_TRADES} = this.props.languageConfig;
        return (
          <Public>
            <table className="table table-hover minFont recent-trades-table">
              <thead>
                <tr>
                  <th>{PUBLIC_TRADES.TIME_TEXT}</th>
                  <th dangerouslySetInnerHTML={{__html: `${PUBLIC_TRADES.PRICE_TEXT}<span>(${this.props.baseName})</span>`}} />
                  <th dangerouslySetInnerHTML={{__html: `${PUBLIC_TRADES.SIZE}<span>(${this.props.tradeName})</span>`}} />
                </tr>

              </thead>
            </table>
            <div className="rowDataWrap">
              <table>
                <colgroup>
                  <col width="33%" />
                  <col width="33%" />
                  <col width="33%" />
                </colgroup>
                <tbody>
                  {this.state.data && this.state.data.map( (o, i) => {
                    return (<tr key={i}>
                      <td className="timeData">{this.constructTime(o.timeStamp)}</td>
                      <td className="priceData">{divideBigNumbers(o.price, config.basePrice)}</td>
                      <td className="numberData">{divideBigNumbers(o.qty, transformToTokenName(this.props.trade).decimal)}</td>
                    </tr>)
                  })}
                </tbody>
              </table>
            </div>
          </Public>
        )
    }
}

const Public = styled.div`

`
