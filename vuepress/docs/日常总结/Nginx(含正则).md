# Nginx(含正则)

## 概述

nginx是一款自由的、开源的、高性能的HTTP服务器和反向代理服务器；同时也是一个IMAP、POP3、SMTP代理服务器；nginx可以作为一个HTTP服务器进行网站的发布处理，另外nginx可以作为反向代理进行负载均衡的实现。

这里主要通过三个方面简单介绍nginx

- 反向代理
- 负载均衡
- nginx特点

## 正反代理

**正向代理**

说反向代理之前，我们先看看正向代理，正向代理也是大家最常接触的到的代理模式，我们会从两个方面来说关于正向代理的处理模式，分别从软件方面和生活方面来解释一下什么叫正向代理

在如今的网络环境下，我们如果由于技术需要要去访问国外的某些网站，此时你会发现位于国外的某网站我们通过浏览器是没有办法访问的，此时大家可能都会用一个操作FQ进行访问，FQ的方式主要是找到一个可以访问国外网站的代理服务器，我们将请求发送给代理服务器，代理服务器去访问国外的网站，然后将访问到的数据传递给我们！

上述这样的代理模式称为正向代理，正向代理最大的特点是客户端非常明确要访问的服务器地址；服务器只清楚请求来自哪个代理服务器，而不清楚来自哪个具体的客户端；正向代理模式屏蔽或者隐藏了真实客户端信息。

![image-20200803145742460](D:\Desktop\Learing\image-20200803145742460.png)

**反向代理**

明白了什么是正向代理，我们继续看关于反向代理的处理方式，举例如我大天朝的某宝网站，每天同时连接到网站的访问人数已经爆表，单个服务器远远不能满足人民日益增长的购买欲望了，此时就出现了一个大家耳熟能详的名词：分布式部署；也就是通过部署多台服务器来解决访问人数限制的问题；
那么反向代理具体是通过什么样的方式实现的分布式的集群操作呢，我们先看一个示意图：

![image-20200803145841656](D:\Desktop\Learing\image-20200803145841656.png)

通过上述的图解大家就可以看清楚了，多个客户端给服务器发送的请求，nginx服务器接收到之后，按照一定的规则分发给了后端的业务处理服务器进行处理了。此时~请求的来源也就是客户端是明确的，但是请求具体由哪台服务器处理的并不明确了，nginx扮演的就是一个反向代理角色

反向代理，主要用于服务器集群分布式部署的情况下，反向代理隐藏了服务器的信息！

## 负载均衡

nginx反向代理服务器接收到的请求数量，就是我们说的负载量

请求数量按照一定的规则进行分发到不同的服务器处理的规则，就是一种均衡规则

所以~将服务器接收到的请求按照规则分发的过程，称为负载均衡。

**nginx支持的负载均衡调度算法方式如下：**

1. weight轮询（默认）：接收到的请求按照顺序逐一分配到不同的后端服务器，即使在使用过程中，某一台后端服务器宕机，nginx会自动将该服务器剔除出队列，请求受理情况不会受到任何影响。 这种方式下，可以给不同的后端服务器设置一个权重值（weight），用于调整不同的服务器上请求的分配率；权重数据越大，被分配到请求的几率越大；该权重值，主要是针对实际工作环境中不同的后端服务器硬件配置进行调整的。
2. ip_hash：每个请求按照发起客户端的ip的hash结果进行匹配，这样的算法下一个固定ip地址的客户端总会访问到同一个后端服务器，这也在一定程度上解决了集群部署环境下session共享的问题。
3. fair：智能调整调度算法，动态的根据后端服务器的请求处理到响应的时间进行均衡分配，响应时间短处理效率高的服务器分配到请求的概率高，响应时间长处理效率低的服务器分配到的请求少；结合了前两者的优点的一种调度算法。但是需要注意的是nginx默认不支持fair算法，如果要使用这种调度算法，请安装upstream_fair模块
4. url_hash：按照访问的url的hash结果分配请求，每个请求的url会指向后端固定的某个服务器，可以在nginx作为静态服务器的情况下提高缓存效率。同样要注意nginx默认不支持这种调度算法，要使用的话需要安装nginx的hash软件包

### 配置

nginx是一个功能非常强大的web服务器加反向代理服务器，同时又是邮件服务器等等

在项目使用中，使用最多的三个核心功能是反向代理、负载均衡和静态服务器

这三个不同的功能的使用，都跟nginx的配置密切相关，nginx服务器的配置信息主要集中在nginx.conf这个配置文件中，并且所有的可配置选项大致分为以下几个部分

~~~
main                                # 全局配置

events {                            # nginx工作模式配置

}

http {                                # http设置
    ....

    server {                        # 服务器主机配置
        ....
        location {                    # 路由配置
            ....
        }

        location path {
            ....
        }

        location otherpath {
            ....
        }
    }

    server {
        ....

        location {
            ....
        }
    }

    upstream name {                    # 负载均衡配置
        ....
    }
}
~~~

如上述配置文件所示，主要由6个部分组成：

