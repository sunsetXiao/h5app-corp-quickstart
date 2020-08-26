import React from 'react';
import {List, InputItem, Switch, Stepper, Range, Button, Picker} from 'antd-mobile';
import {createForm} from 'rc-form';

const Item = List.Item;

class BasicInput extends React.Component {
    state = {
        value: 1,
    }
    onSubmit = () => {
        this.props.form.validateFields({force: true}, (error) => {
            if (!error) {
                console.log(this.props.form.getFieldsValue());
            } else {
                alert('Validation failed');
            }
        });
    }
    onReset = () => {
        this.props.form.resetFields();
    }
    validateAccount = (rule, value, callback) => {
        if (value && value.length > 4) {
            callback();
        } else {
            callback(new Error('At least four characters for account'));
        }
    }

    render() {
        const {getFieldProps, getFieldError} = this.props.form;
        const district = [
            {
                value: 1,
                label: '全部',
                children: [],
            },
            {
                value: 2,
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
                ],
            },
        ];

        return (<form>
            <List
                // renderHeader={() => '创建公司'}
                renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
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
                >名称</InputItem>

                <Picker extra="请选择(可选)"
                        data={district}
                        title="Areas"
                        {...getFieldProps('district')}
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
                >
                    <List.Item arrow="horizontal">Multiple & cascader</List.Item>
                </Picker>



                <InputItem
                    {...getFieldProps('account', {
                        // initialValue: 'little ant',
                        rules: [
                            {required: true, message: 'Please input account'},
                            {validator: this.validateAccount},
                        ],
                    })}
                    clear
                    error={!!getFieldError('account')}
                    onErrorClick={() => {
                        alert(getFieldError('account').join('、'));
                    }}
                    placeholder="please input account"
                >Account</InputItem>

                <InputItem {...getFieldProps('password')} placeholder="please input password" type="password">
                    Password
                </InputItem>

                <Item
                    extra={<Switch {...getFieldProps('1', {initialValue: true, valuePropName: 'checked'})} />}
                >Confirm Infomation</Item>

                <Item>
                    <div style={{padding: 7}}><Range defaultValue={[20, 80]}/> </div>
                </Item>
                <Item extra={<Stepper style={{width: '100%', minWidth: '100px'}} showNumber size="small"
                                      defaultValue={20}/>}>Number of Subscribers</Item>
                <Item>
                    <Button type="primary" size="small" inline onClick={this.onSubmit}>Submit</Button>
                    <Button size="small" inline style={{marginLeft: '2.5px'}} onClick={this.onReset}>Reset</Button>
                </Item>
            </List>
        </form>);
    }
}

const BasicInputWrapper = createForm()(BasicInput);

export default BasicInputWrapper;