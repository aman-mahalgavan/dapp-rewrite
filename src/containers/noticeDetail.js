import React, {Component} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import {isMobile} from "react-device-detect";
import Web3 from 'web3';
import Actions from '../actions/index';
import {Link} from 'react-router-dom'

class NoticeDetail extends Component{
    state={
        id:this.props.location
    }

    constructor(props) {
        super(props);

    }
    escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    componentDidMount() {

    }
    render() {
        const {FOOTER, BALANCES, DASHBOARD,NOTICE_TEXT} = this.props.languageConfig;
        let notice = [
            {
                title:NOTICE_TEXT.TXT_TITLE1,
                text:NOTICE_TEXT.TXT_TEXT1,
                date:'2019-01-03',
                id:0
            },
            {
                title:'Information on Plug(PLG) KRW market listing and listing event',
                date:'2018-12-14',
                id:1
            },
            {
                title:'DexNetwork(DNW) Event winner announcement',
                date:'2018-12-14',
                id:2
            },
            {
                title:'Infomation on Server Maintenace (14.12.18 4am ~ 2pm)',
                date:'2018-12-14',
                id:3
            },
            {
                title:'Infomation on the wallet opening and listing of Plug(PLG)',
                date:'2018-12-13',
                id:4
            },
            {
                title:'Infomation regarding ERC20 token wallet opening schedule',
                date:'2018-12-11',
                id:5
            },
            {
                title:'Pundi X(NPXS) December airdrop completed',
                date:'2018-12-11',
                id:6
            },
            {
                title:'BitNaru is under maintenance. (09.12.2018 21:50 ~ 09.12.2018 23:00)',
                date:'2018-12-10',
                id:7
            },
            {
                title:'Infomation on Taklimaken commission change, and wallet opening',
                date:'2018-12-10',
                id:8
            },
            {
                title:'Infomation on changing price unit for SRCOIN',
                date:'2018-12-07',
                id:9
            },
            {
                title:'Infomation regarding resuming DNW (BTCB) trading and event',
                date:'2018-12-06',
                id:10
            },

        ]
        const tab = [
            {
                title: FOOTER.NOTICE,
                href: "/noticeContainer"
            },
            {
                title: FOOTER.GUIDE,
                href: "/informationUse"
            },
            {
                title: FOOTER.FEE,
                href: "/feeInformation"
            },
            {
                title: FOOTER.TERMS,
                href: "/termsOfUse"
            },
            {
                title: FOOTER.PRIVACY_TEXT,
                href: "/privacyPolicy"
            },
            {
                title: FOOTER.LISTING,
                href: "/ListingRequest"
            }
        ]
        const lang = localStorage.getItem("lang");
        const url_string = window.location.href;
        const url = new URL(url_string);
        const id_test = url.searchParams.get("id");
        const result = notice.filter(elem => {
             if(elem.id == +id_test){
                 return elem.title;
             };
        })
        console.log('result : ', result);
        console.log("an",id_test)
        let titleField, contentsField;
        if(lang === "en"){
            titleField = "title_en"
            contentsField = "contents_en"
        }else{
            titleField = "title_ko"
            contentsField = "contents_ko"
        }
        return (
            <div>
                <div>
                    <NoticeDIV>
                        <section className="main" role="main">
                            <div id="boardView" className="board_common">
                                <div className="category_list">
                                    <ul className="navigation">
                                        { tab.map((item,index) => {
                                                return (
                                                    <li
                                                        className={item.title===FOOTER.NOTICE ? "active" : ""} key={index}
                                                    >
                                                        <Link to={item.href}>
                                                            {item.title}
                                                        </Link>
                                                    </li>

                                                )
                                            }
                                        )
                                        }
                                    </ul>
                                </div>
                                <div className="view_content">
                                    <div className="bo_title">
                                        {result.map((item)=>{
                                            return <h3>{item.title}</h3>

                                        }
                                        )}
                                        {result.map((item)=>{
                                                return <p>{item.date}</p>

                                            }
                                        )}
                                    </div>
                                    <div className="bo_content">
                                        {result.map((item)=>{
                                                return item.text

                                            }
                                        )}
                                    </div>
                                </div>
                                <div className="btn_wrap">
                                    <ul>
                                        <Link to={{
                                            pathname: '/noticeContainer',
                                        }}><li><span className="btn btn_small btn_col1">{DASHBOARD.LIST}</span></li></Link>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </NoticeDIV>


                </div>

            </div>
        );
    }
}

export default NoticeDetail;

const NoticeDIV = styled.div`
    width:100%;
margin : 0 auto;
background : #fff;
.main {
    width:1200px;
    margin-top:100px;
    margin : 0 auto;
    .board_common {
        .category_list {
            margin-top:110px;
            margin-bottom:40px;
            ul {
                height: 45px;
                background: #fff;
                overflow: hidden;
                text-align: center;
                display:flex;
                flex-direction: row;
                place-content: center space-between;
                align-items: center;
                justify-content: space-between;
                padding-inline-start: unset;
                li {
                    width: 25%;
                    font-size: 18px;
                    line-height: 42px;
                    font-weight: 500;
                    text-align: center;
                    list-style: none;
                    a {
                        color: #999;
                        line-height: 45px;
                        font-weight: bold;
                        text-decoration: none;
                    }
                    &.active {
                    border-bottom: 7px solid #364958;
                        a {
                            color: #364958;
                        }
                    }
                }
            }
        }
        .view_content {
            width: 100%;
            overflow: hidden;
            .board_navi {
                width: 100%;
                overflow: hidden;
                margin: 40px 0 20px;
                font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
                font-size: 17px;
                font-weight: bold;
                padding-left: 10px;
            }
            .bo_title {
                width: 100%;
                overflow: hidden;
                padding: 0 10px 10px;
                box-sizing: border-box;
                margin: 0 0 20px;
                border-bottom: 1px solid #003366;
                h3 {
                    float: left;
                    font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
                    font-size: 24px;
                    font-weight: bold;
                }
                p {
                    width: 100px;
                    float: right;
                    font-weight: 300;
                    line-height: 30px;
                }
            }
            .bo_content {
                width: 100%;
                overflow: hidden;
                padding: 15px 10px 60px;
                box-sizing: border-box;
                border-bottom: 1px solid #003366;
                word-break: break-all;
            }
        }
        .btn_wrap {
            width: 100%;
            overflow: hidden;
            margin: 20px 0 0;
            ul {
                float: right;
                li {
                    float: left;
                    margin-left: 10px;
                    &:first-child {
                        margin-left: 0;
                    }
                    list-style:none;
                    span {
                        display:block;
                        width: 60px;
                        background: #036;
                        color: #fff;
                        text-align:center;
                        height: 30px;
                        line-height: 30px;
                        cursor:pointer;
                    }
                }
            }
        }
    }
}
@media(max-width: 1024px) {
    .main {
        width: 100%;
        padding: 0 0.3rem;
        box-sizing: border-box;
        .board_common {
            .category_list{
                ul {
                    height: 3rem;
                    overflow: hidden;
                    }
                li {
                    width: 25%;
                    font-size: 1.1rem;
                    line-height: 3rem;
                    & a {
                        width: 100%;
                        height:3rem;
                        line-height: 3rem;
                    }
                    
                }
            }
            .view_content {
                .board_navi {
                     padding-left: 0.9rem;
                     font-size: 1.2rem;
                    a {
                        font-size: 1.2rem;
                    }
                }
                .bo_title {
                    h3 {
                        font-size: 1.5rem;
                    }
                    p {
                        text-align:right;
                    }
                }
            }
        }
    }
}
\`
`
