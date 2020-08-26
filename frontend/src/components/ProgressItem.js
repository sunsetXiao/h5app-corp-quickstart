import React from 'react';
import {Card, WhiteSpace} from 'antd-mobile';

import './CompanyItem.css'

class ProgressItem extends React.Component {
    render() {
        const progress = this.props.progress;
        return (
            <div style={{width: "100%"}}>
                <WhiteSpace size="xs"/>
                <Card full>
                    <Card.Body className="body">
                        <div className="body-content">跟进说明：{progress.content}</div>
                        <div className="body-content">进度：{progress.percentage}</div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default ProgressItem;
