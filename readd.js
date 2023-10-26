const fs = require('fs');

const directoryPath = './vuepress/docs/JS'; // 请替换成你的目录路径

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('无法读取目录：', err);
        return;
    }

    console.log('目录中的文件名：');
    files.forEach((file) => {
        console.log(file);
    });
});
