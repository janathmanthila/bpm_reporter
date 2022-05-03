import React, {useState} from "react";
import { Row, Col, Form, Input, Button, Space, Typography, Card, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DateTimePicker from 'react-datetime-picker';

import BPMChart from "./Chart";

const BPMReporter = () => {
    const [records, setRecords] = useState([])

    function epoch (date) {
        return Date.parse(date)
    }


    const onFinish = values => {
        console.log('Received values of form:', values);
        setRecords(values.records.map(r => [epoch(r.datetime), r.bpmRate]))
    };

    return (
        <div  style={{marginTop:50}}>
            <Typography.Title style={{textAlign:"center"}}>BPM REPORTER</Typography.Title>
            <Row gutter={16} justify="center">
                <Col span={8}>
                    <Card>
                        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                            <Form.List name="records">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'datetime']}
                                                    rules={[{ required: true, message: 'Missing event time' }]}
                                                >
                                                    <DateTimePicker />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'bpmRate']}
                                                    rules={[{ required: true, message: 'Missing BPM value' }]}
                                                >
                                                    <InputNumber placeholder="BPM" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Add New Record
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Generate Report
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>

                </Col>
                <Col span={24}>
                    <BPMChart values={records}/>
                </Col>
            </Row>
        </div>
    )
}

export default BPMReporter;