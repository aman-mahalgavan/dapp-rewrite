import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Loading from '../components/global/loading';
import Error from '../components/global/error';
import thum_icon1 from "../assets/images/dexhi_icon_1.png";
import thum_icon2 from "../assets/images/dexhi_icon_2.png";
import thum_icon3 from "../assets/images/dexhi_icon_3.png";
import thum_icon4 from "../assets/images/dexhi_icon_4.png";
import DexHi_logo_1 from "../assets/images/DexHi_logo_1.png";
import {SlickA} from "../components/global/SlickA";

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exchangeAdd: false,
            featureAdd: false,
            isLogin: false,
            use2FA: false,
            instrumentTicks: []
        };
        this.EXCHANGETOP_ref = React.createRef();
        this.onWindowScroll = this.onWindowScroll.bind(this); //bind function once

    }

    onWindowScroll = () => {
        const EXCHANGETOP = this.EXCHANGETOP_ref.current.offsetTop * 0.5;
        let scrollOn = {
            exchange: true,
            feature: true
        };
        let windowTop = window.scrollY;
        if (windowTop > EXCHANGETOP && scrollOn.exchange) {
            this.setState({ exchageAdd: true });
            scrollOn.exchange = false;
        }
        if (windowTop > 100) {
            this.setState({ headerAdd: true });
            scrollOn.header = false;
        } else {
            this.setState({ headerAdd: false });
            scrollOn.header = true;
        }
    }
    componentDidMount() {
        // let txtEffect = null;
        window.addEventListener('scroll', this.onWindowScroll, false);
    }

    componentWillUnmount() {
        // you need to unbind the same listener that was binded.
        window.removeEventListener('scroll', this.onWindowScroll, false);
    }

    render() {
        const { INDEX } = this.props.languageConfig;
        return (
            <div>
                <MainVisual id="mainVisual">
                    <div className="container">
                        <div className="main_wrap">
                            <div className="login_wrap">
                                <VisualText>
                                    <h3>DECENTRALIZED FINANCE</h3>
                                    <p>{INDEX.TITLE_TEXT}</p>
                                </VisualText>
                                {this.LoginArea}
                            </div>
                            {/*<div className="coin_wrap">
                                <div className="head_cont">
                                    <table className="coin_table">
                                        <thead>
                                            <tr>
                                                <th className="coinName">{INDEX.NAME}</th>
                                                <th>{INDEX.PRICE}</th>
                                                <th>{INDEX.PXCHANGE}</th>
                                            </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    <div className="price_cont">
                                        <table>
                                            <tbody/>
                                        </table>
                                    </div>
                                </div>
                                <div className="price_cont">
                                    <table>
                                        <tbody />
                                    </table>
                                </div>
                            </div>*/}
                        </div>
                    </div>
                </MainVisual>
                <Content id="content">
                    <InfoSection>
                        <div className="container">
                            <div className="exchange_view">
                                <SlickA languageConfig={this.props.languageConfig}/>
                            </div>
                        </div>
                    </InfoSection>
                    <ExchangeInfo id="exchangeInfo">
                        <div className="container_title">
                            <dl>
                                <dt><img src={DexHi_logo_1}/></dt>
                                <dt>{INDEX.EXCHANGE_TITLE2}</dt>
                                <dd>{INDEX.EXCHANGE_TITLE3}</dd>
                                <dd>{INDEX.EXCHANGE_TITLE4}</dd>
                            </dl>
                        </div>
                        <div className="container">
                            <div className={this.state.exchageAdd ? 'txt_effect' : null} ref={this.EXCHANGETOP_ref}>
                                <span className="thumb">
                                    <img
                                        src={thum_icon1}
                                        alt=""
                                    />
                                </span>
                                <div className="txt_cont">
                                    <dl>
                                        <dt>{INDEX.EXCHANGE5_TIT}</dt>
                                    </dl>
                                    <dl className="txt_cont_dl_2">
                                        <dd>{INDEX.EXCHANGE5_TXT}</dd>
                                    </dl>
                                </div>
                            </div>
                            <div className={this.state.exchageAdd ? 'txt_effect' : null} ref={this.EXCHANGETOP_ref}>
                                <span className="thumb">
                                    <img
                                        src={thum_icon2}
                                        alt=""
                                    />
                                </span>
                                <div className="txt_cont">
                                    <dl>
                                        <dt>{INDEX.EXCHANGE6_TIT}</dt>
                                    </dl>
                                    <dl className="txt_cont_dl_2">
                                        <dd>{INDEX.EXCHANGE6_TXT}</dd>
                                    </dl>
                                </div>
                            </div>

                            <div className={this.state.exchageAdd ? 'txt_effect' : null} ref={this.EXCHANGETOP_ref}>
                                <span className="thumb">
                                    <img
                                        src={thum_icon3}
                                        alt=""
                                    />
                                </span>
                                <div className="txt_cont">
                                    <dl>
                                        <dt>{INDEX.EXCHANGE7_TIT}</dt>
                                    </dl>
                                    <dl className="txt_cont_dl_2">
                                        <dd>{INDEX.EXCHANGE7_TXT}</dd>
                                    </dl>
                                </div>
                            </div>
                            <div className={this.state.exchageAdd ? 'txt_effect' : null} ref={this.EXCHANGETOP_ref}>
                                <span className="thumb">
                                    <img
                                        src={thum_icon4}
                                        alt=""
                                    />
                                </span>
                                <div className="txt_cont">
                                    <dl>
                                        <dt>{INDEX.EXCHANGE8_TIT}</dt>
                                    </dl>
                                    <dl className="txt_cont_dl_2">
                                        <dd>{INDEX.EXCHANGE8_TXT}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </ExchangeInfo>

                </Content>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));



