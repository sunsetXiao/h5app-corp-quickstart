import React from 'react';
import {Card, WhiteSpace} from 'antd-mobile';

import './CompanyItem.css'

class CompanyItem extends React.Component {
    render() {
        const company = this.props.company;
        return (
            <div style={{width: "100%"}}>
                <WhiteSpace size="xs"/>
                <Card full>
                    <Card.Body className="body">
                        <div className="body-title">{company.name}</div>
                        <div className="body-content">地址：{company.industry_name}</div>
                        <div className="body-content">简介：{company.description}</div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default CompanyItem;
