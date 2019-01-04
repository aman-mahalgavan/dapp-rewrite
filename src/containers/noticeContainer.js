import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import {isMobile} from "react-device-detect";
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import Actions from '../actions/index';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretDown, faSearch} from '@fortawesome/free-solid-svg-icons';

const hrefName=[
    "/notice",
    "/informationUse",
    "/feeInformation",
    "/termsOfUse",
    "/privacyPolicy",
    "/faq"
]

export default class extends React.Component{

    state = ({
        page: 1,
        category: "All",
        activeTab: 0,
        searchText : '',
    })

    constructor(props) {
        super(props);

    }
    static async getInitialProps ({ query: { category, activeTab, page } }) {
        let response;
        let NOTICE = [];
        try{
            response = await fetch("https://apiex.bitnaru.com/v1/board/api/list");
            NOTICE = await response.json();
        }catch(e){
            console.log(e);
        }finally{
            return {activeTab, category, page, NOTICE}
        }
    }
    componentDidMount(){

    }
    escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }


    render() {
        const {NOTICE} = this.props;
        const {FOOTER, BALANCES, DASHBOARD} = this.props.languageConfig;
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
        let titleField;
        const reg = this.escapeRegExp(this.state.searchText);

        let page = [];
        const startPage = this.state.page - 2 < 1 ? 1 : this.state.page - 2;

        let timer=null;
        const self = this;
        let notice = [
            {
                title:'Information on Plug(PLG) KRW market listing and listing event',
                date:'2018-12-14'
            },
            {
                title:'DexNetwork(DNW) Event winner announcement',
                date:'2018-12-14'
            },
            {
                title:'Infomation on Server Maintenace (14.12.18 4am ~ 2pm)',
                date:'2018-12-14'
            },
            {
                title:'Infomation on the wallet opening and listing of Plug(PLG)',
                date:'2018-12-13'
            },
            {
                title:'Infomation regarding ERC20 token wallet opening schedule',
                date:'2018-12-11'
            },
            {
                title:'Pundi X(NPXS) December airdrop completed',
                date:'2018-12-11'
            },
            {
                title:'BitNaru is under maintenance. (09.12.2018 21:50 ~ 09.12.2018 23:00)',
                date:'2018-12-10'
            },
            {
                title:'Infomation on Taklimaken commission change, and wallet opening',
                date:'2018-12-10'
            },
            {
                title:'Infomation on changing price unit for SRCOIN',
                date:'2018-12-07'
            },
            {
                title:'Infomation regarding resuming DNW (BTCB) trading and event',
                date:'2018-12-06'
            },

        ]

        return (
            <div>
                <div>
                    <Notice>
                        <section className="main" role="main">
                            <div id="boardList" className="board_common">
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
                                <div className='notice_title'>
                                        <h1>{FOOTER.NOTICE}</h1>
                                </div>
                                <div className="search_wrap">
                                    <div>
                                        <input type="text" className="search_word" id="searchWord" placeholder={DASHBOARD.SEARCH}
                                               name="searchWord" onChange={(event) => {
                                            let target = event.target.value
                                            if(timer){
                                                clearTimeout(timer)
                                            }
                                            timer = setTimeout(function(){
                                                self.setState({searchText : target, page:1})
                                            },200);
                                        }
                                        }/><a href="javascript:void(0)"><span className='Fa_icon'><FontAwesomeIcon icon={faSearch} /></span></a>
                                    </div>
                                </div>
                                <div className="notice_wrap">
                                    <div className="bo_navi">
                                    </div>
                                    <table>
                                        <tbody>
                                        {
                                            notice.length > 0 ?
                                                notice.map((item, index) => {
                                                        var newDate = new Date(item.insert_dt);
                                                        var dateFormat = newDate.getFullYear() + ". " +
                                                            (newDate.getMonth()+1) + ". " +
                                                            newDate.getDate()
                                                        return index >= ((this.state.page - 1) * 10)  && index <= this.state.page * 10 -1 ?
                                                            (
                                                                <tr key={index}>
                                                                    <td className="notice_title">
                                                                    <span><a>{item.title}</a></span>
                                                                    </td>
                                                                    <td className="date">{item.date}</td>
                                                                </tr>
                                                            ) : null
                                                    }
                                                ) :
                                                <tr colSpan="1">
                                                    <td className="no-data">&quot;{this.state.searchText}&quot; 의 검색 결과가 없습니다.</td>
                                                </tr>
                                        }
                                        </tbody>
                                    </table>
                                    <div className="paging">
                                        <ul>
                                            1 &nbsp;  2  &nbsp; 3
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Notice>
                </div>
            </div>
        )
    }
}
const Notice = styled.div`
    background : #fff;
    width:100%;
    .board_common {
        width: 1200px;
        min-height: 500px;
        margin: 0 auto;
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
        .search_wrap {
            overflow: hidden;
            display:flex;
            float:right;
            position:relative;
            top:18px;
            div {
                
                input {
                    width: 410px;
                    height: 42px;
                    border : 1px solid #d9d9d9;
                    box-sizing: border-box;
                    text-indent: 10px;
                    font-size: 16px;
                    outline: none;
                    //background: linear-gradient(to bottom, #ccc, #fff 7%);
                    -webkit-appearance: none;
                    border-radius: 0;
                }
                a {
                    width: 50px;
                    height: 42px;
                    background: #003366;
                    color: #fff;
                    display: block;
                    float: right;
                    text-align: center;
                    .Fa_icon{
                        font-size:22px;
                        line-height:40px;
                    }
                }
            }
        }
        .notice_title{
            display:flex;
            float:left;
            color:#364958;
            font-size:17px;
        }
        .notice_wrap {
            width: 100%;
            overflow: hidden;
            .bo_navi {
                width: 100%;
                overflow: hidden;
                border-bottom: 2px solid #003366;
                box-sizing: border-box;
                font-size: 15px;
                p {
                    font-size: 15px;
                    color: #454545;
                    font-weight: bold;
                }
            }
            table {
                width: 100%;
                margin-top: 90px;
                overflow: hidden;
                border-top: 1px solid #ccc;
                border-spacing:unset;
                tr {
                    td {
                        width: 100%;
                        border-bottom: 1px solid #ccc;
                        padding: 10px 35px 10px 35px;
                        &.category {
                            width: 150px;
                            font-size: 15px;
                            color: #1a1a1a;
                            font-weight:bold;
                            text-align: center;
                        }
                        &.notice_title {
                            font-size: 14px;
                            color: #1a1a1a;
                            word-break: break-all;
                            font-weight: 700;
                            span {
                                width: 800px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                display: block;
                                a:hover {
                                    color: #003366;
                                }
                            }
                        }
                        &.date {
                            text-align: right;
                            font-size: 13px;
                            font-weight: 700;
                            color: #999999;
                        }
                        &.no-data {
                            text-align:center;
                        }
                    }
                }
            }
            .paging {
                width: 300px;
                margin : 0 auto;
                height:50px;
                margin-top : 50px;
                text-align : center;
                ul {
                    display:flex;
                    flex-direction: row;
                    place-content: center;
                    align-items: center;
                    justify-content: center;
                    li {
                        font-size : 16px;
                        margin : 8px;
                        cursor : pointer;
                        color: #999;
                        font-weight: bold;    
                        &.selected {
                            font-weight : bold;
                            color: #036;
                        }
                    }
                }
            }
        }
    }       
    @media(max-width : 1024px) {
        width : 100%;
        .board_common {
            width: 100%;
            min-width: auto;
            margin: 0 auto 50px;
            .category_list{
                ul {
                    height: 3rem;
                    overflow: hidden;
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
            }
            .search_wrap {
                width: 100%;
                padding: 1.5rem 0;
                div {
                    display:flex;
                    flex-direction: row;
                    place-content: center space-around;
                    align-items:center;
                    justify-content: space-around;
                    box-sizing: border-box;
                    padding:0 5px;
                    input {
                        width: 100%;
                        height: 42px;
                        text-indent: 0.5rem;
                        font-size: 1rem;
                    }
                }
            }
            .notice_wrap {
                width: 100%;
                padding: 0 5px;
                overflow: hidden;
                box-sizing: border-box;
                .bo_navi {
                    width: 100%;
                    font-size: 1rem;
                    p {
                        font-size: 1rem;
                    }
                }
                table {
                    width: 100%;
                    tr {
                        td {
                            padding: 5px;
                            &.category {
                                width: 6rem;
                                font-size: 1rem;
                            }
                            &.notice_title {
                                width: auto;
                                font-size: 1rem;
                                color: #1a1a1a;
                                span {
                                    width: 95%;
                                    overflow: hidden;
                                    white-space: normal;
                                    a:hover {
                                        color: #003366;
                                    }
                                }
                            }
                            &.date {
                                width: 6rem;
                                font-size: 0.8rem;
                            }
                        }
                    }
                }
                .paging {
                    width: 25%;
                    height:2rem;
                    margin: 45px auto 0;
                    text-align : center;
                
                    li {
                        display:inline;
                        font-size : 1rem;
                        margin : 0.5rem; 
                        &.selected {
                            color: #003366;
                            }
                        }
                    }
                }
            }  
        }
`
