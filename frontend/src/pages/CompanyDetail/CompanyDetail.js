import React from 'react';
import {Tabs, WhiteSpace, Badge} from 'antd-mobile';
import {StickyContainer, Sticky} from 'react-sticky';
import Detail from "./Detail";

import './CompanyDetail.css';

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

const TabExample = () => (
    <div>
        <WhiteSpace/>
        <StickyContainer>
            <Tabs tabs={tabs}
                  initialPage={0}
                  renderTabBar={renderTabBar}
            >
                <div className="tab">
                    <Detail />
                </div>
                <div className="tab">
                    Content of second tab
                </div>
                <div className="tab">
                    Content of third tab
                </div>
                <div className="tab">
                    Content of fourth tab
                </div>
            </Tabs>
        </StickyContainer>
        <WhiteSpace/>
    </div>
);

class CompanyDetail extends React.Component {
    render() {
        return (
            <div style={{width: '100%', top: 0}}>
                <div className="header">
                    <div className="header-title"> 企业1</div>
                    <div className="header-content"> 行业：行业1</div>
                    <div className="header-content"> 描述：balabala</div>
                </div>
                <div className="body">
                    <TabExample/>
                </div>
            </div>
        );
    }
}

export default CompanyDetail;