1. main：用于进行nginx全局信息的配置
2. events：用于nginx工作模式的配置
3. http：用于进行http协议信息的一些配置
4. server：用于进行服务器访问信息的配置
5. location：用于进行访问路由的配置
6. upstream：用于进行负载均衡的配置

### 核心设置

```
#配置nginx服务启动的用户，默认为www-data
user www-data 
#配日志错误日志的存放位置，以及默认存储日志的级别
error_log /var/log/nginx/error.log warn;
#配置nginx进程的pid存放位置，通过此可知有多个nginx进程
pid /var/run/nginx.pid;
#events 模块,
events{
	#使用epollo事件驱动模型
	use epollo;
	worker_connection 1024;
}
#http模块，配置代理，日志，缓存等， 可以存放server快
http{
	#设定mime类型,类型由mime.type文件定义
	include /etc/nginx/mime.types;
	#默认返回的相应的mime类型
	default_type application/octet-stream;
	#log_format定义日志格式，main时格式名，可以有多个格式
	log_format main '$remote_addr - $remote_user [$time_local] "$request" '
'$status $body_bytes_sent "$http_referer" '
'"$http_user_agent" "$http_x_forwarded_for"';
   #请求日志存储位置以及使用的格式
   access_log /var/log/nginx/access.log main;
   ...还有一些其他的
   #server模块，可以有多个
   server{
   		#监听80端口
   		listen 80
   		#监听地址（服务器公网地址）
   		server_name ip
   		#location模块，路由映射信息 / 效果是访问ip:80/时就会访问/var/www/html下的index.html
   		location / {
   			#root 用于设置网站根目录
   			root /var/www/html;
   			#index 设置默认页
   			index index.html;
   		}
   		#发生错误时，返回根目录/404.html作为响应
   		#error_page 404 /404.html;
   		#全局配置，对多个虚拟服务端涩会给你小，发生5x错误时返回网站根目录/50x.html相应
   		error_page 500 502 503 504 /50x.html
   		location = /50x.html{
   		root /var/www/html;
   		}
   }
   
}
```

#### 效果

1

- 在安装好nginx之后直接启动（其实默认直接启动）

