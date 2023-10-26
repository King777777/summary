# 周总结之this

this对象只能存在于方法之中

js微任务 宏任务，setTimeout是个宏任务，

~~~js
handleQuery(param).then(res=>{
	this.setState({}) //更新组件状态
}).then(r=>{
    setTimeout(()=>{
         const {
          form
        } = this.props;
        const fieldsValue = form.getFieldsValue();
        console.log(` beforeRequestParam componentDidUpdate ===========${JSON.stringify(fieldsValue)}`);
        this.beforeRequestParam = fieldsValue;
    }, 0);
})


~~~

css 权重

清除浮动

消金的3.0.5sit注释

position
