import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import dexhiLogo from "../../assets/images/Dexhi_white.png";


export default class FooterComponent extends React.Component {
    render() {
        const {language, FooterData} = this.props;
        const {FOOTER} = language;
        return (
          <Footer className="footer">
            <FooterNavi>
              <FooterNaviInner>
                <ListItem>
                  <Link to="/noticeContainer">
                    {FOOTER.NOTICE}
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/informationUse">
                    {FOOTER.GUIDE}
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/feeInformation">
                    {FOOTER.FEE}
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/termsOfUse">
                    {FOOTER.TERMS}
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/privacyPolicy">
                    {FOOTER.PRIVACY}
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/ListingRequest">
                    {FOOTER.LISTING}
                  </Link>
                </ListItem>
              </FooterNaviInner>
            </FooterNavi>
            <Contents>
              <ContentsInner>
                <Title>
                  <Link to="/" className="titleLink">
                    <TitleImage src={dexhiLogo} alt={FOOTER.MENU_TEXT_HOME} />
                  </Link>
                </Title>
                <FooterInfo>
                  <InfoBox>
                    <Item><strong>{FOOTER.ABOUT_TEXT}</strong></Item>
                    <Item dangerouslySetInnerHTML={{__html: FOOTER.CEO}} />
                    <Item>{FOOTER.ADDRESS}</Item>
                    <Item dangerouslySetInnerHTML={{__html: FOOTER.FOT_NUM1}} />
                  </InfoBox>
                  <InfoBox>
                    <InfoBoxTitle>{FOOTER.CSCENTER}</InfoBoxTitle>
                    <InfoBoxContents>
                      <div className="separate">
                        <InfoBoxItem dangerouslySetInnerHTML={{__html: FOOTER.TIME}} />
                        <strong style={{marginLeft: '-3px'}}>
                          <Link
                            to="/coinInfo"
                          >{FOOTER.INFO}
                          </Link>
                        </strong>
                        <strong>
                          <a
                            className="listing"
                            href={`/static/cloudflare/listing_${localStorage.getItem("lang")}.html`}
                            target="_blank"
                          >{FOOTER.LISTING}
                          </a>
                        </strong>

                      </div>
                      <div className="separate">
                        <InfoBoxItem dangerouslySetInnerHTML={{__html: FOOTER.TEL}} />
                        <InfoBoxItem>
                          <strong>Email :</strong> 
                          {' '}
                          <a
                            href="mailto:support@bitnaru.com"
                          >support@bitnaru.com
                          </a>
                        </InfoBoxItem>
                        <InfoBoxItem className="sns">

                          <a
                            href="javascript:void(0)"
                            onClick={() => window.open(FooterData.chatUrl)}
                          >
                            <i className="xi-kakaotalk" />
                            {FOOTER.CHAT}
                          </a>
                          <strong style={{marginLeft: '20px'}}>SNS : </strong>
                          <ul className="sns-list">
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    onClick={() => window.open(FooterData.chatUrl)}
                                  >
                                    <i className="xi-kakaotalk" />
                                  </a>
                              </li>
                            <li>
                                <a href={FooterData.sns.telegram.link} target="_blank">
                                    <i className="xi-telegram" />
                                  </a>
                              </li>
                            <li>
                                <a href={FooterData.sns.naver.link} target="_blank">
                                    <i className="xi-naver-square" />
                                  </a>
                              </li>
                            <li>
                                <a href={FooterData.sns.twitter.link} target="_blank">
                                    <i className="xi-twitter" />
                                  </a>
                              </li>
                          </ul>
                        </InfoBoxItem>
                      </div>
                    </InfoBoxContents>
                  </InfoBox>

                  <CopyRight>Copyright 2018 LinkerKorea Co., Ltd. All Rights Reserved.</CopyRight>
                </FooterInfo>
              </ContentsInner>
            </Contents>
          </Footer>
        )
    }
}

const Footer = styled.section`
    @media(max-width:1024px) {
        width:100%;
    }
`

const Title = styled.h2`
    float:left;
    width:150px;
    margin:0 30px 0 0;
    .titleLink {
        cursor: pointer;
    }
    @media(max-width:1024px) {
        margin: 0 13px;
        float:none;
    }
`

const TitleLink = styled.a`
`

const TitleImage = styled.img`
    width:100%;
`

const Contents = styled.div`
    padding:35px 0 25px;
    width:100%;
    background:#112434;
    overflow:hidden;
    @media(max-width: 1024px) {
        padding:1rem 0;
    }
`

const FooterInfo = styled.div`
    width:1000px;
    float:left;
    color:#fff;
    @media(max-width:1024px) {
        margin-left: 1rem;
        width:90%;
    }
`

const InfoBox = styled.div`
    width:100%;
    overflow:hidden;
    color:#fff;
    margin:0 0 20px 0;
    font-family:"Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
    @media(max-width:1024px) {
        margin-top: 1rem;
    }
`

const InfoBoxItem = styled.div`
    float:left;
    margin:0 20px 0 0;
    @media(max-width:1024px) {
        line-height: 1.5rem;
        margin:0 40px 0 0;
        &.sns {
            margin:0;
        }
    }
`

const InfoBoxTitle = styled.h3`
    float:left;
    color:#fff;
    font-weight:bold;
    margin:0 20px 0 0;
    font-size:17px;
    letter-spacing:-.25px;
    font-family:"Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
    @media(max-width: 1024px) {
        font-size: 1.2rem;
    }
`

const InfoBoxContents = styled.div`
    float:left;
    letter-spacing:-.25px;
    .listing {
        display:inline-block;
        margin-left : 17px;
    }
    .separate {
        overflow:hidden;
        width:100%;
        margin:0 0 8px 0;
        a {
            color:#fff;
            i {
                font-size:17px;
                margin:0 2px 0 0;
                vertical-align:top;
            }
        }
        .sns-list {
            display:inline-block;
            vertical-align:top;
            list-style: none;
            li {
                float:left;
                margin:0 5px 0 0;
                font-size:17px;
                i {
                    margin:0 3px 0 0;
                    position:relative;
                    vertical-align:top;
                }
            }
        }
    }
    @media(max-width: 1024px) {
        .listing {
            margin:0 0 0 20px;
        }
    }
    
`

const Item = styled.span`
    margin:0 20px 0 0;
    font-weight:400;
    font-size:15px;
    letter-spacing:-.25px;
    @media(max-width:1024px) {
        display:inline-block;
        font-size:1rem;
        height: 1.5rem;
        :first-child {
            width:10rem;
            float:left;
            margin: 0;
        }
    }
`

const ContentsInner = styled.div`
    width : 1260px;
    margin:0 auto;
    overflow:hidden;
    @media(max-width:1024px) {
        width:100%;
    }
`

const CopyRight = styled.div`
    width:100%;
    overflow:hidden;
    font-size:14px;
    color:#ddd;
    letter-spacing:-.25px;
    @media(max-width:1024px) {
        font-size: 1rem;
    }
`

const FooterNavi = styled.div`
    background:#fff;
    box-shadow: #ccc 0px 3px 16px;
`

const FooterNaviInner = styled.ul`
    width:1100px;
    height:50px;
    margin:0 auto;
    overflow:hidden;
    @media (max-width:1024px) {
        display:none;
    }
    a{
        font-family:"Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
    }
`

const ListItem = styled.li`
    float:left;
    width:16%;
    font-size:15px;
    font-weight:700;
    text-align:center;
    height:50px;
    line-height:50px;
    list-style:none;
        a{
         color:#636363;
         text-decoration:none;
        }
    //.active{
    //  font-weight: 1000;
    //}
`