const MainVisual = styled.div`
    width:100%;
    height:600px;
    background-image:url('https://static.bitnaru.com/v3_web/images/visual_section_bg.jpg');
    background-size:cover;
    background-attachment:fixed;
   
    .main_wrap{
        .login_wrap {
            .exchange_btn {
                a {
                    display: block;
                    width: 500px;
                    height: 100%;
                    color: #036;
                    background: #fff;
                    text-align: center;
                    line-height: 50px;
                    border-radius: 5px;
                    margin:0 0 0 48px;
                    font-size: 21px;
                    font-weight:700;
                }
            }
        }
    }
    .ap-widget {
        background : transparent;
    }
    .ap-body {
        box-shadow : none;
    }
    .account_btn {
        width: 100%;
        overflow: hidden;
        margin: 30px 0 0 48px;
        ul {
            display:flex;
            flex-direction:row;
            place-content:center flex-start;
            align-items: center;
            justify-content: flex-start;
            li {
                width:500px;
                position: relative;
                cursor: pointer;
                &:first-child {
                    margin:0 20px 0 0;
                }
            }
        }
    }
  
    .show-loggedin button{
        cursor:pointer;
        display: block;
        width: 100%;
        color:#fff;
        background: #06c;
        text-align: center;
        border-radius: 5px;
        margin:0 auto;
        height:50px;
        font-size: 21px;
        font-weight:700;
        border:0 none;
        &.eng {
            font-size:1.2rem;
        }
    }
 
    .container {
        height:100%;
        width:1200px;
        margin:0 auto;
        overflow:hidden;
        .main_wrap{
            height: 100%;
            overflow: hidden;
            position: relative;
            display:flex;
            flex-direction:row;
            place-content:center space-between;
            align-items: center;
            justify-content: space-between;
            .login_wrap {
                width:50%;
                position:relative;
                .login_cont {
                    width:100%;
                    position:relative;
                    #loginForm {
                        .input--custom {
                            width:100%;
                            overflow:hidden;
                            display:inline;
                            margin:0 0 10px;
                            position:relative;
                            .form-group {
                                width:100%;
                                overflow:hidden;
                                input {
                                    width:350px;
                                    height:40px;
                                    border:0 none;
                                    border-radius:3px;
                                    text-indent:5px;
                                    margin:0 auto;
                                    display:block;
                                    font-size:17px;
                                    color:black;
                                }
                            }
                        }
                        .btn-lg {
                            width: 350px;
                            height: 40px;
                            margin: 0 auto;
                            display: block;
                            background: rgba(249, 62, 46, .6);
                            color: #fff;
                            border: none;
                            border-radius: 3px;
                            cursor: pointer;
                            text-align:center;
                            &:hover {
                                background: rgba(249, 62, 46, .8);
                            }
                        }
                        .clearfix, .sign_wrap {
                            width:100%;
                            overflow:hidden;
                            margin:20px 0 0 0;
                        }
                        .sign_wrap {
                            a {
                                color:#ddd;
                                position:relative;
                                &:first-child {
                                    margin:0 10px 0 0;
                                    padding:0 10px 0 0;
                                    &:before {
                                        content: '';
                                        display: block;
                                        width: 1px;
                                        height: 14px;
                                        background: #fff;
                                        position: absolute;
                                        right: 0;
                                        top: 3px;
                                        z-index: 10;
                                    }
                                }
                            }
                        }
                    }
                    .error-block {
                        min-width: 350px;
                        text-align: center;
                        position: absolute;
                        color: #fff !important;
                        padding: 10px 20px;
                        background: rgba(249, 62, 46, .6);
                        border-radius: 3px;
                        bottom: -70px;
                        left: 50%;
                        transform: translateX(-50%);
                    }
                }
            }
            .coin_wrap{
                width:540px;
                border-radius: 10px;
                background:rgba(255, 255, 255, 0.8);
                height:410px;
                .head_cont {
                    width:480px;
                    position: relative;
                    margin: 0 auto;
                    padding:14px 0 0 0;
                    table {
                        width:100%;
                        th {
                            width:33%;
                            height:40px;
                            border-bottom: 2px solid #036;
                            font-weight: 700;
                            font-size:17px;
                            &.coinName {
                                text-align:left;
                                padding-left:10px;
                            }
                        }
                    }
                }
                .price_cont{
                    width:480px;
                    height:340px;
                    overflow-y: scroll;
                    position: relative;
                    margin:0 auto;
                    &::-webkit-scrollbar-track {
                        background: #efefef;
                        -webkit-border-radius: 10px;
                        -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, .2);
                    }
                    &::-webkit-scrollbar-thumb {
                        height: 50px;
                        width: 50px;
                        background: #003366;
                        -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, .1);
                    }
                    &::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                        border: 3px solid #fff;
                    }
                    &::-webkit-scrollbar-button:start:decrement, &::-webkit-scrollbar-button:end:increment {
                        display: block;
                        height: 10px;
                        background: #efefef;
                    }
                    table {
                        width:100%;
                        td {
                            width: 33%;
                            border-bottom: 1px solid #036;
                            height:40px;
                            text-align: left;
                            font-weight: bold;
                            font-size: 17px;
                            .symbolName {
                                padding-left: 35px;
                                background: no-repeat 0 100%;
                                letter-spacing: 0;
                            }
                            &.dataNum {
                                text-align:right;
                            }
                            &.coinName {
                                padding:0 0 0 10px;
                            }
                            &.up {
                                color: #f33;
                            }
                            &.down {
                                color: #06c;
                            }
                            &.dayBefore {
                                padding-right:30px;
                            }
                        }
                    }
                }
            }
        }
    }
    @media(max-width:1024px) {
        height:42rem;
        .container {
            width:100%;
            .main_wrap {
                display:flex;
                flex-direction:column;
                place-content:center flex-start;
                align-items:center;
                justify-content: flex-start;
                padding:20px 0;
                .login_wrap {
                    width: 100%;
                    top:40%;
                    .exchange_btn {
                        a {
                            width:80%;
                            margin: 0 auto;
                        }
                    }
                    .account_btn {
                        margin: 0;
                        margin-top : 1rem;
                        ul {
                            width :80%;
                            margin: 0 auto;
                            li {
                                width: 49%;
                                a {
                                    width: 100%;
                                }
                            }
                        }
                    }
                }
                .coin_wrap {
                    width:80%;
                    margin:40px 0 0 0;
                    height:250px;
                    .head_cont {
                        width:100%;
                        padding:0.8rem 0 0 0;
                        table {
                            th {
                                font-size:1.2rem;
                                height:2rem;
                                &.coinName {
                                    padding-left: 1.6rem;
                                }
                            }
                        }
                    }
                    .price_cont {
                        width:100%;
                        height:205px;
                        -webkit-overflow-scrolling: touch;
                        table {
                            td {
                                width:auto;
                                font-size:1.2rem;
                                &.coinName {
                                    width:10%;
                                    span {
                                        letter-spacing: 0;
                                        padding-left:25px;
                                    }
                                }
                                &.dataNum {
                                    width:63%;
                                    letter-spacing:-.5px;
                                    padding-right:15px;
                                }
                                &.dayBefore {
                                    width:33%;
                                    padding-right:15px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

const VisualText = styled.div`
    width:100%;
    overflow:hidden;
    margin:0 0 20px;
    h3 {
        font-size:46px;
        font-weight:bold;
        color:#fff;
    }
    p {
        font-size:20px;
        text-align: center;
        color:#fff;
        font-family:"Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
    }
    @media(max-width: 1024px) {
        h3 {
            font-size: 2rem;
            text-align: center;
        }
        p {
            text-align: center;
            font-size: 1.2rem;
            letter-spacing:-1px;
        }
    }
