import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import {isMobile} from "react-device-detect";
import { Link } from 'react-router-dom';
import Actions from '../actions/index';
import ModalA from "../components/local/wallet/ModalA";
import modalupdown_1 from "../assets/images/modalupdown_1.png";
import modalupdown_2 from "../assets/images/modalupdown_2.png";
import modalupdown_3 from "../assets/images/modalupdown_3.png";
import modalupdown_4 from "../assets/images/modalupdown_4.png";
import modalimg1 from "../assets/images/modaltestimg.png";
import modalimg2 from "../assets/images/modaltestimg2.png";
import ETH from "../assets/images/icon/eth.png";
import LNC from "../assets/images/icon/lnc.png";
import BAT from "../assets/images/icon/bat.png";
import OMG from "../assets/images/icon/omg.png";
import VIKKY from "../assets/images/icon/vikky.png";
import BTCB from "../assets/images/icon/btcb.png";
import NDI from "../assets/images/icon/vote1.png";
import VAT from "../assets/images/icon/cymt.png";
import BNB from "../assets/images/icon/bnb.png";
import ICON from "../assets/images/icon/icon.png";
import TUSD from "../assets/images/icon/tusd.png";
import VIEN from "../assets/images/icon/wab.png";

class WalletContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            notice: true,
            auth: false,
            balances: [],
            depositAmount: 0,
            showPrompt: false,
            open : false,
            pricebtn1: modalupdown_1,
            pricebtn2: modalupdown_3,
            limitbtn1: modalupdown_1,
            limitbtn2: modalupdown_3,
            depositpricebtn1: modalupdown_1,
            depositpricebtn2: modalupdown_3,
            withdrawpricebtn1: modalupdown_1,
            withdrawpricebtn2: modalupdown_3,
            type:"",
            Amount_price_deposit:"",
            Amount_price_withdraw:"",
            selectToken : '',
            selectTokenName: ""
        };

        this.called = false
    }

    onHandleChange=(e)=>{
        if(e.target.name==="Deposit_input"){
            this.setState({
                Amount_price_deposit : e.target.value
            })
        }
        if(e.target.name==="Withdraw_input"){
            this.setState({
                Amount_price_withdraw : e.target.value
            })
        }
    }

    onOpenModalA = (e, cellinfo) => {
        this.setState({
            open: true,
            type: e.target.value,
            selectToken : cellinfo,
            selectTokenName : cellinfo.original.name
        });
    };
    onCloseModalA = () => {
        this.setState({
            open: false ,
            pricebtn1: modalupdown_1,
            pricebtn2: modalupdown_3,
            limitbtn1: modalupdown_1,
            limitbtn2: modalupdown_3,
            depositpricebtn1: modalupdown_1,
            depositpricebtn2: modalupdown_3,
            withdrawpricebtn1: modalupdown_1,
            withdrawpricebtn2: modalupdown_3,
        });
    };

    PriceUpDown = (e) =>{
        if(e.target.name==="GasPrice_up"){
            this.setState({pricebtn1:modalupdown_2})
            this.setState({pricebtn2:modalupdown_3})
        }else if(e.target.name==="GasPrice_down"){
            this.setState({pricebtn2:modalupdown_4})
            this.setState({pricebtn1:modalupdown_1})
        }else if(e.target.name==="GasLimit_up"){
            this.setState({limitbtn1:modalupdown_2})
            this.setState({limitbtn2:modalupdown_3})
        }else if(e.target.name==="GasLimit_down"){
            this.setState({limitbtn2:modalupdown_4})
            this.setState({limitbtn1:modalupdown_1})
        }else if(e.target.name==="depositPriceUp"){
            this.setState({depositpricebtn1:modalupdown_2})
            this.setState({depositpricebtn2:modalupdown_3})
        }else if(e.target.name==="depositPriceDown"){
            this.setState({depositpricebtn2:modalupdown_4})
            this.setState({depositpricebtn1:modalupdown_1})
        }else if(e.target.name==="withdrawPriceUp"){
            this.setState({withdrawpricebtn1:modalupdown_2})
            this.setState({withdrawpricebtn2:modalupdown_3})
        }else if(e.target.name==="withdrawPriceDown"){
            this.setState({withdrawpricebtn2:modalupdown_4})
            this.setState({withdrawpricebtn1:modalupdown_1})
        }
    }

    componentDidMount() {
        this.props.getMyAccountId();
        this.props.getBalance();
    }


    callFunction(id) {
        if(id && this.called === false){
            // this.props.getMyOrders();
            // this.props.getBalance(+id);
            this.called = true;
        }
    }

    deposit = (e, cellInfo) => {
        if (this.state.Amount_price_deposit > 0) {
            let amount = this.state.Amount_price_deposit;
            let tokenObj = cellInfo.original;
            if (amount !== null && tokenObj.name === 'ETH') {
                this.props.depositEth(amount);
            } else if (amount !== null && tokenObj.name !== 'ETH') {
                console.log("Token address --> ", tokenObj);
                this.props.depositToken(tokenObj.tokenAddress, amount);
            } else {
                console.log("Cancelled")
            }
            this.setState({
                open: false
            })
        }
    }

    withdraw = (e, cellInfo) => {
        if (this.state.Amount_price_withdraw > 0) {
            let amount = this.state.Amount_price_withdraw;
            let tokenObj = cellInfo.original;
            if (amount !== null && tokenObj.name === 'ETH') {
                this.props.withdrawEth(amount);
            } else if (amount !== null && tokenObj.name !== 'ETH') {
                this.props.withdrawToken(tokenObj.tokenAddress, amount);
            } else {
                console.log("Cancelled")
            }
            this.setState({
                open: false
            })
        }
    }


    renderEditable(cellInfo) {
        const {BUTTONS} = this.props.languageConfig;
            return<div>
                <button type="button" className="table-btn1" onClick={(e)=>this.onOpenModalA(e, cellInfo)} value="deposit">{BUTTONS.TEXT_DEPOSIT}</button>
                <button type="button" className="table-btn2" onClick={(e)=>this.onOpenModalA(e, cellInfo)} value="withdraw">{BUTTONS.TEXT_WITHDRAW}</button>
                <button type="button" className="table-btn3" value="order">{BUTTONS.TEXT_MARKET}</button>
            </div>
    }
    renderEditable_img(cellInfo){
        if(cellInfo.original.name==="ETH"){
            return<div className="coin_icon">
                <img src={ETH}/>{cellInfo.original.name}
            </div>
        }else if(cellInfo.original.name==="LNC"){
            return<div className="coin_icon">
                <img src={LNC}/>{cellInfo.original.name}
            </div>
        }else if(cellInfo.original.name==="BAT"){
            return<div className="coin_icon">
                <img src={BAT}/>{cellInfo.original.name}
            </div>
        }else if(cellInfo.original.name==="OMG"){
            return<div className="coin_icon">
                <img src={OMG}/>{cellInfo.original.name}
            </div>
        }else if(cellInfo.original.name==="VIKKY"){
            return<div className="coin_icon">
                <img src={VIKKY}/>{cellInfo.original.name}
            </div>
        }else if(cellInfo.original.name==="BTCB"){
            return<div className="coin_icon">
                <img src={BTCB}/>{cellInfo.original.name}
            </div>
        }else if(cellInfo.original.name==="NDI"){
            return<div className="coin_icon">
                <img src={NDI}/>{cellInfo.original.name}
            </div>
        }else if(cellInfo.original.name==="VAT"){
            return<div className="coin_icon">
                <img src={VAT}/>{cellInfo.original.name}
            </div>
        }else if(cellInfo.original.name==="BNB"){
            return<div className="coin_icon">
                <img src={BNB}/>{cellInfo.original.name}
            </div>
        }else if(cellInfo.original.name==="ICON"){
            return<div className="coin_icon">
                <img src={ICON}/>{cellInfo.original.name}
            </div>
        }else if(cellInfo.original.name==="TUSD"){
            return<div className="coin_icon">
                <img src={TUSD}/>{cellInfo.original.name}
            </div>
        }else if(cellInfo.original.name==="VIEN"){
            return<div className="coin_icon">
                <img src={VIEN}/>{cellInfo.original.name}
            </div>
        }else{
            return<div>
                coin_name null
            </div>
        }
    }

    renderTable() {
        const { WALLET } = this.props.languageConfig;
        const balance_val = this.props.balance;
        let pageSize = balance_val.length;
        console.log("ddd",pageSize)
        return(
            <ReactTable
                showPagination={false}
                data={balance_val}
                columns={[
                    {
                        Header: WALLET.COIN_NAME,
                        id: "product",
                        Cell: (d) => this.renderEditable_img(d)
                    },
                    {
                        Header: WALLET.TOTAL,
                        id: "total_balance",
                        accessor: d => d.total
                    },
                    {
                        Header: WALLET.AVAILABLE,
                        id: "hold",
                        accessor: d => d.hold
                    },
                    {
                        id: "deposit_withdraw_buttons",

                        // accessor: d => <div><button type="button">Deposit</button></div>,
                        Cell: (d) => this.renderEditable(d)
                    }
                ]}
                pageSize={pageSize}
                className="-striped -highlight"
            />
        );
    }

    render() {
        const { WALLET } = this.props.languageConfig;
        // this.callFunction(this.props.accountId);
        return (
            <Wallet>
                <section className="main" role="">
                    <div id="wallet" className="wallet_wrap">
                        <ModalA open={this.state.open} onClose={this.onCloseModalA}>
                            {
                                this.state.type === "deposit" &&
                                <ModalBoxB>
                                    <div className="modaltitle">Deposit <span>{this.state.selectTokenName}</span></div>
                                    <div className="modal_inbox_B">
                                        <div><img src={modalimg1}/></div>
                                        <ul>
                                            <li><div className='li_Box'>
                                                <div className='Data_text2'>Amount</div>
                                                <div className='Data_text'>
                                                    <input
                                                        type='number'
                                                        name="Deposit_input"
                                                        onChange={(e)=>this.onHandleChange(e)}
                                                        placeholder="0"
                                                    />
                                                </div>
                                                <div className='UpDownright_1'>{this.state.selectTokenName}</div>
                                            </div></li>
                                            <li>
                                                <button>25%</button>
                                                <button>50%</button>
                                                <button>75%</button>
                                                <button>100%</button>
                                            </li>
                                        </ul>
                                        <div>
                                            <div className='ul_div'>Gas Price (GWEI)
                                                <div className='UpDownright_2'>
                                                    <img className="Upbtn_2" src={this.state.depositpricebtn1} onClick={(e)=>this.PriceUpDown(e)} name="depositPriceUp"/>
                                                    <img className="Downbtn_2" src={this.state.depositpricebtn2} onClick={(e)=>this.PriceUpDown(e)} name="depositPriceDown"/>
                                                </div>
                                                <div className="Data_Deposit">0</div>
                                            </div>
                                        </div>
                                        <button className='settings'>Settings</button>
                                        <div className='settingText'>Gas Fee &#60; 0.00000000 ETH</div>
                                        <div>
                                            <button className='cancel' onClick={this.onCloseModalA}>Cancel</button>
                                            <button className='save' onClick={(e) => this.deposit(e, this.state.selectToken)}>Deposit</button>
                                        </div>
                                    </div>
                                </ModalBoxB>
                            }
                            {
                                this.state.type === "withdraw" &&
                                <ModalBoxC>
                                    <div className="modaltitle">Withdraw <span>{this.state.selectTokenName}</span></div>
                                    <div className="modal_inbox_C">
                                        <div><img src={modalimg2}/></div>
                                        <ul>
                                            <li><div className='li_Box'>
                                                <div className='Data_text2'>Amount</div>
                                                <div className='Data_text'>
                                                    <input
                                                        type='number'
                                                        name="Withdraw_input"
                                                        onChange={(e)=>this.onHandleChange(e)}
                                                        placeholder="0"
                                                    />
                                                </div>
                                                <div className='UpDownright_1'>{this.state.selectTokenName}</div>
                                            </div></li>
                                            <li>
                                                <button>25%</button>
                                                <button>50%</button>
                                                <button>75%</button>
                                                <button>100%</button>
                                            </li>
                                            <li className='btnunder_text'>* Minimum withdrawal amount (equivalent): 0.02062500 EHT</li>
                                        </ul>
                                        <div>
                                            <div className='ul_div'>Gas Price (GWEI)
                                                <div className='UpDownright_2'>
                                                    <img className="Upbtn_2" src={this.state.withdrawpricebtn1} onClick={(e)=>this.PriceUpDown(e)} name="withdrawPriceUp"/>
                                                    <img className="Downbtn_2" src={this.state.withdrawpricebtn2} onClick={(e)=>this.PriceUpDown(e)} name="withdrawPriceDown"/>
                                                </div>
                                                <div className="Data_Deposit">0</div>
                                            </div>
                                        </div>
                                        <button className='settings'>Settings</button>
                                        <div className='settingText'>Gas Fee &#60; 0.00000000 ETH</div>
                                        <div>
                                            <button className='cancel' onClick={this.onCloseModalA}>Cancel</button>
                                            <button className='save' onClick={(e) => this.withdraw(e, this.state.selectToken)}>Withdraw</button>
                                        </div>
                                    </div>
                                </ModalBoxC>
                            }
                            {
                                this.state.type === "gas" &&
                                <ModalBoxA>
                                    <div className="modaltitle">Settings <span>Gas Fee</span></div>
                                    <div className="modal_inbox_A">
                                        <ul>
                                            <li><div>
                                                Gas Price (GWEI)
                                                <div className='UpDownright_1'>
                                                    <img className="Upbtn_1" src={this.state.pricebtn1} onClick={(e)=>this.PriceUpDown(e)} name="GasPrice_up"/>
                                                    <img className="Downbtn_1" src={this.state.pricebtn2} onClick={(e)=>this.PriceUpDown(e)} name="GasPrice_down"/>
                                                </div>
                                                <div className='Data_text'>0</div>
                                            </div></li>
                                            <li>네트워크 성공률을 기반으로 적합한 가스 가격을 계산합니다.</li>
                                        </ul>
                                        <ul>
                                            <li><div>
                                                Gas Limit
                                                <div className='UpDownright_2'>
                                                    <img className="Upbtn_2" src={this.state.limitbtn1} onClick={(e)=>this.PriceUpDown(e)} name="GasLimit_up"/>
                                                    <img className="Downbtn_2" src={this.state.limitbtn2} onClick={(e)=>this.PriceUpDown(e)} name="GasLimit_down"/>
                                                </div>
                                                <div className='Data_text'>0</div>
                                            </div></li>
                                            <li>네트워크 성공률을 기반으로 적합한 가스 리밋을 계산합니다.</li>
                                        </ul>
                                        <div>
                                            <button className='cancel' onClick={this.onCloseModalA}>Cancel</button>
                                            <button className='save'>Save</button>
                                        </div>
                                    </div>
                                </ModalBoxA>
                            }
                        </ModalA>
                        <div className="container">
                            <div className="page_link">
                                <ul>
                                    <li className="active">
                                        <Link to="/wallet">{WALLET.DEPOSIT}</Link>
                                    </li>
                                    <li><Link to="/transactionDetails">{WALLET.ORDERS}</Link></li>
                                </ul>
                            </div>
                            <div className="asset_balance">
                                <div>
                                    <div className="tab_list" />
                                    <div className="wallet_info">
                                        <h3>

                                            <div className="first">{WALLET.TOTAL_ASSET}</div>

                                            <div className="second">
                                                <div>
                                                    <strong id="balanceTxt">0</strong>
                                                    <span className="eth"> ETH</span>
                                                </div>
                                                    <strong id="balanceTxt2">0</strong>
                                                    <span className="krw"> KRW</span>
                                            </div>
                                        </h3>

                                    </div>
                                    {this.renderTable()}
                                </div>

                                {/* onClick={(e) => {
                                                e.target.className.indexOf('market-button') !== -1 && e.target.className.indexOf('marketLOCUS') === -1
                                                && setTimeout(() => {Router.push('/exchange');
                                                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                                                }, 500)
                                            }} */}
                                <div className="balances_list">
                                    <div className="total_balance" />
                                    <div className="products_list_balances">
                                        <div className="row2">
                                            <div className="balance">
                                                <div
                                                    className="balances_name"
                                                    onMouseEnter={() => this.mouseEnter('name')}
                                                    onMouseLeave={this.mouseLeave}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Wallet>
        )
    }
}


