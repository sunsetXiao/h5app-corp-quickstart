import React from 'react';
import {Tabs, WhiteSpace, Button} from 'antd-mobile';
import {StickyContainer, Sticky} from 'react-sticky';
import Detail from "./Detail";
import config from '../../config.js'
import './ContactDetail.css';
import CompanyItem from "../../components/CompanyItem";

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

// const TabExample = ({contact}) => (
//     <div>
//         <WhiteSpace/>
//         <StickyContainer>
//             <Tabs tabs={tabs}
//                   initialPage={this.state.page}
//                   renderTabBar={renderTabBar}
//             >
//                 <div className="tab">
//                     <Detail contact={contact}/>
//                 </div>
//                 <div className="tab">
//                     {
//                         contact.companyList && contact.companyList.map((company) => <CompanyItem key={company.id} company={company} />)
//                     }
//                 </div>
//             </Tabs>
//         </StickyContainer>
//         <WhiteSpace/>
//     </div>
// );

class ContactDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contact: {},
            page: 0
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
                    {/*<TabExample contact={contact}/>*/}
                    <div>
                        <WhiteSpace/>
                        <StickyContainer>
                            <Tabs tabs={tabs}
                                  initialPage={this.state.page}
                                  renderTabBar={renderTabBar}
                                  onChange={(tab, index) => {this.setState({page: index})}}
                            >
                                <div className="tab">
                                    <Detail contact={contact}/>
                                </div>
                                <div className="tab">
                                    {
                                        contact.companyList && contact.companyList.map((company) => <CompanyItem key={company.id} company={company} />)
                                    }
                                </div>
                            </Tabs>
                        </StickyContainer>
                        <WhiteSpace/>
                    </div>
                </div>
                <Button className="button" type="primary">{this.state.page === 0? "编辑" : "添加公司"}</Button><WhiteSpace />
            </div>
        );
    }
}

export default ContactDetail;
