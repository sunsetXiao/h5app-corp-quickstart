import React from 'react';
import { Card, Flex, WhiteSpace } from 'antd-mobile';

import './MainTab.css';

class MainTab extends React.Component {
  render() {
    return (
      <div>
        <Flex className="flex-container">
          <Flex.Item className="flex-item">
            <img src="https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg" />
            <div>联系人</div>
          </Flex.Item>
          <Flex.Item className="flex-item">
            <img src="https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg" />
            <div>企业</div>
          </Flex.Item>
          <Flex.Item className="flex-item">
            <img src="https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg" />
            <div>提醒</div>
          </Flex.Item>
        </Flex>

        <WhiteSpace size="lg" />

        <Card full>
          <Card.Header
            title="提醒"
            thumb="https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg"
            extra={<span>更多</span>}
          />
          <Card.Body>
            <div>今日提醒</div>
          </Card.Body>
          {/* <Card.Footer
            content="footer content"
            extra={<div>extra footer content</div>}
          /> */}
        </Card>

        <WhiteSpace size="lg" />

        <Card full>
          <Card.Header
            title="资讯"
            thumb="https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg"
            extra={<span>更多</span>}
          />
          <Card.Body>
            <div>今日资讯</div>
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

export default MainTab;
