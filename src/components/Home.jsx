import React, { useState } from "react";
import {
  Space,
  Table,
  Button,
  Select,
  InputNumber,
  Input,
  Row,
  Col,
  Form,
  Checkbox,
  Modal,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import dataList from "../lib/helpers/data.json";
import newDataList from "../lib/helpers/newdata.json";

const Home = () => {
  const [data, setData] = useState(dataList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newData, setNewData] = useState(newDataList);
  const [form] = Form.useForm();

  const bookingLists =
    data?.map((list, index) => ({
      ...list,
      index: index + 1,
    })) ?? [];

  const columns = [
    {
      title: "Ingredients Name",
      dataIndex: "IngredientName",
      key: "IngredientName",
    },
    {
      title: "Category",
      dataIndex: "CategoryTitle",
      key: "CategoryTitle",
    },
    {
      title: "Sub Category",
      dataIndex: "RecipeSubCategoryTitle",
      key: "RecipeSubCategoryTitle",
    },
    {
      title: "Biological Hazard",
      key: "BiologicalHazardTitle",
      dataIndex: "BiologicalHazardTitle",
    },
    {
      title: "Hazard Address by Supplier",
      dataIndex: "Status",
      key: "Status",
      render: (item, records, index) => (
        <Checkbox
          onChange={(e) => onChangeStatus(e.target.checked, index)}
          style={{ float: "center" }}
          checked={item}
        ></Checkbox>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "Status",
      width: 70,
      render: (item, records, index) => (
        <>
          <PlusOutlined
            onClick={(e) => onClickHandler(index)}
            style={{ color: "green", fontWeight: "50" }}
          />
          {records.isDelete && (
            <DeleteOutlined
              onClick={(e) => onDeleteHandler(index)}
              style={{ color: "red", marginLeft: 10 }}
            />
          )}
        </>
      ),
    },
    {
      title: "Process",
      dataIndex: "process",
      key: "process",
      render: (item, records, index) => (
        <Select
          value={item}
          style={{
            width: 120,
          }}
          onChange={(e) => handleChangeProcess(e, index)}
          options={processOptions}
        />
      ),
    },
    {
      title: "Min Units",
      dataIndex: "min_units",
      width: 150,
      key: "min_units",
      render: (item, record, index) => (
        <div className="site-input-group-wrapper">
          <Input.Group size="default">
            <Row gutter={5}>
              <Col span={16}>
                <Form style={{ marginTop: 20 }}>
                  <Form.Item
                    name="min_units"
                    rules={[
                      {
                        type: "number",
                        min: 159,
                        max: 180,
                        message: "Please enter value between 160 and 180",
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={(e) => handleChangeMin(e, index)}
                      value={item}
                      max={180}
                      min={160}
                      style={{ width: 80 }}
                      controls={false}
                    />
                    {console.log("Item123", item)}
                  </Form.Item>
                </Form>
              </Col>
              <Col span={8}>
                <p style={{ marginLeft: 10 }}>°F</p>
              </Col>
            </Row>
          </Input.Group>
        </div>
      ),
    },
    {
      title: "Max Units",
      dataIndex: "max_units",
      width: 150,
      key: "max_units",
      render: (item, record, index) => (
        <div className="site-input-group-wrapper">
          <Input.Group size="default">
            <Row gutter={5}>
              <Col span={16} style={{ marginTop: 20 }}>
                <Form>
                  <Form.Item
                    name="age"
                    rules={[
                      {
                        type: "number",
                        min: 159,
                        max: 180,
                        message: "Please enter value between 160 and 180",
                      },
                    ]}
                  >
                    {console.log("Item", item)}
                    <InputNumber
                      value={item}
                      onChange={(e) => handleChangeMax(e, index)}
                      max={180}
                      min={160}
                      style={{ width: 80 }}
                      controls={false}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={8}>
                <p style={{ marginLeft: 10 }}>°F</p>
              </Col>
            </Row>
          </Input.Group>
        </div>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (item, record, index) => (
        <>
          <InputNumber
            value={item}
            onChange={(e) => handleChangeDuration(e, index)}
            style={{ width: 80 }}
            controls={false}
          />
        </>
      ),
    },
    {
      title: "Interval",
      dataIndex: "interval",
      key: "interval",
      render: (item, record, index) => (
        <Select
          value={item}
          placeholder="Select"
          style={{
            width: 120,
          }}
          onChange={(e) => handleChange(e, index)}
          options={[
            {
              value: "second",
              label: "second",
            },
            {
              value: "minute",
              label: "minute",
            },
            {
              value: "hour",
              label: "hour",
            },
          ]}
        ></Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 180,
      fixed: "right",
      render: (item) => (
        <Space>
          {/* <Button onClick={() => bookingRef.current.open(item)}> */}
          {/* <Button onClick={() => router.push(`/booking/${item.id}`)}>
                <FiEye />
              </Button> */}

          <Button type="primary" onClick={success}>
            Analyze
          </Button>
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Pathogens Controlled</p>
          </Modal>
        </Space>
      ),
    },
  ];

  const processOptions = newDataList.map((data) => {
    return {
      label: data.ProcessTitle,
      value: data.ProcessTitle,
    };
  });

  const onClickHandler = (index) => {
    let newData = [...data];
    newData.splice(index, 0, data[index]);
    newData[index + 1] = { ...data[index], isDelete: true };
    setData(newData);
  };

  const onDeleteHandler = (index) => {
    let newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleChange = (value, index) => {
    let newData = [...data];
    newData[index].interval = value;
    setData(newData);
  };

  const onChangeStatus = (value, index) => {
    let newData = [...data];
    newData[index].Status = value;
    setData(newData);
  };

  const handleChangeMin = (value, index) => {
    let newData = [...data];
    newData[index].min_units = value;
    setData(newData);
  };

  const handleChangeMax = (value, index) => {
    let newData = [...data];
    newData[index].max_units = value;
    setData(newData);
  };

  const handleChangeDuration = (value, index) => {
    let newData = [...data];
    newData[index].duration = value;
    setData(newData);
  };

  const handleChangeProcess = (value, index) => {
    let newData = [...data];
    newData[index].process = value;
    setData(newData);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    let newData = [...data];
    setData(newData);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const success = () => {
    Modal.success({
      content: "Pathogens Controlled",
    });
  };

  return (
    <div style={{ margin: 30 }}>
      <h1>Biological Hazard</h1>
      <Table
        // key={columns.key}
        columns={columns}
        dataSource={bookingLists}
      />
      ;
    </div>
  );
};

export default Home;
