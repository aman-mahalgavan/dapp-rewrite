import * as React from 'react'
import styled from 'styled-components';
import BAT from "../../../assets/images/icon/bat.png";
import LNC from "../../../assets/images/icon/lnc.png";
import ETH from "../../../assets/images/icon/eth.png";
import OMG from "../../../assets/images/icon/omg.png";
import VIKKY from "../../../assets/images/icon/vikky.png";
import BTCB from "../../../assets/images/icon/btcb.png";
import NDI from "../../../assets/images/icon/vote1.png";
import VAT from "../../../assets/images/icon/cymt.png";
import BNB from "../../../assets/images/icon/bnb.png";
import ICON from "../../../assets/images/icon/icon.png";
import TUSD from "../../../assets/images/icon/tusd.png";
import VIEN from "../../../assets/images/icon/wab.png";

export default class TickerA extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        const {EXCHANGE, EXCHANGE_PAGE, INSTRUMENTS} = this.props.languageConfig;
        return (
          <Ticker className="ticker-wrapper down">
            <div className="currentCoin">
              <div className="marketInfo">
                <h3
                  style={{
                                // background: '25x25size symbol url' 0 1px no-repeat`,
                                fontSize: '25px'
                            }}
                >
                    {
                        this.props.tradeName === "BAT" &&
                        <div className='coin_img'><img src={BAT}/></div>
                    }
                    {
                        this.props.tradeName === "LNC" &&
                        <div className='coin_img'><img src={LNC}/></div>
                    }
                    {
                        this.props.tradeName === "ETH" &&
                        <div className='coin_img'><img src={ETH}/></div>
                    }
                    {
                        this.props.tradeName === "OMG" &&
                        <div className='coin_img'><img src={OMG}/></div>
                    }
                    {
                        this.props.tradeName === "VIKKY" &&
                        <div className='coin_img'><img src={VIKKY}/></div>
                    }
                    {
                        this.props.tradeName === "BTCB" &&
                        <div className='coin_img'><img src={BTCB}/></div>
                    }
                    {
                        this.props.tradeName === "NDI" &&
                        <div className='coin_img'><img src={NDI}/></div>
                    }
                    {
                        this.props.tradeName === "VAT" &&
                        <div className='coin_img'><img src={VAT}/></div>
                    }
                    {
                        this.props.tradeName === "BNB" &&
                        <div className='coin_img'><img src={BNB}/></div>
                    }
                    {
                        this.props.tradeName === "ICON" &&
                        <div className='coin_img'><img src={ICON}/></div>
                    }
                    {
                        this.props.tradeName === "TUSD" &&
                        <div className='coin_img'><img src={TUSD}/></div>
                    }
                    {
                        this.props.tradeName === "VIEN" &&
                        <div className='coin_img'><img src={VIEN}/></div>
                    }
                  <div>{this.props.tradeName}</div>
                </h3>
                <h4>
                  {this.props.tradeName}
/
                  {this.props.baseName}
                </h4>
              </div>

              <div className="currentCurrency">
                <div className='currentCurrencyLh'>
                  <div className="lastPrice">-
                    <span>{this.props.baseName}</span>
                  </div>
                  <div className="currentDayPx">
                    <p className="dayBeforeTxt">{EXCHANGE_PAGE.CURRENT_DAY_PX_CHANGE}</p>
                    <div
                      className="cuKrw"
                    >
0
                    </div>
                    <div className="cuPer">0</div>
                  </div>
                </div>
                <div className="currentCurrencyRh">
                  <div className="priceToKrw">0</div>
                </div>
              </div>
              <div className='priceStatus'>
                <div className="priceHigh priceStatusRoot">
                  <p className="remark">{EXCHANGE_PAGE.HIGH}</p>
                  <div className="dataNumber">
                                -

                    <p className="priceToKrw">-</p>
                  </div>
                </div>
                <div className="priceLow priceStatusRoot">
                  <p className="remark">{EXCHANGE_PAGE.LOW}</p>
                  <div className="dataNumber">
                                -

                    <p className="priceToKrw">-</p>
                  </div>
                </div>
              </div>

              <div className="volStatus">
                <div className="vol volStatusRoot">
                  <span>{EXCHANGE_PAGE.VOLUME}</span>
                  <span
                    className="dataNumber"
                  >
0 
                    {' '}
                    {this.props.tradeName}
                  </span>
                </div>
                <div className="trade volStatusRoot">
                  <span>{INSTRUMENTS.COIN_VOLUME}</span>
                  <span
                    className="dataNumber"
                  >
0 
                    {' '}
                    {this.props.baseName}
                  </span>
                </div>
              </div>
            </div>
          </Ticker>
        )
    }
}

const Ticker = styled.div`
   .coin_img{
        float:left;
        margin:auto 14px auto -14px;
        img{
            width:125%;
        }
   }
`
