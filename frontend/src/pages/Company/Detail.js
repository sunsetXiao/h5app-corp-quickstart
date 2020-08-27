import React from "react";
import {List} from 'antd-mobile';
import "./Detail.css"

const Item = List.Item;
const Brief = Item.Brief;

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: false,
        }
    }

    render() {
        const {company} = this.props;

        return (<div style={{width: "100%"}}>
            <List renderHeader={() => '基本信息'} className="my-list">
                <Item><Brief>名称</Brief> {company.name || '-'} </Item>
                <Item><Brief>行业</Brief> {company.industry_name || '-'} </Item>
                <Item><Brief>城市</Brief> {company.city_name || '-'} </Item>
                <Item><Brief>描述</Brief> {company.description || '-'} </Item>
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