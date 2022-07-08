# SelectAndInput.js

```js
import React, { Component } from "react";
import { Form, Select } from "antd";
const selectLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};
class SelectAndInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectInputValue: "",
      newValue: ""
    };
  }

  onChange = value => {
    this.setState({ selectInputValue: value });
    const { form, field } = this.props;
    console.log("field", field);
    form.setFieldsValue({ [`rpcVerifyCompConf.defaultExecNum`]: value });
  };
  onSearch = value => {
    if (!!value) this.setState({ newValue: value });
  };

  onBlurSelect = () => {
    if (!!this.state.newValue) {
      this.onChange(this.state.newValue);
      this.setState({ newValue: "" });
    }
  };
  render() {
    const { varList, initialValue, field } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form.Item {...selectLayout} label="重试次数">
        {getFieldDecorator([field], {
          initialValue: initialValue
        })(
          <Select
            showSearch
            showArrow={false}
            allowClear
            style={{ width: 200 }}
            placeholder="选择或输入毫秒数"
            onChange={this.onChange}
            onSearch={this.onSearch}
            onBlur={this.onBlurSelect}
            style={{ overflow: "hidden", height: 32 }}
          >
            {varList?.map(item => (
              <Select.Option value={item.varKey}>
                <div>
                  <div>{item.varKey}</div>
                  <div style={{ fontSize: 13, color: "#bbb" }}>
                    {item.varDesc || "无说明"}
                  </div>
                </div>
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
export default SelectAndInput;
```