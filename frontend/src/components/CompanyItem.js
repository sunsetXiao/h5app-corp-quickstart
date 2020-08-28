import React from 'react';
import {Card, WhiteSpace} from 'antd-mobile';
import { Link } from 'react-router-dom'

import './CompanyItem.css'

class CompanyItem extends React.Component {
    render() {
        const company = this.props.company;
        return (
            <Link style={{width: "100%"}} to={this.props.to || `/company/${this.props.company.id}`} replace={this.props.replace}>
                <div>
                    <WhiteSpace size="xs"/>
                    <Card full>
                        <Card.Body className="body">
                            <div className="body-title">{company.name}</div>
                            <div className="body-content">行业：{company.industry_name}</div>
                            <div className="body-content">描述：{company.description}</div>
                        </Card.Body>
                    </Card>
                </div>
            </Link>
        );
    }
}

export default CompanyItem;
