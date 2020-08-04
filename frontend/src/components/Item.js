import React from 'react';
import { Card, WhiteSpace } from 'antd-mobile';

import './Item.css'

class Item extends React.Component {
  render() {
    return (
      <div>
        <WhiteSpace size="xs" />
        <Card full>
          <Card.Header
            title="公司1"
          />
          <Card.Body className="body">
            <div>行业：金融</div>
            <div>注册地：广东</div>
            <div>简介：description</div>
          </Card.Body>
          {/* <Card.Footer
            content="footer content"
            extra={<div>extra footer content</div>}
          /> */}
        </Card>
      </div>
    );
  }
}

export default Item;