`

const Content = styled.div`
`

const InfoSection = styled.div`
    width:100%;
    /*height:100px;*/
    background:#f2f2f2;
    .container {
        width:1200px;
        height:100%;
        margin:0 auto;
        overflow:hidden;
        .exchange_view {
            width:100%;
            height:100%;
            box-sizing:border-box;
            .slick-slider {
                outline:none !important;
                height:100%;
                color:#333;
                padding:0 30px;
                .slick-list {
                    outline:none !important;
                    &:focus{outline:0;}
                    .roll_Box{
                        outline:none !important;
                    .roll-content {
                        outline:none !important;
                        height : 100px;
                        line-height : 100px;
                        margin: 0 auto;
                        text-align: center;
                        width: 1100px;
                        font-size: 25px;
                        font-weight: bold;
                        letter-spacing:-1px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        display:flex;
                        flex-direction:row;
                        place-content: center;
                        align-items: center;
                        justify-content: center;
                        &:focus{outline:0;}
                        a {
                            display: block;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            //width: 100%;
                            overflow: hidden;
                            text-decoration:none;
                            color:#000;
                        }
                        
                        .category {
                            color:#fff;
                            font-size:20px;
                            width:65px;s
                            height:30px;
                            line-height:30px;
                            display:inline-block;
                            padding:0 15px;
                            border-radius: 15px;
                            vertical-align: 5px;
                            margin:0 35px 0 0;
                            background:#80a8aa;
                            &.note {
                                background:#f39800;
                            }
                            &.event {
                                background:#005da7;
                            }
                            &.listed {
                                background:#c00;
                            }
                        }
                    }
                    }
                }
                .slick-prev {
                    width:30px;
                    height:60px;
                    left:0;
                    z-index: 19;
                    &:before {
                        display:block;
                        width:100%;
                        height:100%;
                        content:'';
                        background:url('https://static.bitnaru.com/v3_web/images/icon_prev.png') 0 0 no-repeat;
                    }
                }
                .slick-next {
                    width:50px;
                    height:60px;
                    right:0;
                    z-index: 19;
                    &:before {
                        content:'';
                        display:block;
                        width:100%;
                        height:100%;
                        background:url('https://static.bitnaru.com/v3_web/images/icon_next.png') 0 0 no-repeat;
                    }
                }
            }
        }
    }
    @media(max-width :1024px) {
        height: 4rem;
        .container {
            width: 100%;
            .exchange_view {
                .slick-slider {
                    .slick-prev, .slick-next {
                        height:4rem;
                        line-height:4rem;
                        &:before {
                            background-size: 1rem;
                            background-position: center;
                            opacity:1;
                        }
                    }
                    .slick-list {
                        .roll-content {
                            width: 100%;
                            height: 4rem;
                            line-height: 4rem;
                            font-size: 1rem;
                            .category {
                                font-size:0.8rem;
                                height:1.5rem;
                                line-height:1.5rem;
                                padding:0 1rem;
                                border-radius: 15px;
                                vertical-align: 0.1rem;
                                margin: 0 0.2rem 0 0;
                            }
                        }
                    }
                }
            }
        }
    }
