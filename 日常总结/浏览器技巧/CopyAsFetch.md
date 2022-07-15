# 控制台copy as fetch用法

我们常常需要重新发起请求，使用谷歌控制台即可做到，

![image-20220715110144361](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20220715110144361.png)

直接右键选择copy as fetch

复制到console

![image-20220715110350349](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20220715110350349.png)

在末尾添加`.then(response => response.json()).then(data =>console.log(data)).catch(e => console.error(e));`

然后回车即可查看结果，可以直接修改入参
