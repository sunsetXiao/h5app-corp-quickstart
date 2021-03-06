import React from 'react';
import {List, InputItem, Switch, Stepper, Range, Button, Picker} from 'antd-mobile';
import {createForm} from 'rc-form';
import config from '../../config.js'

const host = config.host
const Item = List.Item;

class BasicInput extends React.Component {

    componentDidMount() {
    }

    onSubmit = () => {
        this.props.form.validateFields({force: true}, (error) => {
            if (!error) {
                const {name, address, mobile, phone, position, company} = this.props.form.getFieldsValue();
                fetch(host + '/contact/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name, address, mobile, phone, position, company: company && { id: this.props.location.state.company.id}
                    })
                })
                    .then(res => res.json())
                    .then(result => {
                        // const state = this.props.location.state;
                        // this.props.history.replace(state.pathname, state)
                        this.props.history.goBack();
                    })
            } else {
                // alert('Validation failed');
            }
        });
    }
    onReset = () => {
        this.props.form.resetFields();
    }

    render() {
        // console.log( this.props)
        const {getFieldProps, getFieldError} = this.props.form;
        const data = this.props.location.state;

        return (<form>
            <List
                renderFooter={() =>
                    getFieldError('name') && getFieldError('name').join(',')
                }
            >
                <InputItem
                    {...getFieldProps('name', {
                        rules: [
                            {required: true, message: '请输入姓名'}
                        ],
                        initialValue: data && data.name
                    })}
                    clear
                    error={!!getFieldError('name')}
                    placeholder="请输入姓名"
                >名称</InputItem>


                <InputItem
                    {...getFieldProps('address', {
                        initialValue: data && data.address
                    })}
                    clear
                    placeholder="请输入地址"
                >地址</InputItem>
                <InputItem
                    {...getFieldProps('mobile', {
                        initialValue: data && data.mobile
                    })}
                    clear
                    placeholder="请输入手机号"
                >手机</InputItem>
                <InputItem
                    {...getFieldProps('phone', {
                        initialValue: data && data.phone
                    })}
                    clear
                    placeholder="请输入固定电话"
                >固定电话</InputItem>
                <InputItem
                    {...getFieldProps('position', {
                        initialValue: data && data.position
                    })}
                    clear
                    placeholder="请输入职位"
                >职位</InputItem>

                <InputItem
                    {...getFieldProps('company', {
                        initialValue: data && data.company && data.company.name
                    })}
                    editable={false}
                    placeholder="请选择公司"
                    onClick={() => {
                        console.log(this.props.form.getFieldsValue())
                        this.props.history.push("/select/company", {
                            pathname: `/create/contact`,
                            ...this.props.form.getFieldsValue()
                        })
                    }}
                >公司</InputItem>

                <Item>
                    <Button type="primary" size="small" inline onClick={this.onSubmit}>提交</Button>
                    <Button size="small" inline style={{marginLeft: '2.5px'}} onClick={this.onReset}>重置</Button>
                </Item>
            </List>
        </form>);
    }
}

const BasicInputWrapper = createForm()(BasicInput);

export default BasicInputWrapper;