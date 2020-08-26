import React from 'react';
import {Tabs, WhiteSpace, Badge} from 'antd-mobile';
import {StickyContainer, Sticky} from 'react-sticky';
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

const TabExample = ({company}) => (
    <div>
        <WhiteSpace/>
        <StickyContainer>
            <Tabs tabs={tabs}
                  initialPage={0}
                  renderTabBar={renderTabBar}
            >
                <div className="tab">
                    <Detail company={company}/>
                </div>
                <div className="tab">
                    {
                        company.contactList && company.contactList.map((contact) => <ContactItem contact={contact} />)
                    }
                </div>
                <div className="tab">
                    {
                        company.scheduleList && company.scheduleList.map((schedule) => <ScheduleItem schedule={schedule} />)
                    }
                </div>
                <div className="tab">
                    {
                        company.progressList && company.progressList.map((progress) => <ProgressItem progress={progress}/>)
                    }
                </div>
            </Tabs>
        </StickyContainer>
        <WhiteSpace/>
    </div>
);

class CompanyDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            company: {}
        }
    }
    componentDidMount() {
        const { match: { params } } = this.props;

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
                this.setState({
                    company: result.result,
                    // loading: false
                })
                console.log(this.state);
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
                    <TabExample company={company}/>
                </div>
            </div>
        );
    }
}

export default CompanyDetail;
