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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newData, setNewData] = useState(newDataList);

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
      render: (item) => (
        <Checkbox style={{ float: "center" }} onChange={onChange} />
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "Status",
      render: (item, records, index) => (
        <>
          <PlusOutlined onClick={(e) => onClickHandler(index)} />
          {records.isDelete && <DeleteOutlined />}
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
      title: "Min units",
      dataIndex: "min_units",
      width: 150,
      key: "min_units",
      render: (item, record, index) => (
        <div className="site-input-group-wrapper">
          <Input.Group size="default">
            <Row gutter={5}>
              <Col span={16}>
                <Form>
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
                      style={{ width: 80 }}
                    />
                    {console.log("Item", item)}
                  </Form.Item>
                </Form>
              </Col>
              <Col span={8}>
                <p>°F</p>
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
              <Col span={16}>
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
                    <InputNumber
                      value={item}
                      onChange={(e) => handleChangeMax(e, index)}
                      style={{ width: 80 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={8}>
                <p>°F</p>
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
        >
          {console.log("Item", item)}
        </Select>
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
          <Button onClick={success} type="primary">
            Analyze
          </Button>
          {/* <Button type="primary" onClick={showModal}>
              Analyze
            </Button> */}

          {/* <Button disabled={true}>
              <AiOutlinePrinter />
            </Button> */}
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
    console.log("Clicked", index);
    let newData = [...data];
    newData.splice(index, 0, data[index]);
    // newData[index + 1] = { ...data[index + 1], isDelete: true };
    setData(newData);
    console.log("New new data", newData);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (value, index) => {
    let newData = [...data];
    newData[index].interval = value;
    setData(newData);
    // console.log("New data", newData[index]);
  };

  const handleChangeMin = (value, index) => {
    let newData = [...data];
    newData[index].min_units = value;
    setData(newData);
    console.log("New data", value, newData[index]);
  };

  const handleChangeMax = (value, index) => {
    let newData = [...data];
    newData[index].max_units = value;
    setData(newData);
    console.log("New data", value, newData[index]);
  };

  const handleChangeProcess = (value, index) => {
    let newData = [...data];
    newData[index].process = value;
    setData(newData);
    // console.log("New data", newData[index]);
  };

  const onChange = (value) => {
    console.log("SelectedValue", value);
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
        rowSelection={{}}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {console.log(record.CategoryTitle)}
              {record.CategoryTitle}
            </p>
          ),
        }}
        // key={columns.key}
        columns={columns}
        dataSource={bookingLists}
      />
      ;
    </div>
  );
};

export default Home;
