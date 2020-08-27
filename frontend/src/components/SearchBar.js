import React from 'react';
import { SearchBar } from 'antd-mobile';

class MSearchBar extends React.Component {

    componentDidMount() {
    }

    render() {
        return (<div>
            <SearchBar placeholder="Search" maxLength={8} onSubmit={value => console.log(value, 'onSubmit')} />
        </div>);
    }
}

export default MSearchBar;