const mapStateToProps = (state) => ({
    balance: state.smartContract.balance,
    myOrders: state.smartContract.myOrders,
    accountId: state.smartContract.accountId
})

const mapDispatchToProps = (dispatch) => {
    return {
        getBalance: (id) => dispatch(Actions.smartContract.getBalanceRequest(id)),
        depositEth: (amt) => dispatch(Actions.smartContract.placeDepositEthRequest(amt)),
        withdrawEth: (amt) => dispatch(Actions.smartContract.placeWithdrawEthRequest(amt)),
        depositToken: (address, amount) => dispatch(Actions.smartContract.placeDepositTokenRequest(address, amount)),
        withdrawToken: (address, amount) => dispatch(Actions.smartContract.placeWithdrawTokenRequest(address, amount)),
        getMyOrders: () => dispatch(Actions.smartContract.getMyOrdersRequest()),
        getMyAccountId : () => dispatch(Actions.smartContract.getMyAccountIdRequest())
    }
}

WalletContainer.defaultProps = {
    balance : []
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletContainer));

const ModalBoxA = styled.div`
  width:350px;
  height:400px;
    .modaltitle{
    border-bottom:1px solid #364958;
    height:56px;
    font-size:25px;
    text-align:center;
    font-weight:500;
    color:#364958;
    width:390px;
    margin-left:-20px;
        span{
            color:#3c92ca;
        }
    }
    .modal_inbox_A{
        padding:13px;
        font-weight:600;
        ul{
            list-style: none;
            padding-inline-start:unset;
            margin-bottom:47px;
            li{
                color:#808080;
                line-height:42px;
                font-size:12px;
                :first-child{
                    border-bottom:1px solid #e9e9e9;
                    font-size:18px;
                    color:#364958;
                }
                .Data_text{
                    float:right;
                    margin-right:7px;
                    font-size:26px;
                }
                .UpDownright_1{
                    float:right;
                    img{
                        cursor:pointer;
                    }
                    .Upbtn_1{
                        vertical-align:9px;
                        &:focus{
                            content:url('../assets/images/modalupdown_2.png');
                        }
                    }
                    .Downbtn_1{
                        vertical-align:-4px;
                        right:10px;
                        position:relative;
                    }
                }
                .UpDownright_2{
                    float:right;
                    img{
                        cursor:pointer;
                    }
                    .Upbtn_2{
                        vertical-align:9px;
                    }
                    .Downbtn_2{
                        vertical-align:-4px;
                        right:10px;
                        position:relative;
                    }
                }
            }
        }
        button{
            width:145px;
            height:40px;
            font-size:20px
            border:none;
            cursor:pointer;
            &:focus{outline:0;}
            &.cancel{
                color:#364958;
                background:#e9e9e9;
            }
            &.save{
                float:right;
                color:#fff
                background:#364958;
            }
        }
    }
  `

