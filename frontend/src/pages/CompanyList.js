import React from 'react';

import MenuBar from '../components/MenuBar';
import Item from '../components/Item';
import './CompanyList.css';
import config from '../config.js'

const host = config.host

class CompanyList extends React.Component {
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
                console.log(this.state);
            })
    }

    render() {
        return (
            <div>
                <MenuBar/>
                <div className="item-list">
                    {this.state.companyList.map(company => { return (<Item key={company.id} company={company}/>)})}
                </div>
            </div>
        );
    }
}

export default CompanyList;
