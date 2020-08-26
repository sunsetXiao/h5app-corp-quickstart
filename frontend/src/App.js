import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
} from 'react-router-dom';
import {Layout, Row, Col, Menu, Icon, Card, Button} from 'antd';
import H5AppQSHeader from './components/header.js';
import H5AppQSContacts from './components/contacts.js';
import H5AppQSDeplist from './components/deplist.js';
import MTabBar from './pages/Tabbar';
import * as dd from 'dingtalk-jsapi';
import config from './config.js';

import './App.css';
import CompanyDetail from "./pages/CompanyDetail/CompanyDetail";

const host = config.host;

const {Header, Content, Footer} = Layout;
const PlatformDetail = function (props) {
    return (
        <Card title="平台详情" style={{width: 400, margin: '15px auto'}}>
            <Row gutter={[16, 8]}>
                <Col span={8} style={{textAlign: 'right'}}>
                    平台:
                </Col>
                <Col span={14} style={{textAlign: 'left'}}>
                    {props.env.platform}
                </Col>
            </Row>
            {'version' in props.env && props.env.version && (
                <Row gutter={[16, 8]}>
                    <Col span={8} style={{textAlign: 'right'}}>
                        版本:
                    </Col>
                    <Col span={14} style={{textAlign: 'left'}}>
                        {props.env.version}
                    </Col>
                </Row>
            )}
            <Row gutter={[16, 8]}>
                <Col span={8} style={{textAlign: 'right'}}>
                    应用类型:
                </Col>
                <Col span={14} style={{textAlign: 'left'}}>
                    {props.env.appType}
                </Col>
            </Row>
            <Row gutter={[16, 8]}>
                <Col span={8} style={{textAlign: 'right'}}>
                    语言:
                </Col>
                <Col span={14} style={{textAlign: 'left'}}>
                    {props.env.language}
                </Col>
            </Row>
        </Card>
    );
};

const alert = function (msg) {
    dd.device.notification
        .alert({
            message: msg,
            title: '提示', //可传空
            buttonName: '确定',
            onSuccess: function () {
            },
            onFail: function (err) {
            },
        })
        .catch((err) => {
            window.alert(msg);
        });
};

function DeptList(props) {
    let {deptId} = useParams();
    return <H5AppQSDeplist deptId={deptId} config={props.config}/>;
}

class H5AppQS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            env: dd.env,
            user: {
                name: '用户名',
                userid: 'userid',
                avatar: null,
            },
            authCode: null,
            config: {
                corpId: null,
                agentId: null,
            },
            current: 'home',
        };
    }

    componentDidMount() {

        if (dd.env.platform !== 'notInDingTalk') {
            dd.config({
                ...this.props.config,
                jsApiList: ['biz.util.scanCard'],
            });
            dd.ui.webViewBounce.disable();

            // 设置导航栏标题
            dd.biz.navigation
                .setTitle({
                    title: '招商宝', //控制标题文本，空字符串表示显示默认文本
                    onSuccess: function (result) {
                    },
                    onFail: function (err) {
                    },
                })
                .catch((err) => {
                    console.log(err + '');
                });
        }

        const that = this;
        fetch(host + '/config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
            },
            mode: 'cors',
            body: 'url=' + window.location.href.replace(window.location.hash, ''),
        })
            .then((res) => res.json())
            .then((result) => {
                that.setState({
                    config: {
                        ...result.result,
                    },
                });

                dd.runtime.permission
                    .requestAuthCode({
                        corpId: that.state.config.corpId,
                        onSuccess: function (info) {
                            that.setState({
                                authCode: info.code,
                            });
                            fetch(host + '/login', {
                                method: 'POST',
                                headers: {
                                    'Content-Type':
                                        'application/x-www-form-urlencoded;charset=UTF-8',
                                    'Access-Control-Allow-Origin': '*',
                                },
                                mode: 'cors',
                                body: 'authCode=' + info.code,
                            })
                                .then((res) => res.json())
                                .then((result) => {
                                    that.setState({
                                        user: {
                                            ...result.result,
                                        },
                                    });
                                });
                        },
                        onFail: function (err) {
                            alert('免登授权码获取失败: ' + JSON.stringify(err));
                        },
                    })
                    .catch((err) => {
                        console.log(err + '');
                    });
            })
            .catch((err) => {
                alert('获取JS鉴权信息失败: ' + JSON.stringify(err));
            });
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    };

    handleButtonClick = (e) => {
        dd.biz.util.scanCard({
            // 无需传参数
            onSuccess: function (data) {
                //onSuccess将在扫码成功之后回调
                /* data结构
                         {
                           "ADDRESS": "深圳市南山区软件产业基地",
                           "COMPANY": "深圳市李乔科技有限公司",
                           "NAME": "李乔",
                           "MPHONE": "861333567890",
                           "PHONE": "01087654321",
                           "POSITION": "CEO",
                           "IMAGE": "http://www.taobao.com/xxx.jpg",
                           "dt_tranfer": "BusinessCard",
                           "request_id": "20161206144554_efd40582d477a29df2e3bc62c260cdae"
                        }
                        */
                //  console.log('')
                alert(JSON.stringify(data));
            },
            onFail: function (err) {
                alert(JSON.stringify(err));
            },
        });
    };

    // render() {
    //     return (
    //         <div>
    //             <Layout>
    //                 <Header><H5AppQSHeader user={this.state.user} /></Header>
    //                 <Content>
    //                     <PlatformDetail env={this.state.env} />

    //                     <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={[this.state.current]}>
    //                         <Menu.Item key="home">
    //                             <Link to="/"><Icon type="home" /> 首页</Link>
    //                         </Menu.Item>
    //                         <Menu.Item key="contacts">
    //                             <Link to="/contacts"><Icon type="team" /> 企业联系人</Link>
    //                         </Menu.Item>
    //                     </Menu>
    //                     <Switch>
    //                         <Route path="/contacts">
    //                             <H5AppQSContacts />
    //                         </Route>
    //                         <Route path="/deptlist/:deptId">
    //                             <DeptList config={this.state.config} />
    //                         </Route>
    //                         <Route path="/">
    //                             <Button onClick={this.handleButtonClick}>
    //                                 扫描1
    //                             </Button>
    //                         </Route>
    //                     </Switch>
    //                 </Content>
    //                 <Footer>@opendingtalk</Footer>
    //             </Layout>
    //         </div>
    //     )
    // }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={MTabBar}/>
                <Route path="/company/:id" component={CompanyDetail}/>
            </Switch>
        )

    }
}

function App(props) {
    return (
        <Router>
            <div className="App">
                <H5AppQS config={props.config}/>
            </div>
        </Router>
    );
}

export default App;