`

const ExchangeInfo = styled.div`
    width:100%;
    overflow:hidden;
    padding:100px 0 30px;
    background:#fff;
    height: 1367px;
    .container_title{
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
        dl{
            margin-bottom: 130px;
            img{
                width:30%;
            }
            dt{
                font-size: 40px;
                font-weight: 700;
                color: #112434;
                text-align: center;
                margin-bottom: 50px;
                &:first-child{
                    margin-bottom: 0px;
                }
            }
            dd{
                margin-inline-start:unset;
                font-size: 25px;
                color: #112434;
                text-align: center;
            }
        }
    }
    .container {
        width: 1000px;
        margin: 0 auto;
        overflow: hidden;
        > div {
            width: 50%;
            box-sizing: border-box;
            overflow: hidden;
            //float: left;
            display:inline-table;
            margin: 0 0 170px;
            .thumb {
                width:100%;
                text-align:center;
                display:block;
                img {
                    vertical-align:top;
                    border:0 none;
                }
            }
            .txt_cont {
                width:100%;
            }
            dl {
                margin:30px auto 0;
                &.txt_cont_dl_1{
                    width:200px;
                }
                &.txt_cont_dl_2{
                    width:315px;
                }
                dt {
                    font-size: 25px;
                    line-height: 1.3em;
                    font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
                    color: #112434;
                    font-weight: bold;
                    word-break: keep-all;
                    margin: 0 0 25px;
                    text-align: center;
                    position: relative;
                    padding: 0 0 30px;
                    top: 50px;
                    opacity: 0;
                    transition: all .3s;
                    &:after {
                        content: '';
                        display: block;
                        width: 0;
                        height: 3px;
                        background: #3c92ca;
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        margin-left: -50px;
                        transition: all .2s .2s;
                    }
                    
                }
                dd {
                    width: 100%;
                    font-size: 20px;
                    font-weight: 500;
                    font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
                    word-break: keep-all;
                    color: #000000;
                    text-align: center;
                    transition: all .2s .4s;
                    position: relative;
                    top: 50px;
                    opacity: 0;
                    margin-inline-start:unset;
                }
            }
            &.txt_effect {
                dt {
                    opacity: 1;
                    top:0;
                    &:after {
                        width:101px;
                        height:8px;
                    }
                }
                dd {
                    top:0;
                    opacity:1;
                }
            }
        }
    }
    @media(max-width:1024px){
        display:none;
    }
