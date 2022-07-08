window.location.href

~~~js
  // 未选项目时，导向首页
    if (!store.project.projectCode) {
      window.location.href = window.location.origin + "/index";
    }
~~~

