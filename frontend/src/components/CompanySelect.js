import React from 'react';
import SearchBar from './SearchBar';
import CompanyItem from './CompanyItem';
import './ContactSelect.css';
import config from '../config.js'

const host = config.host

class CompanySelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companyList: []
        }
    }
    componentDidMount() {
        fetch(host + '/company/findAll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "filterInputList": [],
                "sortInput": {"field": "id", "order": "ASC"}
            })
        })
            .then(res => res.json())
            .then(result => {
                this.setState({
                    companyList: result.result,
                    // loading: false
                })
            })
    }

    render() {
        const to = {
            pathname: this.props.location.state.pathname,
            state: this.props.location.state,
        };
        return (
            <div>
                <SearchBar />
                <div className="item-list">
                    {this.state.companyList.map(company => { return (<CompanyItem key={company.id} company={company} to={{... to, state: { ... to.state, company }}} replace={true}/>)})}
                </div>
            </div>
        );
    }
}

export default CompanySelect;
