import React from 'react';
import {Card, WhiteSpace} from 'antd-mobile';

import './CompanyItem.css'
import {Link} from "react-router-dom";

class ContactItem extends React.Component {
    render() {
        const contact = this.props.contact;
        return (
            <Link style={{width: "100%"}} to={`/contact/${this.props.contact.id}`}>
                <div>
                    <WhiteSpace size="xs"/>
                    <Card full>
                        <Card.Body className="body">
                            <div className="body-title">{contact.name}</div>
                            <div className="body-content">地址：{contact.address}</div>
                            <div className="body-content">简介：{contact.mobile}</div>
                        </Card.Body>
                    </Card>
                </div>
            </Link>
        );
    }
}

export default ContactItem;
