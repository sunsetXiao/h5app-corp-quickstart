import React from 'react';
import {List, InputItem, Switch, Stepper, Range, Button, Picker} from 'antd-mobile';
import {createForm} from 'rc-form';
import config from '../../config.js'

const host = config.host
const Item = List.Item;

class BasicInput extends React.Component {

    componentDidMount() {
        fetch(host + '/static/industry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(result => {
                this.setState({
                    industry: result.result,
                })
            })

        fetch(host + '/static/area', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(result => {
                this.setState({
                    area: result.result,
                })
            })

        console.log("companyCreate", this.props);
    }

    state = {
        value: 1,
        industry: [],
        area: [],
        type: [{value: "technology", label: "科技类"}, { value: "industry", label: "产业类" }]
    }
    onSubmit = () => {
        this.props.form.validateFields({force: true}, (error) => {
            if (!error) {
                // area: (2) [1, 2]
                // description: "aaa"
                // field: undefined
                // financing: undefined
                // industry: (2) [1, 1]
                // name: "haha"
                // note: undefined
                // projectName: undefined
                // revenue: undefined
                // targetRegion: undefined
                // team: undefined
                // type: ["technology"]
                const {name, industry, area, description, note, type, projectName, targetRegion, field, revenue, financing, team, carrier, output_tax, investment} = this.props.form.getFieldsValue();
                fetch(host + '/company/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        industry_id: industry[1],
                        city_id: area[1],
                        description,
                        note,
                        type: type[0],
                        projectName,
                        targetRegion,
                        field,
                        revenue,
                        financing,
                        team,
                        carrier,
                        output_tax,
                        investment
                    })
                })
                    .then(res => res.json())
                    .then(result => {

                    })
            } else {
                // alert('Validation failed');
            }
        });
    }
    onReset = () => {
        this.props.form.resetFields();
    }
    // validateAccount = (rule, value, callback) => {
    //     if (value && value.length > 4) {
    //         callback();
    //     } else {
    //         callback(new Error('At least four characters for account'));
    //     }
    // }
    onTest = () => {
        // alert(JSON.stringify(localStorage));
        this.props.history.push("/select/contact", {... this.props.form.getFieldsValue(), pathname: '/create/company'})
        // console.log(this.props.children)
    }
    render() {
        const {getFieldProps, getFieldError} = this.props.form;

        return (<form>
            <List
                // renderHeader={() => '创建公司'}
                renderFooter={() =>
                    getFieldError('name') && getFieldError('name').join(',')  ||
                    getFieldError('industry') && getFieldError('industry').join(',') ||
                    getFieldError('area') && getFieldError('area').join(',') ||
                    getFieldError('type') && getFieldError('type').join(',')
                }
            >
                <InputItem
                    {...getFieldProps('name', {
                        rules: [
                            {required: true, message: '请输入公司名'}
                        ],
                        initialValue: "tsts"
                    })}
                    clear
                    error={!!getFieldError('name')}
                    placeholder="请输入公司名"
                >名称</InputItem>

                <Picker
                        data={this.state.industry}
                        title="行业"
                        {...getFieldProps('industry', {
                            rules: [
                                {required: true, message: '请选择行业'}
                            ],
                            initialValue: [1, 1]
                        })}
                >
                    <List.Item arrow="horizontal">行业</List.Item>
                </Picker>

                <Picker
                    data={this.state.area}
                    title="地址"
                    {...getFieldProps('area',  {
                        rules: [
                            {required: true, message: '请选择地址'}
                        ],
                    })}
                >
                    <List.Item arrow="horizontal">地址</List.Item>
                </Picker>

                <InputItem
                    {...getFieldProps('description')}
                    clear
                    placeholder="请输入描述"
                >描述</InputItem>
                <InputItem
                    {...getFieldProps('note')}
                    clear
                    placeholder="请输入备注"
                >备注</InputItem>

                <Picker
                    data={this.state.type}
                    title="类型"
                    {...getFieldProps('type',  {
                        rules: [
                            {required: true, message: '请选择类型'}
                        ],
                    })}
                >
                    <List.Item arrow="horizontal">类型</List.Item>
                </Picker>

                {
                    this.props.form.getFieldsValue().type &&
                    this.props.form.getFieldsValue().type[0] === 'technology' &&
                    (<div>
                        <InputItem
                            {...getFieldProps('projectName')}
                            clear
                            placeholder="请输入项目名称"
                        >项目名称</InputItem>
                        <InputItem
                            {...getFieldProps('targetRegion')}
                            clear
                            placeholder="请输入意向区域"
                        >意向区域</InputItem>
                        <InputItem
                            {...getFieldProps('field')}
                            clear
                            placeholder="请输入产品及应用领域"
                        >产品及应用领域</InputItem>
                        <InputItem
                            {...getFieldProps('revenue')}
                            clear
                            placeholder="请输入营收"
                        >营收</InputItem>
                        <InputItem
                            {...getFieldProps('financing')}
                            clear
                            placeholder="请输入融资历史"
                        >融资历史</InputItem>
                        <InputItem
                            {...getFieldProps('team')}
                            clear
                            placeholder="请输入团队规模"
                        >团队规模</InputItem>
                    </div>)
                }

                {
                    this.props.form.getFieldsValue().type &&
                    this.props.form.getFieldsValue().type[0] === 'industry' &&
                    (<div>
                        <InputItem
                            {...getFieldProps('projectName')}
                            clear
                            placeholder="请输入项目名称"
                        >项目名称</InputItem>
                        <InputItem
                            {...getFieldProps('targetRegion')}
                            clear
                            placeholder="请输入意向区域"
                        >意向区域</InputItem>
                        <InputItem
                            {...getFieldProps('field')}
                            clear
                            placeholder="请输入产品及应用领域"
                        >产品及应用领域</InputItem>
                        <InputItem
                            {...getFieldProps('carrier')}
                            clear
                            placeholder="请输入载体需求"
                        >载体需求</InputItem>
                        <InputItem
                            {...getFieldProps('output_tax')}
                            clear
                            placeholder="请输入产值税收"
                        >产值税收</InputItem>
                        <InputItem
                            {...getFieldProps('investment')}
                            clear
                            placeholder="请输入投资强度"
                        >投资强度</InputItem>
                    </div>)
                }

                <Item>
                    <Button type="primary" size="small" inline onClick={this.onSubmit}>提交</Button>
                    <Button size="small" inline style={{marginLeft: '2.5px'}} onClick={this.onReset}>重置</Button>
                    <Button type="primary" size="small" inline onClick={this.onTest}>提交</Button>
                </Item>
            </List>
        </form>);
    }
}

const BasicInputWrapper = createForm()(BasicInput);

export default BasicInputWrapper;