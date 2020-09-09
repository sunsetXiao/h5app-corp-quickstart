import React from 'react';
import {Tabs, WhiteSpace, Badge, Button} from 'antd-mobile';
import {StickyContainer, Sticky} from 'react-sticky';
import * as dd from 'dingtalk-jsapi';

import Detail from "./Detail";
import config from '../../config.js'
import './CompanyDetail.css';
import ContactItem from "../../components/ContactItem";
import ScheduleItem from "../../components/ScheduleItem";
import ProgressItem from "../../components/ProgressItem";

const host = config.host

function renderTabBar(props) {
    return (<Sticky>
        {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}

const tabs = [
    {title: '基本信息',},
    {title: '联系人',},
    {title: '提醒',},
    {title: '进度',},
];

class CompanyDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            company: {},
            page: 0,
            config: {}
        }
    }

    componentDidMount() {
        const {match: {params}} = this.props;

        fetch(host + '/company/findById', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": params.id,
            })
        })
            .then(res => res.json())
            .then(result => {
                if (this.props.location.state && this.props.location.state.contact) {
                    const contactId = this.props.location.state.contact.id;
                    const idList = [contactId];
                    result.result.contactList && result.result.contactList.forEach(({id}) => {
                        if (!idList.find((n) => n === id)) {
                            idList.push(id)
                        }
                    })
                    fetch(host + '/company/updateContact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "id": params.id,
                            "idList": idList
                        })
                    })
                        .then(res => res.json())
                        .then(result => {
                            this.props.history.replace();
                            this.setState({
                                company: result.result || {},
                                // loading: false
                            })
                        })
                } else {
                    this.setState({
                        company: result.result || {},
                        // loading: false
                    })
                }
            })

    }

    onButtonClick() {
        // console.log("sgsgsg")
        if (dd.env.platform !== 'notInDingTalk') {
            dd.biz.map.locate({
                // latitude: 39.903578, // 纬度，非必须
                // longitude: 116.473565, // 经度，非必须
                scope: 500, // 限制搜索POI的范围；设备位置为中心，scope为搜索半径
                onSuccess: function (result) {
                    /* result 结构 */
                    // {
                    //     province: 'xxx', // POI所在省会，可能为空
                    //         provinceCode: 'xxx', // POI所在省会编码，可能为空
                    //     city: 'xxx', // POI所在城市，可能为空
                    //     cityCode: 'xxx', // POI所在城市编码，可能为空
                    //     adName: 'xxx', // POI所在区名称，可能为空
                    //     adCode: 'xxx', // POI所在区编码，可能为空
                    //     distance: 'xxx', // POI与设备位置的距离
                    //     postCode: 'xxx', // POI的邮编，可能为空
                    //     snippet: 'xxx', // POI的街道地址，可能为空
                    //     title: 'xxx', // POI的名称
                    //     latitude: 39.903578, // POI的纬度
                    //     longitude: 116.473565, // POI的经度
                    // }
                    alert("result" + JSON.stringify(result))
                },
                onFail: function (err) {
                    alert(JSON.stringify(err))
                }
            });

            // dd.biz.map.view({
            //     latitude: 39.903578, // 纬度
            //     longitude: 116.473565, // 经度
            //     title: "北京国家广告产业园" // 地址/POI名称
            // });
        }


        // const {match: {params}} = this.props;
        // this.props.history.push("/select/contact", {
        //     pathname: `/company/${params.id}`
        // })
    }

    onContactDelete(id) {
        // console.log("onContactDelete", id)
        const company = this.state.company;

        const idList = [];
        company.contactList.forEach(({id: contactId}) => {
            if (contactId !== id) {
                idList.push(contactId)
            }
        })

        fetch(host + '/company/updateContact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": company.id,
                "idList": idList
            })
        })
            .then(res => res.json())
            .then(result => {
                this.setState({
                    company: result.result || {},
                    // loading: false
                })
            })

    }

    render() {
        const company = this.state.company;
        return (
            <div style={{width: '100%', top: 0}}>
                <div className="header">
                    <div className="header-title"> {company.name}</div>
                    <div className="header-content"> 行业：{company.industry_name}</div>
                    <div className="header-content"> 描述：{company.description}</div>
                </div>
                <div className="body">
                    <div>
                        <WhiteSpace/>
                        <StickyContainer>
                            <Tabs tabs={tabs}
                                  initialPage={this.state.page}
                                  renderTabBar={renderTabBar}
                                  onChange={(tab, index) => {
                                      this.setState({page: index})
                                  }}
                            >
                                <div className="tab">
                                    <Detail company={company}/>
                                </div>
                                <div className="tab">
                                    {
                                        company.contactList && company.contactList.map((contact) => <ContactItem
                                            key={contact.id} contact={contact} onDelete={this.onContactDelete.bind(this)}/>)
                                    }
                                </div>
                                <div className="tab">
                                    {
                                        company.scheduleList && company.scheduleList.map((schedule) => <ScheduleItem
                                            key={schedule.id} schedule={schedule}/>)
                                    }
                                </div>
                                <div className="tab">
                                    {
                                        company.progressList && company.progressList.map((progress) => <ProgressItem
                                            key={progress.id} progress={progress}/>)
                                    }
                                </div>
                            </Tabs>
                        </StickyContainer>
                        <WhiteSpace/>
                    </div>
                </div>
                <Button className="button" type="primary"
                        onClick={this.onButtonClick.bind(this)}>{this.state.page === 0 ? "编辑" : "添加联系人"}</Button><WhiteSpace/>
            </div>
        );
    }
}

export default CompanyDetail;
