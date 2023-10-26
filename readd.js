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

// wancc
const fs = require('fs');
const path = require('path');

// 定义目录名
const directory = 'total';

// 递归读取目录及其子文件
function readDirectory(dir) {
    const result = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            // 如果是子目录，递归读取子目录
            const subDirectory = readDirectory(filePath);
            result.push(...subDirectory);
        } else {
            // 如果是文件，添加到结果数组
            const relativePath = path.relative(directory, filePath);
            result.push({ title: file, path: '/' + path.join(directory, relativePath) });
        }
    }

    return result;
}

// 读取目录及子文件
const filesInfo = readDirectory(directory);

console.log(filesInfo);