`

const Features = styled.div`
    width: 100%;
    padding: 90px 0 50px;
    overflow: hidden;
    background: #ececec;
    h2 {
        position: relative;
        padding: 10px 0;
        font-size: 24px;
        font-weight: 700;
        color: #fff;
        &:before {
            position: absolute;
            bottom: 0;
            left: 0;
            display: block;
            width: 80px;
            height: 1px;
            content: '';
            background: #fff;
        }
        &:after {
            position: absolute;
            bottom: 0;
            left: 80px;
            display: block;
            width: 80px;
            height: 1px;
            content: '';
            background: #f73e2e;
        }
    }
    .grid_wrap {
        width: 1200px;
        margin: 0 auto;
        padding: 0 100px;
        box-sizing: border-box;
        .grid_item {
            position: relative;
            float: left;
            width: 400px;
            margin: 0 50px 50px;
            min-height: 460px;
            background: #fff;
            overflow: hidden;
            padding: 35px 15px 20px;
            box-sizing: border-box;
            box-shadow: 0 5px 30px #666;
            opacity: 0;
            top: 100px;
            transition: all .4s .2s;
            &:nth-child(3n) {
                transition: all .4s .4s;
            }
            &:nth-child(4n) {
                transition: all .4s .4s;
            }
            span {
                display: block;
                width: 40%;
                margin: 0 0 60px;
                font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
                font-weight: bold;
                font-size: 80px;
                line-height: 1em;
                color: #003366;
                cursor: default;
                position: relative;
                padding: 0 0 15px;
                -webkit-transition: all .3s;
                -o-transition: all .3s;
                transition: all .3s;
                &:after {
                    content: '';
                    width: 95px;
                    height: 7px;
                    background: #cfcfcf;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                }
            }
            h4 {
                margin: 0 0 30px;
                font-size: 24px;
                color: #003366;
                word-break: keep-all;
                cursor: default;
                font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
                font-weight: 900;
            }
            p {
                font-size: 18px;
                font-weight: bold;
                font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
                line-height: 1.6em;
                color: #333;
                word-break: keep-all;
                cursor: default;
            }
        }
        .txt_effect {
            opacity: 1;
            top: 0;
        }
    }
    
    @media(max-width:1024px){
        display:none;
        padding:0;
        .grid_wrap {
            width:100%;
            margin:0;
            padding:0;
            display:flex;
            flex-direction: column;
            place-content: center flex-start;
            align-items:center;
            justify-content: flex-start;
            .grid_item {
                float:none;
                width:80%;
                span {
                    font-size:3rem;
                }
                h4 {
                    font-size:1.4rem;
                }
                p {
                    font-size:1.2rem;
                }
            }
        }
    } 
`

const Security = styled.div`
   .security_level{
        width: 100%;
        overflow: hidden;
        border-bottom: 1px solid #ddd;
        padding: 20px 0;
        display: block;
        h3{
            font-size: 1.2rem;
            text-align: center;
            margin: 0 0 20px;
            i{
                    font-size: 26px;
                    color: #f7694d;
                    position: relative;
                    top: 4px;
                    margin-right: 5px;
            }
        }
        div{
            width: 200px;
            margin: 0 auto;
        }
        a{
            width: 200px;
            height: 34px;
            border: 1px solid #ddd;
            display: block;
            margin: 0 auto;
            text-align: center;
            line-height: 34px;
            transition: all .2s;
            cursor: pointer;
        }
   }
`
