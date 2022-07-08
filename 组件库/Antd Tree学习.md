Antd Tree学习

~~~js

// 过滤树状数组
filterArrForKey({ arr, key, value }) {
    let newArr = [];
    newArr = arr.map(item => {
      if (item.children && item.children != null) {
        item = {
          ...item,
          children: this.filterArrForKey({
            arr: item.children,
            key,
            value
          })
        };
      }
      if (item[key] === value) {
        return item;
      } else {
        return null;
      }
    });
    newArr = newArr.filter(item => item != null);
    return newArr;
  }


~~~

