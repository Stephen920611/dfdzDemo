/**
 * @description
 * @Version Created by stephen on 2019/5/8.
 * @Author stephen
 * @license dongfangdianzi
 */
import './index.scss';
import T from './../../../utils/T';
import $ from 'jquery';
import React from 'react';
import _ from 'lodash';

import { submitInfo, refreshInfo } from './../webAPI/index';
import { Row, Col, Button, Checkbox, Icon, Form, Input } from 'antd';

const CustomizedForm = Form.create({
    name: 'global_state',
    onFieldsChange(props, changedFields) {
        props.handleFormChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            username: Form.createFormField({
                ...props.username,
                value: props.username.value,
            }),
        };
    },
})((props) => {
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 10 },
        },
    };
    return (
        <Form >
            <Form.Item
                label="用户名"
                {...formItemLayout}
            >
                {getFieldDecorator('username', {
                        rules: [{
                            required: true, message: '用户名不能为空',
                        }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                    )}
            </Form.Item>
        </Form>
    );
});

export default class ParticpleComponent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            /*
            * 数据格式
            {
                allText: '山东省莱州市郭家店镇大街红绿灯向东太平庄路口',
                participleArr: [
                    {
                        isKeyWord: false,
                        value: '山东省'
                    },
                    {
                        isKeyWord: false,
                        value: '莱州市'
                    },
                    {
                        isKeyWord: false,
                        value: '郭家'
                    },
                    {
                        isKeyWord: false,
                        value: '店'
                    },
                    {
                        isKeyWord: false,
                        value: '镇'
                    },
                    {
                        isKeyWord: false,
                        value: '大街'
                    },
                    {
                        isKeyWord: false,
                        value: '红绿灯'
                    },
                    {
                        isKeyWord: false,
                        value: '向东'
                    },
                    {
                        isKeyWord: false,
                        value: '太平庄'
                    },
                    {
                        isKeyWord: false,
                        value: '路口'
                    },
                ],
                participleData: ['山东省','莱州市','郭家','店','镇','大街','红绿灯','向东','太平庄','路口'],
            }
            */
            allReceiveData: [],     //后台返回的所有数据
            checkValues1: [],    //选择的多选框1
            checkValues2: [],    //选择的多选框2
            segmentWordData: [],    //切分词
            stopWordData: [],    //停用词
            codeParams: '',
            fields: {
                username: {
                    value: '',
                },
            },
            username: '',   //用户名
            inputValue: '', //手动添加关键词
        };
    }

    componentDidMount() {
        // let that = this;
        // let data = {
        //     "code": "370683012018093014091101127",
        //     "resultList": [
        //         {
        //             "original": "山东省莱州市沙河镇驿塘村",
        //             "analyze": [
        //                 "沙河镇",
        //                 "驿",
        //                 "塘",
        //                 "村"
        //             ]
        //         },
        //         {
        //             "original": "报称被人拦着不让走了",
        //             "analyze": [
        //                 "报",
        //                 "称",
        //                 "被人",
        //                 "拦着",
        //                 "不让",
        //                 "走了"
        //             ]
        //         }
        //     ]
        // };
        // setTimeout(function () {
        //     let endData = data.resultList.map( (val,idx) => {
        //         let arr = val.analyze.map((item)=> {
        //             return {
        //                 isKeyWord: false,
        //                 value: item
        //             }
        //         });
        //         return {
        //             participleData: val.analyze,
        //             allText: val.original,
        //             participleArr: arr,
        //         }
        //     });
        //     that.setState({
        //         allReceiveData: endData
        //     });
        // },1000)
        this.freshAllInfo()
    }

    //多选框改变
    checkboxChange = (idx,checkValues) => {
        let obj = {};
        obj['checkValues' + (idx + 1)] = checkValues;
        this.setState(obj)
    };

    //禁止使用关键词
    forbidWord = (idx) => {
        const {checkValues1, checkValues2, allReceiveData} = this.state;

        let obj = {};
        //更新数据
        let updateArr = allReceiveData[idx].participleArr.map(val => {
            if((idx === 0 ? checkValues1 : checkValues2).indexOf(val.value) !== -1){
                return {
                    isKeyWord: true,
                    value: val.value
                }
            }else {
                return val
            }
        });

        allReceiveData[idx].participleArr = updateArr;
        //清空选项
        obj['checkValues' + (idx + 1)] = [];
        obj['participleArr']= allReceiveData;
        this.setState(obj);

    };

    //添加到切分词
    addToSegmentWord = (idx) => {
        const {checkValues1,checkValues2, segmentWordData} = this.state;
        //切分词和停用词必须要加上key
        let keyArr = (idx === 0 ? checkValues1 : checkValues2).map( val => {
            return {
                value: val,
                key: idx + 1
            }
        });
        this.setState({
            segmentWordData: _.uniq(keyArr.concat(segmentWordData))
        });
        this.forbidWord(idx)
    };

    /**
     * 添加到切分词或者停用词
     * @param idx 0是第一组，1是第二组
     * @param isSegment 是否是切分词，true是切分，false是停用
     */
    addToSegmentOrStop = (idx,isSegment) => {
        const {checkValues1,checkValues2, stopWordData, segmentWordData} = this.state;
        //切分词和停用词必须要加上key
        let keyArr = (idx === 0 ? checkValues1 : checkValues2).map( val => {
            return {
                value: val,
                key: idx + 1
            }
        });
        //true为切分词，false为停用词
        if( isSegment ){
            this.setState({
                segmentWordData: _.uniq(keyArr.concat(segmentWordData))
            });
        }else {
            this.setState({
                stopWordData: _.uniq(keyArr.concat(stopWordData))
            });
        }
        //添加成功后就禁止使用
        this.forbidWord(idx)
    };

    //添加到停用词
    addToStopWord = (idx) => {
        const {checkValues1,checkValues2, stopWordData} = this.state;
        //切分词和停用词必须要加上key
        let keyArr = (idx === 0 ? checkValues1 : checkValues2).map( val => {
            return {
                value: val,
                key: idx + 1
            }
        });
        this.setState({
            stopWordData: _.uniq(keyArr.concat(stopWordData))
        });
        this.forbidWord(idx)
    };

    //合并加入切分词
    combineToSegmentWord = (idx) => {
        const {checkValues1, checkValues2, segmentWordData, allReceiveData} = this.state;
        let combineStr = '';
        //这么做是为了按照顺序排列加载
        allReceiveData[idx].participleData.forEach( val => {
            if((idx === 0 ? checkValues1 : checkValues2).indexOf(val) !== -1){
                combineStr+= val
            }
        });
        let endData = [];
        //如果都不选的话 合并添加就不好用
        if(combineStr !== ''){
            endData.push({
                key: idx + 1,
                value: combineStr
            });
        }

        //更新state
        let obj = {};
        obj['checkValues' + (idx + 1)] = [];
        obj['segmentWordData'] =  _.uniq(segmentWordData.concat(endData));
        //数组相拼然后去重
        this.setState(obj);
    };

    //合并加入停用词
    combineToStopWord = (idx) => {
        const {checkValues1, checkValues2, stopWordData, allReceiveData} = this.state;
        let combineStr = '';
        //这么做是为了按照顺序排列加载
        allReceiveData[idx].participleData.forEach( val => {
            if((idx === 0 ? checkValues1 : checkValues2).indexOf(val) !== -1){
                combineStr+= val
            }
        });
        let endData = [];
        //如果都不选的话 合并添加就不好用
        if(combineStr !== ''){
            endData.push({
                key: idx + 1,
                value: combineStr
            });
        }

        //更新state
        //数组相拼然后去重
        let obj = {};
        obj['checkValues' + (idx + 1)] = [];
        obj['stopWordData'] =  _.uniq(stopWordData.concat(endData));
        //数组想拼然后去重
        this.setState(obj);
    };

    //手动添加词
    addInputValueToSegmentOrStop = (isSegment) => {
        const { inputValue, segmentWordData, stopWordData } = this.state;
        //切分词和停用词必须要加上key
        let keyArr = [];
        keyArr.push({
            value: inputValue,
            key: 3
        });
        if(isSegment){
            this.setState({
                segmentWordData: _.uniq(keyArr.concat(segmentWordData)),
                inputValue: ''
            });
        }else {
            this.setState({
                stopWordData: _.uniq(keyArr.concat(stopWordData)),
                inputValue: ''
            });
        }
    };

    //取消选择
    cancelChoose = (idx) => {
        let obj = {};
        obj['checkValues' + (idx + 1)] = [];
        this.setState(obj)
    };

    //允许使用关键词
    allowWord = (value, isArr = false) => {
        const { allReceiveData } = this.state;
        let arrData;
        if(isArr){
            value.forEach( item => {
                let singleId = Number(item.key) - 1;
                //如果小于2就不是手动添加的,需要允许使用
                if(singleId < 2){
                    arrData = allReceiveData[singleId].participleArr.map(val => {
                        if(val.value === item['value']){
                            return {
                                isKeyWord: false,
                                value: item['value']
                            }
                        }else{
                            return val
                        }
                    });
                    allReceiveData[singleId].participleArr = arrData;
                }
            });
        }else {
            let singleId = Number(value.key) - 1;
            //如果小于2就不是手动添加的,需要允许使用
            if(singleId < 2){
                arrData = allReceiveData[singleId].participleArr.map(val => {
                    if(val.value === value['value']){
                        return {
                            isKeyWord: false,
                            value: value['value']
                        }
                    }else{
                        return val
                    }
                });
                allReceiveData[singleId].participleArr = arrData;
            }
        }

        this.setState({
            allReceiveData
        })
    };
    //清空单个切分词
    clearSingleSegmentWord = (value) => {
        const { segmentWordData } = this.state;
        let wordData = [];
        //遍历去掉元素
        segmentWordData.forEach(val => {
            if(val !== value){
                wordData.push(val)
            }
        });
        this.setState({
            segmentWordData: wordData,
        });
        //允许使用关键词
        this.allowWord(value)
    };

    //清空单个停用词
    clearSingleStopWord = (value) => {
        const { stopWordData } = this.state;
        let endData = [];
        stopWordData.forEach(val => {
            if(val.value !== value.value){
                endData.push(val)
            }
        });
        this.setState({
            stopWordData: endData
        });
        this.allowWord(value)
    };

    //清空切分词
    clearSegmentWord = () => {
        const { segmentWordData }= this.state;
        this.allowWord(segmentWordData,true);
        this.setState({
            segmentWordData: []
        });
    };

    //清空停用词
    clearStopWord = () => {
        const { stopWordData }= this.state;
        this.allowWord(stopWordData,true);
        this.setState({
            stopWordData: []
        })
    };

    //提交功能
    submitAllWord = () => {
        const { fields, codeParams, segmentWordData, stopWordData } = this.state;
        //前端做判断，如果用户为空则不能提交
        if (fields.username.value !== '') {
            let params = {
                code: codeParams,
                person: fields.username.value,
                mainWord: segmentWordData.map( val => {
                    return val.value
                }),
                stopWord: stopWordData.map( val => {
                    return val.value
                })
            };
            submitInfo(params).then( resp => {
                T.prompt.success(resp.data)
            }, resp => {
                T.prompt.error(resp.message)
            })
        }else {
            T.prompt.error('请输入用户名')
        }
    };

    //刷新数据
    freshAllInfo = () => {
        //刷新数据
        refreshInfo().then( resp => {
            let data = resp.data;
            let endData = data.resultList.map( (val,idx) => {
                let arr = val.analyze.map((item)=> {
                    return {
                        isKeyWord: false,
                        value: item
                    }
                });
                return {
                    participleData: val.analyze,
                    allText: val.original,
                    participleArr: arr,
                }
            });
            this.setState({
                allReceiveData: endData,
                codeParams: data.code
            });
        }, resp => {
            T.prompt.error(resp.message)
        })
    };

    //改变input的值
    changeInputValue = (e) => {
        this.setState({
            inputValue: e.target.value
        });
    };

    //更改用户名
    handleFormChange = (changedFields) => {
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));
    };

    //重复渲染原句和切分词
    renderOriginalContent = (dataSource) => {
        const {checkValues1, checkValues2} = this.state;
        if(dataSource.length > 0 ){
            return dataSource.map( (val,idx) => {
                return (
                    <div className={'original-content'} key={idx}>
                        <Row>
                            <Col span={2}>原句:</Col>
                            <Col style={{fontSize: 18}} span={20}>{val.allText}</Col>
                        </Row>
                        <Row className={'participle-content'}>
                            <Col span={2}>分词:</Col>
                            <Col span={20}>
                                <Checkbox.Group
                                    style={{ width: '100%' }}
                                    onChange={this.checkboxChange.bind(this,idx)}
                                    value={idx === 0 ? checkValues1 : checkValues2}
                                >
                                    <Row>
                                        {
                                            val.participleArr.map((item,idx) => {
                                                return (
                                                    <Col key={idx} span={3}>
                                                        <Checkbox disabled={item.isKeyWord} value={item.value}>
                                                            {item.value}
                                                        </Checkbox>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </Checkbox.Group>
                                <Row>
                                    <Col span={20} offset={4} className={'participle-btns'}>
                                        <Button onClick={this.cancelChoose.bind(this,idx)} type="primary">取消</Button>
                                        <Button onClick={this.combineToStopWord.bind(this,idx)} type="primary">合并加入停用词</Button>
                                        <Button onClick={this.combineToSegmentWord.bind(this,idx)} type="primary">合并加入切分词</Button>
                                        <Button onClick={this.addToSegmentOrStop.bind(this,idx, false)} type="primary">添加到停用词</Button>
                                        <Button onClick={this.addToSegmentOrStop.bind(this,idx, true)} type="primary">添加到切分词</Button>
                                    </Col>
                                    <Col span={24} className={'participle-btn-remark'}>
                                        <div >
                                            备注：点击+ 将词语添加到切分词中，点击-将词语添加到停用词中，选中多个字或词语点击合并可组成一个切分词语
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                )
            })
        }else {
            return (
                <div className={'ant-row'}>
                    暂无数据
                </div>
            )
        }

    };

    render() {
        const {segmentWordData, stopWordData, allReceiveData, fields, inputValue }= this.state;

        return (
            <div className={'main-container clearfix'}>
                <div className={'item'}>
                    {
                        this.renderOriginalContent(allReceiveData)
                    }
                    <Row className={'manually-add-content'}>
                        <Col span={2}>
                            手动分词:
                        </Col>
                        <Col span={12} className={'manually-add-input'}>
                            <Input onChange={this.changeInputValue} value={inputValue} placeholder="请输入关键词" allowClear={true}/>
                        </Col>
                        <Col span={6} offset={2} className={'manually-add-btn'}>
                            <Button onClick={this.addInputValueToSegmentOrStop.bind(this,true)} type="primary">添加到切分词</Button>
                            <Button onClick={this.addInputValueToSegmentOrStop.bind(this,false)} type="primary">添加到停用词</Button>
                        </Col>
                    </Row>
                    <Row className={'segment-content'}>
                        <Col span={2}>切分词:</Col>
                        <Col span={20}>
                            <div className={'segment-word clearfix'}>
                                {
                                    segmentWordData.map( (val,idx) => {
                                        return (
                                            <div key={idx}>
                                                <span>{val.value}</span>
                                                <Icon type="minus" onClick={this.clearSingleSegmentWord.bind(this,val,val.key)}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={'segment-btn'}>
                                <Button onClick={this.clearSegmentWord} type="primary">清空</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row className={'segment-content'}>
                        <Col span={2}>停用词:</Col>
                        <Col span={20}>
                            <div className={'segment-word clearfix'}>
                                {
                                    stopWordData.map( (val,idx) => {
                                        return (
                                            <div key={idx}>
                                                <span>{val.value}</span>
                                                <Icon type="minus" onClick={this.clearSingleStopWord.bind(this,val, val.key)}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={'segment-btn'}>
                                <Button onClick={this.clearStopWord} type="primary">清空</Button>
                            </div>
                        </Col>
                    </Row>

                    <CustomizedForm {...fields} handleFormChange={this.handleFormChange} />
                    <div className={'submit-fresh-btn'}>
                        <Button onClick={this.freshAllInfo} type="primary">下一条</Button>
                        <Button onClick={this.submitAllWord} type="primary">提交</Button>
                    </div>
                </div>
            </div>
        );

    }
}

// class UsernameForm extends React.PureComponent {
//
//     componentDidMount() {
//         console.log(111,'user_name');
//     }
//     /**
//      * 执行注册
//      * @param e
//      */
//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.props.form.validateFieldsAndScroll((err, values) => {
//             if (!err) {
//                 console.log('Received values of form: ', values);
//             }
//         });
//     };
//
//     render() {
//         const { getFieldDecorator } = this.props.form;
//         console.log(this.props,'setUsername');
//
//         const formItemLayout = {
//             labelCol: {
//                 xs: { span: 24 },
//                 sm: { span: 6 },
//             },
//             wrapperCol: {
//                 xs: { span: 24 },
//                 sm: { span: 10 },
//             },
//         };
//         return (
//             <Form onSubmit={this.handleSubmit}>
//                 <Form.Item
//                     {...formItemLayout}
//                     label="用户名"
//                 >
//                     {getFieldDecorator('user_name', {
//                         rules: [{
//                             required: true, message: '用户名不能为空',
//                         }],
//                     })(
//                         <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
//                     )}
//                 </Form.Item>
//             </Form>
//         );
//     }
// }

// const WrappedUsernameForm = Form.create()(UsernameForm);

