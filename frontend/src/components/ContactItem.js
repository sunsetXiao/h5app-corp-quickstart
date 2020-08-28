import React from 'react';
import {Card, WhiteSpace, Icon} from 'antd-mobile';

import './CompanyItem.css'
import {Link} from "react-router-dom";

class ContactItem extends React.Component {

    render() {
        const contact = this.props.contact;
        const onDelete = this.props.onDelete;
        return (
            <Link style={{width: "100%"}} to={this.props.to || `/contact/${this.props.contact.id}`}
                  replace={this.props.replace}>
                <div>
                    <WhiteSpace size="xs"/>
                    <Card full>
                        {onDelete && <Card.Header
                            extra={<Icon onClick={(e) => {e.preventDefault(); onDelete(this.props.contact.id)}} type="cross"/>}
                        />}
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
