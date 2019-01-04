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

export default class extends React.Component{
    static defaultProps = {
        notice: true
    }

    goTop = () => {
        window.scrollTo(0, 0);
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {FOOTER, TERMS} = this.props.languageConfig;
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
        return (
            <div>
                <div>
                    <Terms>
                        <section className="terms" role="main">
                            <div className="category_list">
                                <ul className="navigation">
                                    { tab.map((item,index) => {
                                            return (
                                                <li
                                                    className={item.title===FOOTER.TERMS ? "active" : ""} key={index}
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
                            <div className="termsTitle">
                                <h2>{FOOTER.TERMS_TEXT}</h2>
                            </div>
                            <div className="content">
                                <h4>{TERMS.CHAPTER1_TITLE}</h4>

                                <h5>{TERMS.ARTICLE1_TITLE}</h5>

                                <p>{TERMS.ARTICLE1_TXT}</p>


                                <h5>{TERMS.ARTICLE2_TITLE}</h5>

                                <ul>
                                    <li>{TERMS.ARTICLE2_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE2_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE2_LIST3}
                                    </li>
                                    <li>{TERMS.ARTICLE2_LIST4}
                                    </li>
                                </ul>
                                <h5>{TERMS.ARTICLE3_TITLE}</h5>
                                <p>{TERMS.ARTICLE3_TXT}</p>
                                <h5>{TERMS.ARTICLE4_TITLE}</h5>
                                <p>{TERMS.ARTICLE4_TXT}</p>

                                <ul>
                                    <li>{TERMS.ARTICLE4_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE4_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE4_LIST3}
                                    </li>
                                    <li>{TERMS.ARTICLE4_LIST4}
                                    </li>
                                    <li>{TERMS.ARTICLE4_LIST5}
                                    </li>
                                    <li>{TERMS.ARTICLE4_LIST6}
                                    </li>
                                    <li>{TERMS.ARTICLE4_LIST7}
                                    </li>
                                </ul>
                                <h4>{TERMS.CHAPTER2_TITLE}</h4>
                                <h5>{TERMS.ARTICLE5_TITLE}</h5>
                                <ul>
                                    <li>{TERMS.ARTICLE5_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE5_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE5_LIST3}
                                    </li>
                                    <li>{TERMS.ARTICLE5_LIST4}
                                    </li>
                                    <li>{TERMS.ARTICLE5_LIST5}
                                    </li>
                                    <li>{TERMS.ARTICLE5_LIST6}
                                    </li>
                                </ul>
                                <h5>{TERMS.ARTICLE6_TITLE}</h5>
                                <ul>
                                    <li>{TERMS.ARTICLE6_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE6_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE6_LIST3}
                                    </li>
                                    <li>{TERMS.ARTICLE6_LIST4}
                                    </li>
                                    <li>{TERMS.ARTICLE6_LIST5}
                                    </li>
                                </ul>
                                <h5>{TERMS.ARTICLE7_TITLE}</h5>
                                <ul>
                                    <li>{TERMS.ARTICLE7_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE7_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE7_LIST3}
                                    </li>
                                    <li>{TERMS.ARTICLE7_LIST4}
                                    </li>
                                    <li>{TERMS.ARTICLE7_LIST5}
                                    </li>
                                </ul>
                                <h5>{TERMS.ARTICLE8_TITLE}</h5>
                                <ul>
                                    <li>{TERMS.ARTICLE8_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE8_LIST2}
                                    </li>
                                    <ul>
                                        <li dangerouslySetInnerHTML={{__html: TERMS.ARTICLE8_LIST2_1}}>
                                        </li>
                                        <li dangerouslySetInnerHTML={{__html: TERMS.ARTICLE8_LIST2_2}}>
                                        </li>
                                        <li dangerouslySetInnerHTML={{__html: TERMS.ARTICLE8_LIST2_3}}>
                                        </li>
                                    </ul>
                                    <li>{TERMS.ARTICLE8_LIST3}
                                    </li>
                                    <li>
                                        <ul>
                                            <li>{TERMS.ARTICLE8_LIST3_1}
                                            </li>
                                            <li>{TERMS.ARTICLE8_LIST3_2}
                                            </li>
                                            <li>{TERMS.ARTICLE8_LIST3_3}
                                            </li>
                                            <li>{TERMS.ARTICLE8_LIST3_4}
                                            </li>
                                            <li>{TERMS.ARTICLE8_LIST3_5}
                                            </li>
                                            <li>{TERMS.ARTICLE8_LIST3_6}
                                            </li>
                                            <li>{TERMS.ARTICLE8_LIST3_7}
                                            </li>
                                            <li>{TERMS.ARTICLE8_LIST3_8}
                                            </li>
                                            <li>{TERMS.ARTICLE8_LIST3_9}
                                            </li>
                                            <li>{TERMS.ARTICLE8_LIST3_10}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <h5>{TERMS.ARTICLE9_TITLE}</h5>
                                <ul>
                                    <li>{TERMS.ARTICLE9_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE9_LIST2}
                                    </li>
                                    <li>
                                        <ul>
                                            <li>{TERMS.ARTICLE9_LIST2_1}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_2}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_3}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_4}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_5}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_6}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_7}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_8}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_9}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_10}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_11}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_12}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_13}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_14}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_15}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_16}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_17}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_18}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_19}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_10}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_21}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_22}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST2_23}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>{TERMS.ARTICLE9_LIST3}
                                        <ul>
                                            <li>{TERMS.ARTICLE9_LIST3_1}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST3_2}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>{TERMS.ARTICLE9_LIST4}</li>
                                    <li>
                                        <ul>
                                            <li>{TERMS.ARTICLE9_LIST4_1}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST4_2}
                                            </li>
                                            <li>{TERMS.ARTICLE9_LIST4_3}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <h5>{TERMS.ARTICLE10_TITLE}</h5>
                                <ul>
                                    <li>{TERMS.ARTICLE10_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE10_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE10_LIST3}
                                    </li>
                                </ul>
                                <h4>{TERMS.CHAPTER3_TITLE}</h4>
                                <h5>{TERMS.ARTICLE11_TITLE}</h5>
                                <ul>
                                    <li>{TERMS.ARTICLE11_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE11_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE11_LIST3}
                                    </li>
                                    <li>{TERMS.ARTICLE11_LIST4}
                                    </li>
                                    <li>{TERMS.ARTICLE11_LIST5}
                                    </li>
                                </ul>


                                <h5>{TERMS.ARTICLE12_TITLE}</h5>

                                <p>{TERMS.ARTICLE12_TXT}</p>

                                <ul>
                                    <li>{TERMS.ARTICLE12_LIST1}</li>
                                    <li>{TERMS.ARTICLE12_LIST2}</li>
                                    <li>{TERMS.ARTICLE12_LIST3}
                                    </li>
                                </ul>


                                <h5>{TERMS.ARTICLE13_TITLE}</h5>

                                <p>{TERMS.ARTICLE13_TXT}</p>


                                <h4>{TERMS.CHAPTER4_TITLE}</h4>

                                <h5>{TERMS.ARTICLE14_TITLE}</h5>

                                <ul>
                                    <li>{TERMS.ARTICLE14_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE14_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE14_LIST3}
                                    </li>
                                    <li>{TERMS.ARTICLE14_LIST4}
                                    </li>
                                </ul>


                                <h5>{TERMS.ARTICLE15_TITLE}</h5>

                                <ul>
                                    <li>{TERMS.ARTICLE15_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE15_LIST2}
                                    </li>
                                </ul>


                                <h5>{TERMS.ARTICLE16_TITLE}</h5>

                                <ul>
                                    <li>{TERMS.ARTICLE16_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE16_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE16_LIST3}
                                    </li>

                                    <li>
                                        <ul>
                                            <li>{TERMS.ARTICLE16_LIST3_01}
                                            </li>
                                            <li>{TERMS.ARTICLE16_LIST3_02}
                                            </li>
                                            <li>{TERMS.ARTICLE16_LIST3_03}
                                            </li>
                                            <li>{TERMS.ARTICLE16_LIST3_04}
                                            </li>
                                        </ul>
                                    </li>

                                    <li>{TERMS.ARTICLE16_LIST4}
                                    </li>
                                    <li>{TERMS.ARTICLE16_LIST5}
                                    </li>
                                </ul>


                                <h5>{TERMS.ARTICLE17_TITLE}</h5>

                                <ul>
                                    <li>{TERMS.ARTICLE17_LIST1}
                                    </li>

                                    <li>
                                        <ul>
                                            <li>{TERMS.ARTICLE17_LIST1_01}
                                            </li>
                                            <li>{TERMS.ARTICLE17_LIST1_02}
                                            </li>
                                        </ul>
                                    </li>

                                    <li>{TERMS.ARTICLE17_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE17_LIST3}
                                    </li>
                                </ul>


                                <h5>{TERMS.ARTICLE18_TITLE}</h5>

                                <ul>
                                    <li>{TERMS.ARTICLE18_LIST1}
                                        <ul>
                                            <li>{TERMS.ARTICLE18_LIST1_01}
                                            </li>
                                            <li>{TERMS.ARTICLE18_LIST1_02}
                                            </li>
                                            <li>{TERMS.ARTICLE18_LIST1_03}
                                            </li>
                                            <li>{TERMS.ARTICLE18_LIST1_04}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>{TERMS.ARTICLE18_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE18_LIST3}
                                    </li>
                                </ul>

                                <h5>{TERMS.ARTICLE19_TITLE}</h5>

                                <ul>
                                    <li>{TERMS.ARTICLE19_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE19_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE19_LIST3}
                                    </li>
                                </ul>

                                <h4>{TERMS.CHAPTER5_TITLE}</h4>

                                <h5>{TERMS.ARTICLE20_TITLE}</h5>
                                <ul>
                                    <li>{TERMS.ARTICLE20_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE20_LIST2}
                                        <ul>
                                            <li>{TERMS.ARTICLE20_LIST2_1}
                                            </li>
                                            <li>{TERMS.ARTICLE20_LIST2_2}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>{TERMS.ARTICLE20_LIST3}

                                        <ul>
                                            <li>{TERMS.ARTICLE20_LIST3_1}
                                            </li>
                                            <li>{TERMS.ARTICLE20_LIST3_2}
                                            </li>
                                            <li>{TERMS.ARTICLE20_LIST3_3}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>{TERMS.ARTICLE20_LIST4}

                                        <ul>
                                            <li>{TERMS.ARTICLE20_LIST4_1}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <h5>{TERMS.ARTICLE21_TITLE}</h5>
                                <table>
                                    <thead>
                                    <tr>
                                        <th className="terms_type1">{TERMS.ARTICLE21_TABLE_TITLE1}
                                        </th>
                                        <th className="terms_type2">{TERMS.ARTICLE21_TABLE_TITLE2}
                                        </th>
                                        <th className="terms_type3">{TERMS.ARTICLE21_TABLE_TITLE3}
                                        </th>
                                        <th className="terms_type4">{TERMS.ARTICLE21_TABLE_TITLE4}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{TERMS.ARTICLE21_TABLE_CONT1}
                                        </td>
                                        <td dangerouslySetInnerHTML={{__html: TERMS.ARTICLE21_TABLE_CONT2}}>

                                        </td>
                                        <td dangerouslySetInnerHTML={{__html: TERMS.ARTICLE21_TABLE_CONT3}}>

                                        </td>
                                        <td>{TERMS.ARTICLE21_TABLE_CONT4}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{TERMS.ARTICLE21_TABLE_CONT5}</td>
                                        <td dangerouslySetInnerHTML={{__html: TERMS.ARTICLE21_TABLE_CONT6}}>

                                        </td>
                                        <td dangerouslySetInnerHTML={{__html: TERMS.ARTICLE21_TABLE_CONT7}}>
                                        </td>
                                        <td>{TERMS.ARTICLE21_TABLE_CONT8}</td>
                                    </tr>
                                    <tr>
                                        <td>{TERMS.ARTICLE21_TABLE_CONT9}
                                        </td>
                                        <td>{TERMS.ARTICLE21_TABLE_CONT10}

                                        </td>
                                        <td dangerouslySetInnerHTML={{__html: TERMS.ARTICLE21_TABLE_CONT11}}>

                                        </td>
                                        <td>{TERMS.ARTICLE21_TABLE_CONT12}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <ul>
                                    <li>{TERMS.ARTICLE21_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE21_LIST2}
                                    </li>
                                </ul>


                                <h5>{TERMS.ARTICLE22_TITLE}</h5>

                                <ul>
                                    <li>{TERMS.ARTICLE22_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE22_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE22_LIST3}
                                    </li>
                                </ul>


                                <h4>{TERMS.CHAPTER6_TITLE}</h4>

                                <h5>{TERMS.ARTICLE23_TITLE}</h5>

                                <ul>
                                    <li>{TERMS.ARTICLE23_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE23_LIST2}
                                    </li>
                                </ul>


                                <h5>{TERMS.ARTICLE24_TITLE}</h5>

                                <ul>
                                    <li>{TERMS.ARTICLE24_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE24_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE24_LIST3}
                                    </li>
                                    <li>{TERMS.ARTICLE24_LIST4}
                                    </li>
                                    <li>{TERMS.ARTICLE24_LIST5}
                                    </li>
                                    <li>{TERMS.ARTICLE24_LIST6}
                                    </li>
                                    <li>{TERMS.ARTICLE24_LIST7}
                                    </li>
                                    <li>{TERMS.ARTICLE24_LIST8}
                                    </li>
                                    <li>{TERMS.ARTICLE24_LIST9}
                                    </li>

                                    <li>
                                        <ul>
                                            <li>{TERMS.ARTICLE24_LIST9_1}
                                            </li>
                                            <li>{TERMS.ARTICLE24_LIST9_2}
                                            </li>
                                            <li>{TERMS.ARTICLE24_LIST9_3}
                                            </li>
                                            <li>{TERMS.ARTICLE24_LIST9_4}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>

                                <h4>{TERMS.CHAPTER7_TITLE}</h4>

                                <h5>{TERMS.ARTICLE25_TITLE}</h5>

                                <ul>
                                    <li>{TERMS.ARTICLE25_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE25_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE25_LIST3}
                                    </li>
                                    <li>{TERMS.ARTICLE25_LIST4}
                                    </li>
                                    <li>{TERMS.ARTICLE25_LIST5}
                                    </li>
                                    <li>{TERMS.ARTICLE25_LIST6}
                                    </li>
                                    <li>{TERMS.ARTICLE25_LIST7}
                                    </li>

                                    <li>
                                        <ul>
                                            <li>{TERMS.ARTICLE25_LIST7_1}
                                            </li>
                                            <li>{TERMS.ARTICLE25_LIST7_2}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>


                                <h4>{TERMS.CHAPTER8_TITLE}</h4>

                                <h5>{TERMS.ARTICLE26_TITLE}</h5>

                                <ul>
                                    <li>{TERMS.ARTICLE26_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE26_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE26_LIST3}
                                    </li>
                                    <li>
                                        <ul>
                                            <li>{TERMS.ARTICLE26_LIST3_1}
                                            </li>
                                            <li>{TERMS.ARTICLE26_LIST3_2}
                                            </li>
                                            <li>{TERMS.ARTICLE26_LIST3_3}
                                            </li>
                                            <li>{TERMS.ARTICLE26_LIST3_4}
                                            </li>
                                            <li>{TERMS.ARTICLE26_LIST3_5}
                                            </li>
                                            <li>{TERMS.ARTICLE26_LIST3_6}
                                            </li>
                                            <li>{TERMS.ARTICLE26_LIST3_7}
                                            </li>
                                            <li>{TERMS.ARTICLE26_LIST3_8}
                                            </li>
                                            <li>{TERMS.ARTICLE26_LIST3_9}
                                            </li>
                                            <li>{TERMS.ARTICLE26_LIST3_10}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>{TERMS.ARTICLE26_LIST4}
                                    </li>
                                    <li>{TERMS.ARTICLE26_LIST5}
                                    </li>
                                    <li>{TERMS.ARTICLE26_LIST6}
                                    </li>
                                    <li>{TERMS.ARTICLE26_LIST7}
                                    </li>
                                </ul>


                                <h5>{TERMS.ARTICLE27_TITLE}</h5>

                                <ul>
                                    <li>{TERMS.ARTICLE27_LIST1}
                                    </li>
                                    <li>
                                        <ul>
                                            <li>{TERMS.ARTICLE27_LIST1_1}
                                            </li>
                                            <li>{TERMS.ARTICLE27_LIST1_2}
                                            </li>
                                            <li>{TERMS.ARTICLE27_LIST1_3}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>{TERMS.ARTICLE27_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE27_LIST3}
                                    </li>
                                    <li>{TERMS.ARTICLE27_LIST4}
                                    </li>
                                    <li>{TERMS.ARTICLE27_LIST5}
                                    </li>
                                    <li>{TERMS.ARTICLE27_LIST6}
                                    </li>
                                </ul>


                                <h5>{TERMS.ARTICLE28_TITLE}</h5>

                                <ul>
                                    <li>{TERMS.ARTICLE28_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE28_LIST2}
                                    </li>
                                    <li>{TERMS.ARTICLE28_LIST3}
                                    </li>
                                </ul>

                                <h5>{TERMS.ARTICLE29_TITLE}</h5>
                                <ul>
                                    <li>{TERMS.ARTICLE29_LIST1}
                                    </li>
                                    <li>{TERMS.ARTICLE29_LIST2}
                                    </li>
                                </ul>


                                <b>{TERMS.ATTACHMENT}</b>
                                <p>{TERMS.ATTACHMENT_TXT}</p>
                            </div>
                        </section>
                        <button className="topAnchor" onClick={this.goTop}>
                            <i className="xi-caret-up"></i>
                        </button>
                    </Terms>

                </div>

            </div>
        )
    }
}