const ModalBoxB = styled.div`
  width:410px;
  height:400px;
    .modaltitle{
    border-bottom:1px solid #364958;
    height:56px;
    font-size:25px;
    text-align:center;
    font-weight:500;
    color:#364958;
    width:449px;
    margin-left:-20px;
        span{
            color:#3c92ca;
        }
    }
    .modal_inbox_B{
        padding:13px;
        font-weight:600;
        ul{
            list-style: none;
            padding-inline-start:unset;
            margin-bottom:47px;
            margin-top:30px;
            li{
                color:#808080;
                line-height:42px;
                font-size:12px;
                margin-top:12px;
                button{
                    font-size:15px;
                    font-weight:600;
                    width:86px;
                    height:26px;
                    background:#e9e9e9;
                    color:#364958;
                    border-radius:3px;
                    margin-left:13px;
                    :first-child{
                        margin-left:unset;
                    }
                    &:focus{
                        background:#3c92ca;
                        color:#fff;
                    }
                }
                :first-child{
                    border-bottom:1px solid #e9e9e9;
                    font-size:18px;
                    color:#364958;
                }
                .li_Box{
                    display:flex;
                    .Data_text{
                        flex:1;
                        margin-right:10px;
                        margin-left:92px;
                        font-size:26px;
                        line-height:36px;
                        input{
                            -webkit-appearance: none;
                            -moz-appearance: none;
                            appearance: none;
                            border:none;
                            outline:none;
                            text-align:right;
                            font-size:26px;
                            font-weight:600;
                            width:165px;
                            &[type=number]::-webkit-inner-spin-button{
                                -webkit-appearance: none;
                                -moz-appearance: none;
                                appearance: none;
                            }
                            &[type=number]::-webkit-outer-spin-button{
                                -webkit-appearance: none;
                                -moz-appearance: none;
                                appearance: none;
                            }
                        }
                    }
                    .Data_text2{
                        flex:1;
                    }
                    .UpDownright_1{
                        flex:1;
                        img{
                            cursor:pointer;
                        }
                        .Upbtn_1{
                            vertical-align:9px;
                        }
                        .Downbtn_1{
                            vertical-align:-4px;
                            right:10px;
                            position:relative;
                        }
                    }
                }
            }
        }
        .ul_div{
            border-bottom:1px solid #e9e9e9;
            padding:5px 0px;
            font-size:18px;
            color:#364958;
            width:288px;
            float:left;
            .Data_Deposit{
                float:right;
                margin-right:10px;
                margin-top:-7px;
                font-size:26px;
                color:#364958;
            }
            .UpDownright_2{
                float:right;
                img{
                        cursor:pointer;
                    }
                    .Upbtn_2{
                        vertical-align:9px;
                    }
                    .Downbtn_2{
                        vertical-align:-4px;
                        right:10px;
                        position:relative;
                    }
            }
        }
        .settings{
            font-size:15px;
            color:#364958;
            background:#e9e9e9;
            width:86px;
            height:39px;
            font-weight:600;
            border-radius:3px;
            margin-left:10px;
        }
        .settingText{
            font-size:13px;
            font-weight:600;
            color:#808080;
            padding:12px 0px;
            margin-bottom:40px;
        }
        button{
            width:180px;
            height:44px;
            font-size:20px;
            border:none;
            cursor:pointer;
            &:focus{outline:0;}
            &.cancel{
                color:#364958;
                background:#e9e9e9;
            }
            &.save{
                float:right;
                color:#fff
                background:#364958;
            }
        }
    }
  `

