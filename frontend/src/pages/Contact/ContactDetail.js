import React from 'react';
import {Tabs, WhiteSpace, Badge} from 'antd-mobile';
import {StickyContainer, Sticky} from 'react-sticky';
import Detail from "./Detail";
import config from '../../config.js'
import './ContactDetail.css';
import ContactItem from "../../components/ContactItem";

const host = config.host

function renderTabBar(props) {
    return (<Sticky>
        {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}

const tabs = [
    {title: '基本信息',},
    {title: '公司',},
];

const TabExample = ({contact}) => (
    <div>
        <WhiteSpace/>
        <StickyContainer>
            <Tabs tabs={tabs}
                  initialPage={0}
                  renderTabBar={renderTabBar}
            >
                <div className="tab">
                    <Detail contact={contact}/>
                </div>
                <div className="tab">
                    {
                        contact.companyList && contact.companyList.map((company) => <ContactItem key={company.id} contact={company} />)
                    }
                </div>
            </Tabs>
        </StickyContainer>
        <WhiteSpace/>
    </div>
);

class ContactDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contact: {}
        }
    }
    componentDidMount() {
        const { match: { params } } = this.props;

        fetch(host + '/contact/findById', {
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
                this.setState({
                    contact: result.result || {},
                    // loading: false
                })
            })
    }

    render() {
        const contact = this.state.contact;
        return (
            <div style={{width: '100%', top: 0}}>
                <div className="header">
                    <div className="header-title"> {contact.name}</div>
                    <div className="header-content"> 地址：{contact.address}</div>
                    <div className="header-content"> 手机：{contact.mobile}</div>
                </div>
                <div className="body">
                    <TabExample contact={contact}/>
                </div>
            </div>
        );
    }
}

export default ContactDetail;
