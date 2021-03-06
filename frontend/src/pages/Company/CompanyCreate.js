import React from 'react';
import {List, InputItem, Modal, Button, Picker} from 'antd-mobile';
import {createForm} from 'rc-form';
import config from '../../config.js'
import * as dd from "dingtalk-jsapi/index";

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
        type: [{value: "technology", label: "科技类"}, { value: "industry", label: "产业类" }],
        poi: {}
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
                const {name, industry, description, note, type, projectName, targetRegion, field, revenue, financing, team, carrier, output_tax, investment} = this.props.form.getFieldsValue();
                fetch(host + '/company/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        industry_id: industry[1],
                        // city_id: area[1],
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
                        investment,
                        poi: this.state.poi
                    })
                })
                    .then(res => res.json())
                    .then(result => {
                        // const to = {
                        //     pathname: this.props.location.state.pathname,
                        //     state: this.props.location.state,
                        // };
                        const state = this.props.location.state;
                        this.props.history.replace(state.pathname, state)
                    })
            } else {
                // alert('Validation failed');
            }
        });
    }
    onReset = () => {
        this.props.form.resetFields();
    }

    onPOIClick = async () => {
        if (dd.env.platform !== 'notInDingTalk') {
            const result = await  dd.biz.map.locate({
                // latitude: 39.903578, // 纬度，非必须
                // longitude: 116.473565, // 经度，非必须
                scope: 500, // 限制搜索POI的范围；设备位置为中心，scope为搜索半径
                // onSuccess: function (result) {
                //     /* result 结构 */
                //     // {
                //     //     province: 'xxx', // POI所在省会，可能为空
                //     //         provinceCode: 'xxx', // POI所在省会编码，可能为空
                //     //     city: 'xxx', // POI所在城市，可能为空
                //     //     cityCode: 'xxx', // POI所在城市编码，可能为空
                //     //     adName: 'xxx', // POI所在区名称，可能为空
                //     //     adCode: 'xxx', // POI所在区编码，可能为空
                //     //     distance: 'xxx', // POI与设备位置的距离
                //     //     postCode: 'xxx', // POI的邮编，可能为空
                //     //     snippet: 'xxx', // POI的街道地址，可能为空
                //     //     title: 'xxx', // POI的名称
                //     //     latitude: 39.903578, // POI的纬度
                //     //     longitude: 116.473565, // POI的经度
                //     // }
                //     // alert("result" + JSON.stringify(result))
                // },
                // onFail: function (err) {
                //     alert(JSON.stringify(err))
                // }
            });

            this.props.form.setFieldsValue({
                poi: result && result.title
            })
            this.setState({
                poi: result
            })
        }
    }

    onNameExtraClick = async () => {
        const { name } = this.props.form.getFieldsValue();
        const res = await fetch(`http://enterprise.market.alicloudapi.com/ai_market/ai_enterprise_knowledge/enterprise_simple/v2?STRING=${name}&PAGE=1`, {
            method: 'GET',
            headers: {
                'Authorization': 'APPCODE 76688c19d6684e7c89c39f3eb90fd4b9'
            },
        });

        const result = await res.json();

        const actions = result.企业工商数据实体信息.map(ele => ({
            text: ele.企业名称,
            onPress: () => this.queryCompany(ele.企业名称)
        }))

        Modal.operation(actions);
    }

    queryCompany = async (name) => {
        const res = await fetch(`http://enterprise.market.alicloudapi.com/ai_market/ai_enterprise_knowledge/enterprise_simple/v1?STRING=${name}`, {
            method: 'GET',
            headers: {
                'Authorization': 'APPCODE 76688c19d6684e7c89c39f3eb90fd4b9'
            },
        });

        const result = await res.json();
        console.log("resultsss", result)
        this.props.form.setFieldsValue({
            // note: result.ENTERPRISE_CAPITAL
        })
    }
    // validateAccount = (rule, value, callback) => {
    //     if (value && value.length > 4) {
    //         callback();
    //     } else {
    //         callback(new Error('At least four characters for account'));
    //     }
    // }
    // onTest = () => {
    //     // alert(JSON.stringify(localStorage));
    //     this.props.history.push("/select/contact", {... this.props.form.getFieldsValue(), pathname: '/create/company'})
    //     // console.log(this.props.children)
    // }
    render() {
        const {getFieldProps, getFieldError} = this.props.form;

        return (<form>
            <List
                // renderHeader={() => '创建公司'}
                renderFooter={() =>
                    getFieldError('name') && getFieldError('name').join(',')  ||
                    getFieldError('industry') && getFieldError('industry').join(',') ||
                    getFieldError('type') && getFieldError('type').join(',')
                }
            >
                <InputItem
                    {...getFieldProps('name', {
                        rules: [
                            {required: true, message: '请输入公司名'}
                        ],
                    })}
                    clear
                    error={!!getFieldError('name')}
                    placeholder="请输入公司名"
                    extra="工商信息补全"
                    onExtraClick={() => this.onNameExtraClick()}
                >名称</InputItem>

                <Picker
                        data={this.state.industry}
                        title="行业"
                        {...getFieldProps('industry', {
                            rules: [
                                {required: true, message: '请选择行业'}
                            ],
                            // initialValue: [1, 1]
                        })}
                >
                    <List.Item arrow="horizontal">行业</List.Item>
                </Picker>

                <InputItem
                    {...getFieldProps('poi')}
                    clear
                    editable={false}
                    placeholder="请选择公司所在地址"
                    onClick={this.onPOIClick}
                >地址</InputItem>

                <InputItem
                    {...getFieldProps('description')}
                    clear
                    placeholder="请输入公司信息描述"
                >描述</InputItem>
                <InputItem
                    {...getFieldProps('note')}
                    clear
                    placeholder="请输入备注信息"
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
                    {/*<Button type="primary" size="small" inline onClick={this.onTest}>提交</Button>*/}
                </Item>
            </List>
        </form>);
    }
}

const BasicInputWrapper = createForm()(BasicInput);

export default BasicInputWrapper;