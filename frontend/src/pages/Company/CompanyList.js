import React from 'react';

import MenuBar from '../../components/MenuBar';
import CompanyItem from '../../components/CompanyItem';
import './CompanyList.css';
import config from '../../config.js'

const host = config.host

class CompanyList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companyList: [],
            value: 'all'
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



    onClick = (value) => {
        // this.setState({ value: 'tec'})
        const filterInputList = [];
        if (value !== 'all') {
            filterInputList.push({
                field: "type",
                value
            })
        }

        fetch(host + '/company/findAll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filterInputList,
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
        const data = [
            {
                value: 'all',
                label: '全部',
                isLeaf: true,
            },
            {
                value: 'technology',
                label: '科技类',
                isLeaf: true,
            },
            {
                value: 'industry',
                label: '产业类',
                isLeaf: true,
            },
        ];
        return (
            <div>
                <MenuBar data={data} onClick={(value) => this.onClick(value[0])}/>
                <div className="item-list">
                    {this.state.companyList.map(company => { return (<CompanyItem key={company.id} company={company}/>)})}
                </div>
            </div>
        );
    }
}

export default CompanyList;
