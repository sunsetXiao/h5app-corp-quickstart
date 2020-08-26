import React from 'react';
import { Menu, ActivityIndicator, NavBar } from 'antd-mobile';

import './MenuBar.css';

const data = [
  {
    value: '1',
    label: '全部',
    isLeaf: true,
  },
  {
    value: '2',
    label: '行业',
    children: [
      {
        label: '互联网',
        value: '1',
      },
      {
        label: '金融',
        value: '2',
      },
      {
        label: '教育',
        value: '3',
        disabled: true,
      },
    ],
  },
];

class MenuBar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      initData: '',
      show: false,
      label: '全部',
    };
  }
  onChange = (value) => {
    let label = '';
    data.forEach((dataItem) => {
      if (dataItem.value === value[0]) {
        label = dataItem.label;
        if (dataItem.children && value[1]) {
          dataItem.children.forEach((cItem) => {
            if (cItem.value === value[1]) {
              label += ` ${cItem.label}`;
            }
          });
        }
      }
    });
    this.setState({ label, show: false });
  };
  handleClick = (e) => {
    e.preventDefault(); // Fix event propagation on Android
    this.setState({
      show: !this.state.show,
    });
    // mock for async data loading
    if (!this.state.initData) {
      setTimeout(() => {
        this.setState({
          initData: data,
        });
      }, 500);
    }
  };

  onMaskClick = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    const { initData, show } = this.state;
    const menuEl = (
      <Menu
        className="foo-menu"
        data={initData}
        value={['1', '3']}
        onChange={this.onChange}
        height={document.documentElement.clientHeight * 0.6}
      />
    );
    const loadingEl = (
      <div
        style={{
          width: '100%',
          height: document.documentElement.clientHeight * 0.6,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </div>
    );
    return (
      <div className={show ? 'menu-active' : ''}>
        <div className="nav">
          <div className="nav-main" onClick={this.handleClick}>
            <div className={show ? 'text-show' : 'text-off'}>
              {this.state.label}
            </div>
            <span className={show ? 'arrow-up' : 'arrow-down'} />
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}> 筛选 </div>
          <div style={{ flex: 1, textAlign: 'center' }}> 排序 </div>
          <div style={{ flex: 1, textAlign: 'center' }}> 搜索 </div>
        </div>

        {show ? (initData ? menuEl : loadingEl) : null}
        {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
      </div>
    );
  }
}

export default MenuBar;
