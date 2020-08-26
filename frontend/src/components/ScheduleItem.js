import React from 'react';
import {Card, WhiteSpace} from 'antd-mobile';

import './CompanyItem.css'

class ScheduleItem extends React.Component {
    render() {
        const schedule = this.props.schedule;
        return (
            <div style={{width: "100%"}}>
                <WhiteSpace size="xs"/>
                <Card full>
                    <Card.Body className="body">
                        <div className="body-title">{schedule.name}</div>
                        <div className="body-content">备注：{schedule.note}</div>
                        <div className="body-content">截止时间：{schedule.deadline}</div>
                        <div className="body-content">状态：{schedule.status}</div>
                        {schedule.status === 'finished' && <div className="body-content">完成时间：{schedule.completeAt}</div>}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default ScheduleItem;
