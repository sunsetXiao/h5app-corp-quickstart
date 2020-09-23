import React from 'react';
import {Card, Flex, WhiteSpace, Carousel, Grid} from 'antd-mobile';

import './MainTab.css';
import {Link} from "react-router-dom";
import CompanyItem from "../components/CompanyItem";

import config from '../config.js'
import * as dd from "dingtalk-jsapi/index";
const host = config.host

class MainTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companyList: [],
            gridData: [{
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: "添加公司"
            }, {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: "添加联系人"
            }, {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: "扫描名片"
            }
            ]
        }
    }

    componentDidMount() {
        fetch(host + '/company/findAll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "filterInputList": [],
                "sortInput": {"field": "id", "order": "DESC"}
            })
        })
            .then(res => res.json())
            .then(result => {
                this.setState({
                    companyList: result.result,
                })
            })
    }

    onGridClick = async (ele) => {
        console.log(ele)
        console.log(this.props)
        if (ele.text === "添加公司") {
            this.props.history.push("/create/company", {pathname: "/"})
        } else if (ele.text === "添加联系人") {
            this.props.history.push("/create/contact", {pathname: "/"})
        } else {
            if (dd.env.platform !== 'notInDingTalk') {
                const data = await dd.biz.util.scanCard({
                    // 无需传参数
                    onSuccess: function (data) {
                        //onSuccess将在扫码成功之后回调
                        /* data结构
                                 {
                                   "ADDRESS": "深圳市南山区软件产业基地",
                                   "COMPANY": "深圳市李乔科技有限公司",
                                   "NAME": "李乔",
                                   "MPHONE": "861333567890",
                                   "PHONE": "01087654321",
                                   "POSITION": "CEO",
                                   "IMAGE": "http://www.taobao.com/xxx.jpg",
                                   "dt_tranfer": "BusinessCard",
                                   "request_id": "20161206144554_efd40582d477a29df2e3bc62c260cdae"
                                }
                                */
                        //  console.log('')
                        // alert(JSON.stringify(data));
                    },
                    onFail: function (err) {
                        // alert(JSON.stringify(err));
                    },
                });

                this.props.history.push("/create/contact", {
                    data,
                    pathname: "/"
                })
            }
        }
    }

    render() {
        const gridData = [{
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
            text: "添加公司"
        }, {
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
            text: "添加联系人"
        }, {
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
            text: "扫描名片"
        }
        ]

        return (
            <div>
                <Card full>
                    <Card.Header
                        title="新增公司"
                        // thumb="https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg"
                        // extra={<Link
                        //     to={{pathname: "/create/company", state: {index: 0, pathname: "/"}}}><span>更多</span></Link>}
                        extra={<span>更多</span>}
                    />
                    <Card.Body>
                        <Carousel
                            autoplay={false}
                            infinite
                        >
                            {
                                this.state.companyList.slice(0, 3).map(company => <CompanyItem key={company.id} company={company}/>)
                            }
                            {
                                this.state.companyList.slice(0, 3).map(company => <CompanyItem key={company.id} company={company}/>)
                            }
                        </Carousel>
                    </Card.Body>
                    {/* <Card.Footer
            content="footer content"
            extra={<div>extra footer content</div>}
          /> */}
                </Card>

                <WhiteSpace size="lg"/>

                <Card full>
                    <Card.Header
                        title="快捷入口"
                        // thumb="https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg"
                        // extra={<span>更多</span>}
                    />
                    <Card.Body>
                        {/*<div className="sub-title">No border</div>*/}
                        <Grid data={this.state.gridData} hasLine={false} onClick={this.onGridClick.bind(this)}/>
                    </Card.Body>
                </Card>

                <WhiteSpace size="lg"/>

                <Card full>
                    <Card.Header
                        title="今日提醒"
                        // thumb="https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg"
                        extra={<span>更多</span>}
                    />
                    <Card.Body>
                        <div>18：00 清控科创实地考察</div>
                    </Card.Body>
                </Card>

                <WhiteSpace size="lg"/>

                <Card full>
                    <Card.Header
                        title="资讯"
                        // thumb="https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg"
                        extra={<span>更多</span>}
                    />
                    <Card.Body>
                        <a>才汇广州信息港 创新推动高质量发展</a>
                        <WhiteSpace size="md"/>
                        <a>2020年中国数字经济发展报告</a>
                        <WhiteSpace size="md"/>
                        <a>重磅！杭州高新区启动"企业创新积分"全国试点</a>
                    </Card.Body>
                </Card>

            </div>
        );
    }
}

export default MainTab;
