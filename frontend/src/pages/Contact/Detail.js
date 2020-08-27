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
        const {contact} = this.props;

        return (<div style={{width: "100%"}}>
            <List renderHeader={() => '基本信息'} className="my-list">
                <Item><Brief>名称</Brief> {contact.name || '-'} </Item>
                <Item><Brief>地址</Brief> {contact.address || '-'} </Item>
                <Item><Brief>手机</Brief> {contact.mobile || '-'} </Item>
                <Item><Brief>固定电话</Brief> {contact.phone || '-'} </Item>
                <Item><Brief>职位</Brief> {contact.position || '-'} </Item>
                {/*<Item><Brief>名片地址</Brief> {contact.image} </Item>*/}
            </List>

        </div>);
    }
}

export default Detail;