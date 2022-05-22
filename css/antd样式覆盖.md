# 覆盖Antd某个组件样式

我所使用的方式就是，给原有组件加个class，然后看下需要修改原组件的哪些类，在自定义的class中覆盖一下

## 覆盖Anchor样式

在antd中的组件Anchor默认是垂直样式的

![](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20220501110808340.png)

但想要改成水平样式，该怎么做呢？

我们可以给Anchor加一个新的class，然后覆盖它的原有样式

~~~html
<Anchor className="myAnchor">
          <Link href="#components-anchor-demo-basic" title="Basic demo" />
          <Link href="#components-anchor-demo-static" title="Static demo" />
          <Link href="#API" title="API" />
        </Anchor>
~~~

下面就是这个less文件

~~~less
.myAnchor {
  border-radius: 4px;
  padding-top: 4px;
  margin: 0;
  margin-bottom: 16px;
  a {
    color: black;
  }
  .ant-anchor-ink {
    display: none;
  }
  .ant-anchor-link {
    &::after {
      position: relative;
      display: block;
      width: 100%;
      height: 2px;
      margin: 0 auto;
      background-color: #ffff;
      content: ' ';
    }
    display: inline-block;
    a {
      display: inline-block;
      padding-bottom: 2px;
      margin: 0 6px;
    }
    &.ant-anchor-link-active {
      &::after {
        background-color: #1890ff;
      }
    }
  }
}

~~~

最后不要忘了在组件中引用

![image-20220501111218736](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20220501111218736.png)



## 覆盖Select样式

有个需求，要求Select组件限制高度，超出滚动，所以就需要修改他的样式了，首先找他对应的class，如下图的ant-select-selection，![image-20220501111553656](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20220501111553656.png)

然后我们给Select组件加一个类customerTest，在这个类中覆盖掉ant-select-selection

![image-20220501112017362](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20220501112017362.png)

~~~less
.customerTest {
  .ant-select-selection {
    max-height: 51px;
    overflow: auto;
  }
}
~~~

效果如下，可以看到Select高度和滚动都有了作用

![image-20220501112000527](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20220501112000527.png)

