import React from "react";
import {List, Modal} from 'antd-mobile';
import "./Detail.css"
import * as dd from "dingtalk-jsapi/index";

const Item = List.Item;
const Brief = Item.Brief;

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: false,
            modal: false,
            result: [
                {
                    "KeyNo": "4659626b1e5e43f1bcad8c268753216e",
                    "Name": "北京小桔科技有限公司",
                    "OperName": "程维",
                    "StartDate": "2012-07-10 00:00:00",
                    "Status": "在业",
                    "No": "110108015068911",
                    "CreditCode": "9111010859963405XW"
                },
                {
                    "KeyNo": "4178fc374c59a79743c59ecaf098d4dd",
                    "Name": "深圳市小桔科技有限公司",
                    "OperName": "王举",
                    "StartDate": "2015-04-22 00:00:00",
                    "Status": "存续",
                    "No": "440301112653267",
                    "CreditCode": "91440300334945450M"
                }
            ],
        }
    }

    onPoiClick = (poi) => {
        if (dd.env.platform !== 'notInDingTalk') {
            dd.biz.map.view(poi);
        }
    }

    onModalClose = () => {
        this.setState({
            modal: false,
        });
    }

    // onWrapTouchStart = (e) => {
    //     // fix touch to scroll background page on iOS
    //     if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
    //         return;
    //     }
    //     const pNode = closest(e.target, '.am-modal-content');
    //     if (!pNode) {
    //         e.preventDefault();
    //     }
    // }

    onNameClick = async (name) => {
        // const res = await fetch(`http://enterprise.market.alicloudapi.com/ai_market/ai_enterprise_knowledge/enterprise_simple/v2?STRING=${name}&PAGE=1`, {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': 'APPCODE 76688c19d6684e7c89c39f3eb90fd4b9'
        //     },
        // });
        //
        // const result = await res.json();
        //
        // console.log('result', result)
        // alert(JSON.stringify(result))
        // this.setState({
        //     result: result.Result && result.Result.slice(0, 3),
        //     modal: true,
        // })
    }

    render() {
        const {company} = this.props;

        return (<div style={{width: "100%"}}>
            <List renderHeader={() => '基本信息'} className="my-list">
                <Item onClick={() => this.onNameClick(company.name)}><Brief>名称</Brief> {company.name || '-'} </Item>
                <Modal
                    visible={this.state.modal}
                    transparent
                    maskClosable={false}
                    onClose={() => this.onModalClose()}
                    title="Title"
                    footer={[{ text: 'Ok', onPress:() => this.onModalClose() }]}
                    // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div style={{ overflow: 'scroll' }}>
                        {
                            this.state.result.map(ele => (<div>
                                <div>公司名称: {ele.Name} </div>
                                <div>法人名称: {ele.OperName} </div>
                                <div>成立日期: {ele.StartDate} </div>
                                <div>企业状态: {ele.Status} </div>
                                <div>注册号: {ele.No} </div>
                                <div>社会统一信用代码: {ele.CreditCode} </div>
                                <div>-------------------------------- </div>
                                <br/>
                            </div>))
                        }
                    </div>
                </Modal>
                <Item><Brief>行业</Brief> {company.industry_name || '-'} </Item>
                <Item onClick={() => this.onPoiClick(company.poi)}><Brief>地址(点击查看定位)</Brief> {company.poi && company.poi.city + company.poi.title || '-'} </Item>
                <Item><Brief>公司信息描述</Brief> {company.description || '-'} </Item>
                <Item><Brief>备注</Brief> {company.note || '-'} </Item>
                <Item><Brief>类型</Brief> {company.type === 'technology' ? '科技类' : '产业类'} </Item>
            </List>

            <List renderHeader={() => '招商信息'} className="my-list">
                <Item><Brief>项目名称</Brief> {company.projectName || '-'} </Item>
                <Item><Brief>意向区域</Brief> {company.targetRegion || '-'} </Item>
                <Item><Brief>产品及应用领域</Brief> {company.field || '-'} </Item>
                {company.type === 'technology' &&
                <div>
                    <Item><Brief>营收</Brief> {company.revenue || '-'}</Item>
                    <Item><Brief>融资历史</Brief> {company.financing || '-'}</Item>
                    <Item><Brief>团队规模</Brief> {company.team || '-'}</Item></div>
                }
                {company.type === 'industry' && <div>
                    <Item><Brief>载体需求</Brief> {company.carrier || '-'} </Item>
                    <Item><Brief>产值税收</Brief> {company.output_tax || '-'} </Item>
                    <Item><Brief>投资强度</Brief> {company.investment || '-'} </Item></div>
                }
            </List>
        </div>);
    }
}

export default Detail;