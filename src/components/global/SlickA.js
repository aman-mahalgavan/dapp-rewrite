import React from 'react'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'


export class SlickA extends React.Component{
    state = {
        notice:[
            {
                title:"Opening of DEXHI demo version",
                date:'2019-01-03',
                _id:0
            },
            {
                title:'Information on Plug(PLG) KRW market listing and listing event',
                date:'2018-12-14',
                _id:1
            },
            {
                title:'DexNetwork(DNW) Event winner announcement',
                date:'2018-12-14',
                _id:2
            },
            {
                title:'Infomation on Server Maintenace (14.12.18 4am ~ 2pm)',
                date:'2018-12-14',
                _id:3
            },
            {
                title:'Infomation on the wallet opening and listing of Plug(PLG)',
                date:'2018-12-13',
                _id:4
            },
            {
                title:'Infomation regarding ERC20 token wallet opening schedule',
                date:'2018-12-11',
                _id:5
            },
            {
                title:'Pundi X(NPXS) December airdrop completed',
                date:'2018-12-11',
                _id:6
            },
            {
                title:'BitNaru is under maintenance. (09.12.2018 21:50 ~ 09.12.2018 23:00)',
                date:'2018-12-10',
                _id:7
            },
            {
                title:'Infomation on Taklimaken commission change, and wallet opening',
                date:'2018-12-10',
                _id:8
            },
            {
                title:'Infomation on changing price unit for SRCOIN',
                date:'2018-12-07',
                _id:9
            },
            {
                title:'Infomation regarding resuming DNW (BTCB) trading and event',
                date:'2018-12-06',
                _id:10
            },
        ]
    }
    render() {

        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: false
        };
        const { BALANCES, DASHBOARD} = this.props.languageConfig;
        const notice = this.state.notice;
        const lang = localStorage.getItem("lang");
        const url_string = window.location.href;
        const url = new URL(url_string);
        const id_test = url.searchParams.get("_id");
        const result = notice.filter(elem => {
            if(elem._id == +id_test){
                return elem.title;
            };
        })
        const tab = [
            {
                category: "All",
                text: BALANCES.TAB_ALL,
                ko_category: "전체"
            },
            {
                category: DASHBOARD.CSCENTER,
                text:  DASHBOARD.CSCENTER,
                ko_category: "공지사항"
            },
            {
                category: DASHBOARD.LISTING,
                text: DASHBOARD.LISTING,
                ko_category: "상장"
            },
            {
                category: DASHBOARD.EVENT,
                text: DASHBOARD.EVENT,
                ko_category: "이벤트"
            }
        ]
        let titleField;
        if(lang === "en"){
            titleField = "title_en"
        }else{
            titleField = "title_ko"
        }
        return (
            <Slider {...settings}>
                {notice.slice(0,3).map((item, index) => {
                    return <div key={index}>
                        <p className="roll-content"><span className="category">Notice</span><Link to={`/noticeDetail?&id=${item['_id']}`}>{item.title}</Link></p>
                    </div>
                })}
            </Slider>
        )
    }
}