- 访问该服务器的ip地址(如http://101.132.154.176,http访问端口为80)可以看到一个Welcome to Nginx 界面

- 其实这个访问请求刚好匹配到的location / 这个路由，返回的资源页面就是root +index路径得到的内容，上面的欢迎界面在/var/www/html下的index.html

- 将index.html的Welcom to nginx 改为"欢迎来到德莱联盟"

- 再次访问

  ![image-20200803191354169](D:\Desktop\Learing\image-20200803191354169.png)

2

新加一个location 如下图，也就是访问http://101.132.154.176/hello.html的路由，所以我们需要在根目录下有一个hello.html才行

![image-20200803191617032](D:\Desktop\Learing\image-20200803191617032.png)

然后访问一下http://101.132.154.176/hello.html

![image-20200803193242361](D:\Desktop\Learing\image-20200803193242361.png)

### location的url匹配

location指令分为**两种匹配模式：**
1> **普通字符串匹配**：以**=开头**或**开头无引导字符（～）**的规则
2> **正则匹配**：以～或～*开头表示正则匹配，~*表示正则不区分大小写

当nginx收到一个请求后，会截取请求的URI部份，去搜索所有location指令中定义的URI匹配模式。在server模块中可以定义多个location指令来匹配不同的url请求，多个不同location配置的URI匹配模式，总体的匹配原则是：**先匹配普通字符串模式，再匹配正则模式**。只识别URI部份，例如请求为：/test/abc/user.do?name=xxxx

一个请求过来后，Nginx匹配这个请求的流程如下：
1> 先查找是否有=开头的精确匹配，如：location = /test/abc/user.do { … }没有就向下
2> 再查找普通匹配，以 **最大前缀 为原则**，如有以下两个location，则会匹配后一项
\* location /test/ { … }
\* location /test/abc { … }
3> 匹配到一个普通格式后，搜索并未结束，而是暂存当前匹配的结果，并继续搜索正则匹配模式
4> 所有正则匹配模式location中找到第一个匹配项后，就以此项为最终匹配结果
所以正则匹配项匹配规则，受定义的前后顺序影响，但普通匹配模式不会
5> 如果未找到正则匹配项，则以3中缓存的结果为最终匹配结果
6> 如果一个匹配都没搜索到，则返回404

## 精确匹配与模糊匹配差别

location =/ { … } 与 location / { … } 的差别：
\* 前一个是精确匹配，只响应/请求，所有/xxx或/xxx/xxxx类的请求都不会以前缀的形式匹配到它
\* 后一个是只要以 / 为前缀的请求都会被匹配到。如：/abc ， /test/abc， /test/abc/aaaa

## 正则与非正则匹配

1> location ~ /test/.+.jsp$ { … } ：正则匹配，支持标准的正则表达式语法。
2> location ^~ / { … } ： ^~意思是关闭正则匹配，当搜索到这个普通匹配模式后，将不再继续搜索正则匹配模式。

**loaction格式是** `location [=|~|~*|^~] pattern`

分成三部分就是location， `[=|~|~*|^~]` 和`pattern`，location当然是固定的写法了，所以不需要介绍，我们只介绍 `[=|~|~*|^~]` 和`pattern`。

**URL匹配语法 URL语法匹配分成两部分， [=|~|~*|^~]` 和`pattern。**

**第二部分**时可选的，没有的话，此时情况不同，pattern不一定时正则

- = pattern 代表精确匹配pattern，此时pattern不是正则，比如 location = /hello.html就只能匹配nginx主机ip/hello.html
- ^~ 代表匹配以pattern字符串开头的url，此时pattern不是正则，比如 location ^~ /test 可以匹配的就是以/test开头的url，比如 /test1， /testA/aaa等
- ~ pattern 代表pattern这个正则，区分大小写
- ~* pattern 代表这个正则，不区分大小写

综上，= 和 ^~不是正则， ~ 和~* 是正则

### 正则介绍

| 字符  | 说明                                                         |
| :---- | ------------------------------------------------------------ |
| $     | 限定结尾如\ \.(gif\|png)$ 匹配任何以.gif .png 结尾的请求     |
| ^     | 限定开头如，^error 匹配任何以error开头的如error404           |
| \|    | 或                                                           |
| []    | 方括号内代表范围[0-9]代表0-9的字符，[0-9A-Z]代表匹配0-9和A-Z都可以匹配到，**如果在范围内使用 ^ 代表匹配范围以外的字符** |
| .     | 匹配任意一个字符，注意是一个                                 |
| ?     | 匹配前面的字符0次或1次                                       |
| +     | 匹配前面字符1次或多次（即至少出现一次）                      |
| *     | 匹配前面字符任意多次，分为贪婪与懒惰，贪婪就是尽可能的匹配，懒惰就是匹配到合适比如abcdabcd,贪婪模式a.*d则匹配结果为abcdabcd，而如果是懒惰模式即a.\*?b的话就匹配到第一个abcd位置了 |
| {n}   | 匹配n次                                                      |
| {n,}  | pp至少n次                                                    |
| {n,m} | 匹配n到m次                                                   |
| ()    | 划分字符范围 如 hello \| hi Amy 只能匹配到hello 或者是hi Amy，而(hello\| hi) Amy就可以匹配到hello Amy 或者 hi Amy 了 |
| \     | 转义，把有特殊含义的字符转化为普通字符，比如\\.就是把.转化为普通的一个点了如\\.html$ 就是匹配以 .html结尾 |
| \d    | **匹配任意一个数字**                                         |
| \D    | 匹配**任意一个 非数字**                                      |
| \w    | 相当[0-9A-Za-z]                                              |
| \W    | 匹配任意一个符号字符                                         |
| \s    | 匹配空白                                                     |
| \S    | 匹配非空白                                                   |

### 反向代理

在location模块内使用proxy_pass

`proxy_pass`用于设置被代理服务器的地址，可以是主机名称（`https://www.baidu.com`这样的）、IP地址(域名加端口号)的形式。
下面的这个location的意思是，如果请求路径开头是/api/的，那么都代理到proxy_pass指定的地址，比如访问了`/api/user/list`,那么得到的结果是`http://localhost:8081/user/list`的结果。

```
server {
  listen 8080;

  location ^~ /api/ {
    proxy_pass http://localhost:8081/;
  }
}
```

实际使用至少有下三个

```
#直接匹配网站根，通过域名访问网站首页比较频繁，使用这个会加速处理，官网如是说。
#这里是直接转发给后端应用服务器了，也可以是一个静态首页
# 第一个必选规则
location = / {
    proxy_pass http://tomcat:8080/index
}
 
# 第二个必选规则是处理静态文件请求，这是nginx作为http服务器的强项
# 有两种配置模式，目录匹配或后缀匹配,任选其一或搭配使用
location ^~ /static/ {
    root /webroot/static/;
}
location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ {
    root /webroot/res/;
}
 
#第三个规则就是通用规则，用来转发动态请求到后端应用服务器
#非静态文件请求就默认是动态请求，自己根据实际把握
#毕竟目前的一些框架的流行，带.php,.jsp后缀的情况很少了
location / {
    proxy_pass http://ip:8080/
}
```

对于以上基础推荐配置，有一个补充，就是关于转发有一点需要注意。例如下面配置，对一个目录转发：



```ruby
location ^~ /outer/ {
    #case A： url最后以/结尾
    proxy_pass http://tomcat:8080/
    #case B： url最后没有/
    #proxy_pass http://tomcat:8080  
}
```

关键在于最后的/，访问localhost/outer/in.html，其中case A会转发到tomcat:8080/in.html， 而case B会转发到tomcat:8080/outer/in.html，所以务必注意了。

^[+]{0,1}(\d+)$

###### ![image-20210910160307330](C:\Users\LWQ\AppData\Roaming\Typora\typora-user-images\image-20210910160307330.png)
