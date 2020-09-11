import React from 'react';
import {Card, Flex, WhiteSpace, Carousel} from 'antd-mobile';

import './MainTab.css';
import {Link} from "react-router-dom";
import CompanyItem from "../components/CompanyItem";

import config from '../config.js'
const host = config.host

class MainTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companyList: [],
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

    render() {
        return (
            <div>
                <Card full>
                    <Card.Header
                        title="新增公司"
                        // thumb="https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg"
                        extra={<Link
                            to={{pathname: "/create/company", state: {index: 0, pathname: "/"}}}><span>更多</span></Link>}
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