const ModalBoxC = styled.div`
  width:410px;
  height:400px;
    .modaltitle{
    border-bottom:1px solid #364958;
    height:56px;
    font-size:25px;
    text-align:center;
    font-weight:500;
    color:#364958;
    width:449px;
    margin-left:-20px;
        span{
            color:#3c92ca;
        }
    }
    .modal_inbox_C{
        padding:13px;
        font-weight:600;
        ul{
            list-style: none;
            padding-inline-start:unset;
            margin-bottom:47px;
            margin-top:30px;
            .btnunder_text{
                line-height:0px;
                margin-top:7px;
                color:#3c92ca;
                font-size:12px;
                font-weight:700;
            }
            li{
                color:#808080;
                line-height:42px;
                font-size:12px;
                margin-top:12px;
                button{
                    font-size:15px;
                    font-weight:600;
                    width:86px;
                    height:26px;
                    background:#e9e9e9;
                    color:#364958;
                    border-radius:3px;
                    margin-left:13px;
                    :first-child{
                        margin-left:unset;
                    }
                    &:focus{
                        background:#3c92ca;
                        color:#fff;
                    }
                }
                :first-child{
                    border-bottom:1px solid #e9e9e9;
                    font-size:18px;
                    color:#364958;
                }
                .li_Box{
                    display:flex;
                    .Data_text{
                        flex:1;
                        margin-right:10px;
                        margin-left:92px;
                        font-size:26px;
                        line-height:36px;
                        input{
                            -webkit-appearance: none;
                            -moz-appearance: none;
                            appearance: none;
                            border:none;
                            outline:none;
                            text-align:right;
                            font-size:26px;
                            font-weight:600;
                            width:165px;
                            &[type=number]::-webkit-inner-spin-button{
                                -webkit-appearance: none;
                                -moz-appearance: none;
                                appearance: none;
                            }
                            &[type=number]::-webkit-outer-spin-button{
                                -webkit-appearance: none;
                                -moz-appearance: none;
                                appearance: none;
                            }
                        }
                    }
                    .Data_text2{
                        flex:1;
                    }
                    .UpDownright_1{
                        flex:1;
                        img{
                            cursor:pointer;
                        }
                        .Upbtn_1{
                            vertical-align:9px;
                        }
                        .Downbtn_1{
                            vertical-align:-4px;
                            right:10px;
                            position:relative;
                        }
                    }
                }
            }
        }
        .ul_div{
            border-bottom:1px solid #e9e9e9;
            padding:5px 0px;
            font-size:18px;
            color:#364958;
            width:288px;
            float:left;
            .Data_Deposit{
                float:right;
                margin-right:10px;
                margin-top:-7px;
                font-size:26px;
                color:#364958;
            }
            .UpDownright_2{
                float:right;
                img{
                        cursor:pointer;
                    }
                    .Upbtn_2{
                        vertical-align:9px;
                    }
                    .Downbtn_2{
                        vertical-align:-4px;
                        right:10px;
                        position:relative;
                    }
            }
        }
        .settings{
            font-size:15px;
            color:#364958;
            background:#e9e9e9;
            width:86px;
            height:39px;
            font-weight:600;
            border-radius:3px;
            margin-left:10px;
        }
        .settingText{
            font-size:13px;
            font-weight:600;
            color:#808080;
            padding:12px 0px;
            margin-bottom:40px;
        }
        button{
            width:180px;
            height:44px;
            font-size:20px;
            border:none;
            cursor:pointer;
            &:focus{outline:0;}
            &.cancel{
                color:#364958;
                background:#e9e9e9;
            }
            &.save{
                float:right;
                color:#fff
                background:#364958;
            }
        }
    }
  `

