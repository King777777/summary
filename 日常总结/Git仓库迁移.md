# Git仓库迁移

目的就是要保留log等提交记录，要做的是把A仓库的代码迁移到B仓库并且保留git记录，B仓库基本都是一个新建的空仓库。

> git push origin master  //代码推到远程的master分支

每次提交基本都是这样的命令形式，origin其实是远程地址（url）

通过 git remote -v查看

![image-20220328142216501](https://gitee.com/lwq1229/picture/raw/master/img/image-20220328142216501.png)

进入正题，**B仓库是新建的一个仓库，除了默认的master分支，没有其他分支**

**第一步**

进入A工程，输入`git remote -v` **查看有哪些远程地址，然后添加一个新的origin（就是新建的B仓库的地址）**

命令就是：

1. `git remote add orgin2 master` 
2. `git remote set-url origin2 gitUrl`  //gitURL就是B仓库的地址
3. 输入git remote -v 后输出如上图所示

**也可以 `git remote add orgin2 gitURL`**

****

**第二步**

在A工程上基于master分支新建一个test分支，把这个分支推到B仓库上，因为我使用IDEA，基本不用git命令来push了，这里在图形化界面点击origin就可以选择不同远程地址来推送了，这里我们选origin2（B仓库）

![image-20220328143112540](https://gitee.com/lwq1229/picture/raw/master/img/image-20220328143112540.png)

****

**最后**

git clone B仓库后，可以看到test分支已经存在，就完成了仓库的迁移，过程很简单。

![image-20220328143402097](C:\Users\LWQ\AppData\Roaming\Typora\typora-user-images\image-20220328143402097.png)