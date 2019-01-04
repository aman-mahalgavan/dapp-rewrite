import * as React from 'react'
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import updown_1 from "../../../assets/images/updown_1.png";
import updown_2 from "../../../assets/images/updown_2.png";
import updown_3 from "../../../assets/images/updown_3.png";
import ETH from "../../../assets/images/icon/eth.png";
import LNC from "../../../assets/images/icon/lnc.png";
import BAT from "../../../assets/images/icon/bat.png";
import OMG from "../../../assets/images/icon/omg.png";
import VIKKY from "../../../assets/images/icon/vikky.png";
import BTCB from "../../../assets/images/icon/btcb.png";
import NDI from "../../../assets/images/icon/vote1.png";
import VAT from "../../../assets/images/icon/cymt.png";
import BNB from "../../../assets/images/icon/bnb.png";
import ICON from "../../../assets/images/icon/icon.png";
import TUSD from "../../../assets/images/icon/tusd.png";
import VIEN from "../../../assets/images/icon/wab.png";


export default class InstrumentSelectA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMobile,
            sortType: 'up-char',
            activeTabData: [],
            activeBaseToken: null,
            activeTab: 0,
        }
    }


    onViewMarketList() {
        document.querySelector('#mobileInst').classList.toggle('on');
    }

    selectImage(type) { //get Image by sortType
        const sortType = this.state.sortType;
        if (sortType.indexOf(type) < 0) {
            return updown_1;
        } else if (sortType.indexOf('up') > -1) {
            return updown_2;
        }
        return updown_3;
    }

    selectSort(type) { //sortType change
        if (this.state.sortType === `up-${type}`) {
            this.setState({ sortType: `down-${type}` });
        } else {
            this.setState({ sortType: `up-${type}` });
        }
    }

    doSort(type, coin) {
        if (!coin) {
            return [];
        }

        if (type === 'up-char') {
            return coin.sort((a, b) => {
                const aChar = a.productName.substring(0, 1);
                const bChar = b.productName.substring(0, 1);
                if (aChar < bChar) return -1;
                if (aChar > bChar) return 1;
                return 0;
            });
        } else if (type === 'down-char') {
            return coin.sort((a, b) => {
                const aChar = a.productName.substring(0, 1);
                const bChar = b.productName.substring(0, 1);
                if (aChar < bChar) return 1;
                if (aChar > bChar) return -1;
                return 0;
            });
        }
        return [];
    }

    componentDidMount() {
        console.log("Data from HOC ----> ", this.props.data);
        // let tradeData = this.props.data && this.props.data.length > 0 ? this.props.data[0].market.trades : [];
        this.setState(function (state, props) {
            return {
                initialData: props.data,
                activeTabData: props.data[0].market.trades,
                activeBaseToken: props.data[0].market.productId
            }
        });

        // this.props.handleTradeCurrencyChange(this.props.data[0].market.productId, tradeData[0].productId)
        // this.props.handleTradeCurrencyChange(this.props.data[0].market.productId, tradeData[0].productId)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            console.log("Data on Component Update --> ", this.props.data);
        }
    }

    makeData(arr) {
        const parsedArr = arr.map(data => {
            return {
                coinName: arr.product,
                price: 0,
                percent: "0",
                volume: 0,
            };
        })
        return parsedArr;
    }


    render() {
        const { INSTRUMENTS } = this.props.languageConfig;
        return (
            <Selector className="mobileWrapper">
                {this.state.isMobile ?
                    (
                        <button className="setCoinMarket" onClick={this.onViewMarketList}>
                            <span className="marketSelector" />
                            <i className="xi-caret-down" />
                        </button>
                    )
                    : ''}
                <div id="mobileInst" className={this.state.isMobile ? 'coinsWrap mobile' : 'coinsWrap'}>
                    <div className="coinsTab">
                        {this.props.data.map((obj, idx) => {
                            return (
                                <button
                                    key={idx}
                                    className={this.state.activeTab === idx ? "active" : ""}
                                    onClick={() => {
                                        console.log("Active tab data ==> ", this.props.data[idx])
                                        this.props.changeTabData(obj.market.productId);
                                        this.setState({
                                            activeTabData: this.props.data[idx].market.trades,
                                            activeBaseToken: obj.market.productId,
                                            activeTab: idx
                                        })
                                    }}
                                >
                                    {obj.market.productName}
                                </button>
                            )
                        })}
                    </div>
                    <table className="coinTable">
                        <thead>
                            <tr>
                                <th
                                    width="34%"
                                    onClick={() => {
                                        this.selectSort('char');
                                    }}
                                >
                                    {INSTRUMENTS.COIN_NAME}
                                    <img alt=""
                                        src={this.selectImage('char')}
                                    />
                                </th>
                                <th
                                    width="33%"
                                    onClick={() => {
                                        this.selectSort('ask');
                                    }}
                                >
                                    {INSTRUMENTS.BEST_ASK}
                                    <img alt=""
                                        src={this.selectImage('price')}
                                    />
                                </th>
                                <th
                                    width="33%"
                                    onClick={() => {
                                        this.selectSort('bid');
                                    }}
                                >
                                    {INSTRUMENTS.BEST_BID}
                                    <img alt=""
                                        src={this.selectImage('percent')}
                                    />
                                </th>

                            </tr>

                        </thead>
                        <tbody>
                            {this.state.activeTabData.map( (obj, i) => {
                                return (
                                <tr
                                    key={i}
                                    // onClick={() => this.props.handleTradeCurrencyChange(this.state.activeBaseToken, obj.productId)}
                                    onClick={() => this.props.handleTradeCurrencyChange(this.state.activeBaseToken, obj.productId)}
                                    className="instrument-*coinSymbol"
                                    style={{border: "none", fontWeight: "bold", display: "table-row"}}
                                >
                                    <td className="coinSymbol">
                                        {
                                            obj.productName === "BAT" &&
                                            <img src={BAT}/>
                                        }
                                        {
                                            obj.productName === "OMG" &&
                                            <img src={OMG}/>
                                        }
                                        {
                                            obj.productName === "VIKKY" &&
                                            <img src={VIKKY}/>
                                        }
                                        {
                                            obj.productName === "BTCB" &&
                                            <img src={BTCB}/>
                                        }
                                        {
                                            obj.productName === "NDI" &&
                                            <img src={NDI}/>
                                        }
                                        {
                                            obj.productName === "VAT" &&
                                            <img src={VAT}/>
                                        }
                                        {
                                            obj.productName === "BNB" &&
                                            <img src={BNB}/>
                                        }
                                        {
                                            obj.productName === "ICON" &&
                                            <img src={ICON}/>
                                        }
                                    {obj.productName}
                                    <span className='ETC'>{obj.productName}/{this.props.baseName}</span>
                                    </td>
                                    <td className="up dataNumber">{obj.bestBid}</td>
                                    <td className="up dataNumber">{obj.bestAsk}</td>
                                </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div>
            </Selector>
        )
    }
}




// import * as React from 'react'
// import styled from 'styled-components';
// export default class InstrumentSelectA extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {isMobile: false}
//     }

//     componentDidMount() {
//         console.log("Data Coming from HOC ---> ", this.props)
//         this.setState( (state, props) => {
//             return {tabData: props.data[0].market.trades}
//         }) 
//         console.log("Data Coming from HOC ---> ", this.props.data[0].market.productName)
//     }

//     render() {
//         let timer = null;
//         const { INSTRUMENTS } = this.props.languageConfig;
//         return (
//             <Selector className="mobileWrapper">
//             {this.state.isMobile ? 
//                 (
//                 <button className="setCoinMarket" onClick={this.onViewMarketList}>
//                     <span className="marketSelector" />
//                     <i className="xi-caret-down" />
//                 </button>
//                 )
//                 : ''}
//             <div id="mobileInst" className={this.state.isMobile ? 'coinsWrap mobile' : 'coinsWrap'}>
//               <div className="coinsTab">
//                 {this.props.data.map((obj, idx) => {
//                             return (
//                               <button
//                                 key={obj.market.productName}
//                                 className={this.state.activeTab === idx ? "active" : ""}
//                                 onClick={() => {
//                                             this.setState({
//                                                 activeTabData: obj.market.trades,
//                                                 activeBaseToken: obj.market.productId,
//                                                 activeTab: idx
//                                             })
//                                         }}
//                               >
//                                 {obj.market.productName}
//                               </button>
//                             )
//                         })}
//               </div>
//               <table className="coinTable">
//                 <thead>
//                   <tr>
//                     <th
//                       width="34%"
//                     //   onClick={() => {
//                     //             this.selectSort('char');
//                     //         }}
//                     >
//                       {INSTRUMENTS.COIN_NAME}
//                       {/* <img
//                         src={this.selectImage('char')}
//                       /> */}
//                     </th>
//                     <th
//                       width="33%"
//                     //   onClick={() => {
//                     //             this.selectSort('bid');
//                     //         }}
//                     >
//                       {INSTRUMENTS.BEST_BID}
//                       {/* <img
//                         src={this.selectImage('price')}
//                       /> */}
//                     </th>
//                     <th
//                       width="33%"
//                     //   onClick={() => {
//                     //             this.selectSort('ask');
//                     //         }}
//                     >
//                       {INSTRUMENTS.BEST_ASK}
//                       {/* <img
//                         src={this.selectImage('percent')}
//                       /> */}
//                     </th>

//                   </tr>

//                 </thead>
//                 <tbody>
//                   {this.props.data[0].market.trades.map( obj => {
//                             return (
//                               <tr
//                                 key={obj.productName}
//                                 // onClick={() => this.props.handleTradeCurrencyChange(this.state.activeBaseToken, obj.productId)}
//                                 // onClick={() => this.props.handleTradeCurrencyChange(this.state.activeBaseToken, obj.productId)}
//                                 className="instrument-*coinSymbol"
//                                 style={{border: "none", fontWeight: "bold", display: "table-row"}}
//                               >
//                                 <td className="coinSymbol">{obj.productName}</td>
//                                 <td className="up dataNumber">{obj.price}</td>
//                                 <td className="up dataNumber">{obj.change}</td>
//                               </tr>
//                             )
//                         })}
//                 </tbody>

//               </table>
//             </div>
//           </Selector>
//         )
//     }
// }

const Selector = styled.div`
    background: #fff;
    table {
        border-collapse: collapse;
    }
    tr{
        cursor: pointer;
    }
    .coinSymbol{
        img{
            position:relative;
            top:4px;
            margin:auto 10px auto -10px;
        }
    }
    .ETC{
        display:block;
        font-size:10px;
        position:relative;
        top:-3px;
        left:20px;
        color:#666666;
    }
`