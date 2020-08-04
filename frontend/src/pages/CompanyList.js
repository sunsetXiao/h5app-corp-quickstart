import React from 'react';

import MenuBar from '../components/MenuBar';
import Item from '../components/Item';

import './CompanyList.css';

class CompanyList extends React.Component {
  render() {
    return (
      <div>
        <MenuBar />
        <div className="item-list">
          <Item />
          <Item />
        </div>
      </div>
    );
  }
}

export default CompanyList;