const Wallet = styled.div`
    background:#fff;
    width:100%;
    padding:55px 0 ;
    .wallet_wrap{
    padding:55px 0 0 0;
    }
    .main {
        width:1200px;
        margin:0 auto;
    }

    .page_link {
        width: 100%;
        overflow: hidden;
        margin: 0 0 80px;
        ul {
            display:flex;
            flex-direction: row;
            list-style: none;
            padding-inline-start:unset;
            li {
                width:50%;
                text-align:center;
                padding:10px 0;
                a {
                    font-size:18px;
                    font-weight:700;
                    color : #999999;
                    text-decoration:none;
                }
                &.active {
                    border-bottom: 3px solid #364958;
                    a {
                        color: #364958;
                    }
                }
            }
        }
    }

    .wallet_info {
        width: 100%;
        overflow: hidden;
        margin: 0 0 80px;
        h3 {
            padding: 10px 40px;
            display: flex;
            border: 1px solid #d9d9d9;
            margin: 0 auto;
            font-size: 26px;
            font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
            text-align: center;
            font-weight: bold;
            line-height: 20px;
            width:770px;
            .first {
                width:40%;
                float:left;
                flex:1;
                font-size: 25px;
                color:#1a1a1a
                line-height: 50px;
            }
            .second {
                flex:1;
                width:60%;
                float:left;
                strong {
                   &:first-child{
                    font-size: 30px;
                    color: #3c92ca;
                    font-weight: 900;
                    // margin-left: 50px;
                    }
                    font-size: 15px;
                    color: #666;
                }
                .eth {
                    font-size: 25px;
                    margin-left:6px;
                }
                .krw {
                    font-size: 15px;
                    color: #666;
                    margin-left:10px;
                }
            }
        }
    }

    .wallet_info2 {
        h5 {
            padding: 20px 60px;
            display: table;
            margin: 0 auto;
            font-size: 20px;
            color: red;
            font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
            text-align: center;
            font-weight: bold;
        }
    }

    .asset_balance {
        width: 100%;
        overflow: hidden;
        .ap-header-actions {
            width: 100%;
            overflow: hidden;
        }
        .ap-title {
            display:none;
        }
        .table-btn1{
            background:#fff;
            color:#3c92ca
            width:80px;
            height:32px;
            font-size:14px;
            font-weight:bold;
            border:1px solid #d9d9d9;
            outline:none;
            cursor:pointer;
            border-radius:7px;
            &:focus{
                background:#3c92ca;
                color:#fff;
            }
        }
        .table-btn2{
            background:#fff;
            color:#ff6666
            width:80px;
            height:32px;
            font-size:14px;
            font-weight:bold;
            border:1px solid #d9d9d9;
            outline:none;
            cursor:pointer;
            border-radius:7px;
            margin-left:12px;
            &:focus{
                background:#ff6666;
                color:#fff;
            }
        }
        .table-btn3{
            background:#fff;
            color:#364958;
            width:80px;
            height:32px;
            font-size:14px;
            font-weight:bold;
            border:1px solid #d9d9d9;
            outline:none;
            cursor:pointer;
            border-radius:7px;
            margin-left:12px;
            &:focus{
                background:#364958;
                color:#fff;
            }
        }
        .tab_list {
            float: right;
            margin: 0 0 20px;
            span {
                display: block;
                background: #999;
                color: #fff;
                padding: 5px 10px;
                float: left;
                cursor: pointer;
                margin-left: 10px;
                &:first-child {
                    margin-left: 0;
                }
                &.active {
                    background: #036;
                }
            }
        }
        .tit_list {
            width: 100%;
            overflow: hidden;
            border-bottom: 2px solid #036;
            padding: 5px 0;
            ul {
                display:flex;
                flex-direction: row;
                place-content:center flex-start;
                justify-content: flex-start;
                align-items:center;
                height:40px;
                margin-block-start: unset;
                margin-block-end: unset;
                li {
                list-style-type:none;
                    font-size: 18px;
                    font-weight: 700;
                    box-sizing: border-box;
                    color:#1a1a1a;
                    padding:8px 0;
                    text-align: center;
                    width:27%;
                    &.coinName{
                        width:15%;
                    }
                    &.totalBalance {
                        width:23%;
                    }
                    &.hold {
                        width:18%;
                    }
                    &.pending {
                        width:25%;
                    }
                }
            }
        }
        .ap-balances {
            width: 100%;
            overflow: hidden;
            .balances_list {
                width: 100%;
                overflow: hidden;
                border-bottom: 1px solid #cbcbcb;
                max-height:48px;
                height:48px;
                &:nth-child(even) {
                    background:#f2f2f2;
                }
                .row2 {
                    height:100%;
                    display:flex;
                    flex-direction: row;
                    place-content:center flex-start;
                    align-items:center;
                    justify-content: flex-start;
                    .currency-name {
                        background-repeat: no-repeat;
                        background-position: 5px 50%;
                        padding-left: 35px;
                        font-size: 18px;
                        font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
                        font-weight: 700;
                        &.long{
                          letter-spacing: -1.5px;
                        }
                    }
                    .balances_name {
                        width: 23%;
                        box-sizing: border-box;
                        padding:0 0 0 20px;
                    }
                    .balances_num {
                        width: 23%;
                        text-align: center;
                        .coinAmount {
                            display:flex;
                            flex-direction:row;
                            place-content:center;
                            align-items: center;
                            justify-content: center;
                            p {
                                text-align:right;
                                width:65%;
                                margin:0 5% 0 0;
                                font-size:15px;
                                color:#036;
                                font-weight: bold;
                            }
                            strong {
                                text-align:left;
                                width:30%;
                                color:#1a1a1a;
                            }
                        }
                        .cointoKRW {
                            display:flex;
                            flex-direction:row;
                            place-content:center;
                            align-items: center;
                            justify-content: center;
                            font-size:12px;
                            color:#666;
                            p {
                                text-align:right;
                                width:65%;
                                margin:0 5% 0 0;
                                font-weight: bold;
                            }
                            strong {
                                text-align:left;
                                width:30%;
                            }
                        }
                    }
                    .balances_hold {
                        width: 25%;
                        text-align: center;
                        font-weight: bold;
                    }
                    .balances_wait {
                        width: 25%;
                        text-align: center;
                        font-weight: bold;
                    }
                    .balances_btn {
                        width: 27%;
                        text-align: center;
                        button {
                            border:1px solid #dadada;
                            background: #fff;
                            border-radius: 5px;
                            font-weight:bold;
                            padding: 0 7px;
                            height:30px;
                            font-size:16px;
                            min-width:60px;
                            cursor:pointer;
                            outline: 0;
                            font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
                        }
                        .deposit-button {
                            color: #0066cc;
                            margin-left: 10px;
                        }
                        .market-button {
                            color: #003366;
                            margin-left: 10px;
                        }
                        .withdraw-button {
                            color: #ff3333;
                            margin-left: 10px;
                        }
                    }
                }
            }
        }
        .coin_icon{
            img{
                position:relative;
                top:4px;
                margin-right:5px;
             }
        }
        .ReactTable{
             text-align:center;
             border:none;
             .rt-thead{
                 .rt-th{
                    outline:none;
                 }
                 .rt-th.-sort-asc{
                    box-shadow:none;
                 }
                 .rt-th.-sort-desc{
                    box-shadow:none;
                 }    
             }
             .rt-thead.-header{
                 font-size:18px;
                 font-weight:600;
                 color:#1a1a1a;
                 box-shadow:none;
                 border-bottom:2px solid #364958;
                 .rt-th{
                     border:none;
                 }
             }
             .rt-tbody{
                 .rt-tr.-odd{
                     background:#fff;
                 }
                 .rt-tr.-padRow{
                     background:#fff;
                 }
                 .rt-tr-group{
                     border-bottom:none;
                     background:#fff;
                     &:hover{
                         background:rgb(249, 251, 253);
                     }
                 }
                 .rt-td{    
                     padding: 8px 5px;
                     border:none;
                     line-height:30px;
                     border-bottom:1px solid #d9d9d9;
                     font-size:15px;
                     font-weight:600;
                     color:#1a1a1a;
                     height:48px;
                     &:last-child{
                     }
                 }
             }
             .-pagination{
                 box-shadow:unset;
                 border-top:none;
                 margin-top:50px;
             }
        }
    }
    @media(max-width: 1024px) {
        width:100%;
        overflow:hidden;
        padding:20px 0 0 0;
        .main {
            width: 100%;
            .container {
                .page_link {
                    margin-bottom: 2rem;
                    ul {
                        li {
                            padding: 0;
                            a {
                                font-size: 1.2rem;
                            }
                        }
                    }
                }
                .asset_balance {
                    .wallet_info {
                        width: 100%;
                        margin: 0 0 2rem;
                        h3 {
                            width: 99%;
                            padding:0.6rem 0;
                            font-size: 1.2rem;
                            .idChk {
                                margin-right: 1rem;
                            }
                            .first {
                                width:100%;
                                float:left;
                            }
                            .second{
                                width:100%;
                                float:left;
                                 #balanceTxt {
                                    font-size: 1.2rem;
                                    margin: 0;
                                    // display: block;
                                    // width: 50%;
                                    text-align: right;
                                    // float:left;
                                }
                                #balanceTxt2 {
                                    font-size: 0.5rem;
                                    margin: 0;
                                    // display: block;
                                    // width: 50%;
                                    text-align: right;
                                    // float:left;
                                }
                                .krw {
                                    font-size: 1.2rem;
                                    // display: block;
                                    // width: 45%;
                                    text-align: left;
                                    padding-left:0;
                                    // padding-left: 1rem;
                                    // float:left;
                                }
                                .eth {
                                    font-size: 0.5rem;
                                    // display: block;
                                    // width: 45%;
                                    text-align: left;
                                    padding-left:0;
                                    // padding-left: 1rem;
                                    // float:left;
                                }
                            }
                        }
                    }
                    @media(min-width: 768px){
                    }
                    .tit_list {
                        ul {
                            li {
                                padding: 0;
                                font-size: 0.9rem;
                                font-weight: bold;
                                width:25%;
                            }
                        }
                    }
                    .balances_list {
                        // max-height: 150px;
                        max-height: 100%;
                        height: auto;
                        padding-top: 0.8rem;
                        padding-bottom: 0.3rem;
                        box-sizing: border-box;
                        .row2 {
                            flex-wrap: wrap;
                            .balance{
                                flex:1;align-self:flex-start;

                                .wallet_title{
                                    align-self:flex-start;font-size:1.1rem;font-weight:bold;color:gray;line-height:1.5rem;
                                }

                                .wallet_cnt{
                                    align-self:flex-start;margin:0.2rem 0 0 0;font-size:1.2rem;line-height:1.25rem;
                                }
                            }
                            .balances_name {
                                width: 100%;
                                // margin: 1rem 0 0 0;
                                padding:0 0 0 1rem;
                                text-align:left;
                                span {
                                    font-size: 1.2rem;
                                    // padding-left:2.5rem;
                                    padding-left:0;
                                    line-height:1.5rem;
                                    display: block;
                                }
                            }
                            .balances_num {
                                width: 100%;
                                margin: 1rem 0 0 0;
                                padding:0 0 0 1rem;
                                line-height: 1.3rem;
                                text-align:left;
                                .coinAmount {
                                    justify-content: left;
                                    p, strong {
                                        font-size: 1.1rem;
                                    }
                                    p {
                                        width:auto;
                                    }
                                    strong {
                                        width:auto;
                                    }
                                }
                                .cointoKRW {
                                    justify-content: left;
                                    p, strong {
                                        font-size: 1rem;
                                    }
                                    p {
                                        width:auto;
                                    }
                                    strong {
                                        width:auto;
                                    }
                                }
                            }
                            .balances_hold {
                                width: 100%;
                                // margin: 1rem 0 0 0;
                                padding:0 0 0 1rem;text-align:left;font-weight:normal;

                                .tip{
                                    font-size:0.8rem;
                                }
                            }
                            .balances_wait {
                                width: 100%;
                                margin: 1rem 0 0 0;
                                padding:0 0 0 1rem;text-align:left;font-weight:normal;
                            }
                            .balances_btn {
                                width: 100%;
                                text-align: right;
                                margin-top: 1rem;
                                margin-bottom: 0.5rem;
                                padding-right: 1rem;
                                button {
                                    min-width: 0;
                                    width: 7rem;
                                    height:2rem;
                                    font-size:1rem;
                                }
                                .deposit-button {
                                    margin: 0;
                                }
                                .withdraw-button {
                                    margin: 0;
                                    margin-left: 0.5rem;
                                }
                                .market-button {
                                    margin: 0;
                                    margin-left: 0.5rem;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    @media(max-width: 767px){
        .asset_balance{
            .table-btn1{
                margin-left:0px;
                width:33%;
            }
            .table-btn2{
                margin-left:0px;
                width:33%;
            }
            .table-btn3{
                margin-left:0px;
                width:33%;
            }       
        }
    }
`
