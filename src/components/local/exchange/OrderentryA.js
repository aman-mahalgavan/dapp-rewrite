import * as React from 'react'
import styled from 'styled-components';
import numeral from 'numeral';
import {divideBigNumbers} from "../../../utilities/helpers";

export default class OrderentryA extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      buy: true,
      amount: 0,
      amountString: '',
      price: 0,
      priceString: '',
      total: 0,
      percentBtn: -1,
    }
  }


  percentActive(ref) {
    const {balance} = this.props;

    if(this.state.buy){
      if(this.state.price == 0){
            return;
        }
      const newAmount = divideBigNumbers(divideBigNumbers(balance[0].available, this.state.price),ref);
      this.setState({
          amount : newAmount,
          total : +newAmount * +this.state.price
      })
    } else {
        const newAmount =divideBigNumbers(balance[1].available, ref);
        this.setState({
            amount : newAmount,
            total : +newAmount * +this.state.price
        })
    }
  }


  setPriceAmount(type) {
    const priceAmount = 1; // When click the price in/decrease arrow, the price is moving by this number
    const currentPrice = this.state.price;
    const decimal = 2; // Decimal expression digits

    if (type === 'up') {
      const price = parseFloat((currentPrice + priceAmount).toFixed(8));
      // const value = (price.toFixed(decimal)).replace(/,/g, '').split('.');
      // const float = value.length > 1 ? (`.${value[1]}`) : '';
      this.setState({
        price,
        // priceString: numeral(value[0]).format() + float,
        total: price * this.state.amount,
      });
    } else {
      const price = currentPrice < priceAmount ? 0 : parseFloat((currentPrice - priceAmount).toFixed(8));
      // const value = (price.toFixed(decimal)).replace(/,/g, '').split('.');
      // const float = value.length > 1 ? (`.${value[1]}`) : '';
      this.setState({
        price,
        // priceString: numeral(value[0]).format() + float,
        total: price * this.state.amount,
      });
    }
  }

  changePrice = (e) => {
    const total = e.target.value * this.state.amount;
    this.setState({ price: e.target.value, total })
  };

  changeMode = buy => {
    this.setState({ buy });
  }

  changeAmount = e => {
    const total = this.state.price * e.target.value;
    this.setState({ amount: e.target.value, total })
  };

  componentDidUpdate(prevProps) {
    if (prevProps.price !== this.props.price) {
      console.log("Changing Price ------>>>> ", prevProps.price, this.props.price);
      this.setState({ price: this.props.price });
    }
  }


  render() {
    const { TRADES, BUY_SELL_ADV, BUY_SELL_MODAL } = this.props.languageConfig;
    const tabs2 = (
      <div className="d-select">
        <label
          htmlFor="select1"
          onClick={() => {
            this.changeMode(true);
            this.setState({
              percentBtn: -1,
            });
          }}
          className={this.state.buy ? 'buy active' : ''}
        >
          {BUY_SELL_MODAL.BUY}
        </label>

        <label
          onClick={() => {
            this.changeMode(false);
            this.setState({
              percentBtn: -1,
            });
          }}
          htmlFor="select2"
          className={this.state.buy ? '' : 'sell active'}
        >
          {BUY_SELL_MODAL.SELL}
        </label>
        <span className="greyLine" />
      </div>
    );
    const percentButton = [
      {
        ref: "10",
        text: '10%',
      },
      {
        ref: "4",
        text: '25%',
      },
      {
        ref: "2",
        text: '50%',
      },
      {
        ref: "1",
        text: '100%',
      },
    ];
    return (
      <Entry>
        <div className="rowclearfix">
          <div
            className="pad"
            style={{
              width: '100%',
              height: '40px',
            }}
          >
            {tabs2}
          </div>
        </div>
        <div className={this.state.buy ? 'percent_tab buy' : 'percent_tab sell'}>
          {
            percentButton.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  this.percentActive(item.ref);
                  this.setState({
                    percentBtn: index,
                  });
                }}
                className={this.state.percentBtn === index ? 'percent_button active' : 'percent_button'}
              >
                {item.text}
              </button>
            ))
          }
        </div>

        <div className="clearfix pad-y input-data">
          <div className="form-group">
            <label>
              {this.state.buy
                ? BUY_SELL_MODAL.BUY_AMNT
                : BUY_SELL_MODAL.SELL_AMNT
              }
              {' '}
              (
                  {this.props.tradeName}
              )
                </label>
            <div className="input-group">
              <input
                type="text"
                value={this.state.amount === 0 ? '' : this.state.amount}
                placeholder="0"
                onChange={this.changeAmount}
                className="form-control"
              />
              <span className="coinSymbol">{this.props.tradeName}</span>
            </div>
          </div>
          <div className="form-group">
            <label>
              {BUY_SELL_MODAL.VALUE}
              {' '}
              (
                  {this.props.baseName}
              )
                </label>
            <div className="input-group">
              <input
                type="text"
                value={this.state.price === 0 ? '' : this.state.price}
                placeholder="0"
                onChange={this.changePrice}
                className="form-control"
              />
              <span className="coinSymbol" />
              <div className="orderArrow">
                {/* <div className="top_arrow" onClick={() => this.setPriceAmount("up")} />
                <div className="bottom_arrow" onClick={() => this.setPriceAmount("down")} /> */}
              </div>
            </div>
          </div>
        </div>
        <div className={this.state.buy ? 'summary-wrap buy' : 'summary-wrap sell'}>
          {
            <div className="order-price">
              <div
                className="summary-item"
              >
                {BUY_SELL_ADV.ORDER_TOTAL}
                {' '}
                :
                  </div>
              <div className="order-price-total">
                <span
                  className="sub-total-price"
                >
                  {isNaN(numeral(this.state.total).format('0')) ? this.state.total.toFixed(8) : numeral(this.state.total).format('0,0.[00000000]')}
                </span>
                {' '}
                {this.props.baseName}
              </div>
            </div>
          }

        </div>
        <div className="button-wrap pad">
          <CancelButton className="btn set-default" type="button" onClick={() => console.log("Cancelled. Clear the Form now.")}>{BUY_SELL_MODAL.SET_DEFAULT}</CancelButton>
          {this.state.buy ?
            <Button className="btn btn-action buy" type="button" onClick={(e) => this.props.buyOrder(this.state.price, this.state.amount)}>{BUY_SELL_MODAL.BUY}</Button> :
            <Button className="btn btn-action sell" type="button" onClick={(e) => this.props.sellOrder(this.state.price, this.state.amount)}>{BUY_SELL_MODAL.SELL}</Button>}

        </div>
      </Entry>
    )
  }
}

const Entry = styled.div`
  
`
const Button = styled.button`
    width: 45%;
    background-color: red;
    color: white;
    padding: 10px 0px;
    font-size: 14px;
`

const CancelButton = styled.button`
    width: 45%;
    padding: 10px 0px;
    font-size: 14px;
`