const Terms = styled.div`
    width:100%;
    margin : 0 auto;
    background : #fff;
    .topAnchor {
        position:fixed;
        bottom: 2rem;
        right: 2rem;
        display:block;
        width:40px;
        height:40px;
        background:#036;
        color:#fff;
        border-radius: 5px;
        cursor: pointer;
        border:1px solid #fff;
    }
    .terms {
        width:1200px;
        margin: 0 auto;
        .category_list {
            margin-top:110px;
            margin-bottom:40px;
            ul {
                list-style:none;
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
        .termsTitle {
            width: 1200px;
            overflow: hidden;
            margin: 30px 0 30px;
            padding: 0 0 5px;
            border-bottom: 2px solid #003366;
            h2 {
                font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
                font-size: 28px;
                font-weight: bold;
                color: #003366;
            }
        }
        .content {
            width: 100%;
            overflow: hidden;
            padding: 0 10px 20px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            margin: 0 0 50px;
            h4 {
                font-size: 1.4rem;
                font-weight: 700;
                display: table;
                border-bottom: 1px solid #000;
                padding: 20px 0 0;
                margin: 0 0 15px;
            }
            h5 {
                font-size: 1.2rem;
                font-weight: 700;
                margin: 20px 0 10px;
            }
            p {
                font-size: 1rem;
                line-height: 1.6em;
                word-break: keep-all;
                margin: 0 0 8px;
                font-weight: 300;
            }
            ul {
                list-style:none;
                padding-inline-start: unset;
                li {
                    font-size: 1rem;
                    line-height: 1.6em;
                    margin: 0 0 15px;
                    word-break: keep-all;
                    ul {
                        li {
                            padding-left: 20px;
                            line-height: 1.6em;
                            margin: 3px 0;
                            font-weight: 300;
                        }
                    }
                }
            }
            table {
                width: 100%;
                overflow: hidden;
                margin: 0 0 20px;
                tr {
                    th {
                        padding: 5px 10px;
                        background: lightgrey;
                        border: 1px solid #000;
                        font-size: 1rem;
                        text-align: center;
                    }
                    td {
                        padding: 5px;
                        border: 1px solid #000;
                        font-size: 1rem;
                        word-break: keep-all;
                    }
                }
            }
            .terms_type1 {
                width: 20%;
            }
            .terms_type2 {
                width: 40%;
            }
            .terms_type3 {
                width: 20%;
            }
            .terms_type4 {
                width: 20%;
            }
        }   
    }
    @media(max-width: 1024px) {
        .terms {
            width:100%;
            padding: 0 0.8rem;
            box-sizing: border-box;
            .termsTitle {
                width: 100%;
                border-bottom: 1px solid #003366;
                h2 {
                    font-size: 1.6rem;
                    font-weight: normal;
                }
            }
            .content {
                width: 100%;
                overflow: hidden;
                -webkit-overflow-scrolling: touch;
                h4 {
                  font-size: 1.3rem;
                }
                 h5 {
                    font-size: 1.2rem;
                }
                p {
                    font-size: 1rem;
                    line-height: 1.6em;
                }
                ul {
                    li {
                        font-size: 1rem;
                        line-height: 1.6em;
                        ul {
                            li {
                                padding-left: 20px;
                                line-height: 1.6em;
                            }
                        }
                    }
                }
                table {
                    width: 100%;
                    overflow: hidden;
                    tr {
                        th {
                            font-size: 1rem;
                        }
                        td {
                            font-size: 0.9rem;
                            font-weight: bold;
                        }
                    }
                }
            }   
        }
    }
`
