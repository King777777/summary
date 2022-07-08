# 关于上传jar的总结

这块卡了有大半天，首先还是不够细心（心浮气躁），在antd的upload里面的那个file对象里面其实就有一个originFileObj，是File类型的，之前完全没有注意到，导致我苦苦思索为什么它的onchange回调里的file是一个Object类型的，其次就是计算文件的MD5和SHA1值，还有读取jar文件里的pom文件，完全没接触过 ，百度花了很长时间，使用中又遇到问题，浪费大量时间

~~~js
/**
 * 单文件上传组件
 * @author: ljq
 * @since: 2020-01-08 11:20:25
 */

import React, { Component } from "react";
import { Upload, Icon, Button } from "antd";
import { upload } from "@/services/common";
import "./fileupload.css";
import SparkMD5 from "spark-md5";
import CryptoJS from "crypto-js";
import JSZip from "jszip";

class FileUpload extends Component {
  state = {
    fileList: [],
    previewVisible: false,
    activeIndex: 0
  };

  md5 = (file, chunkSize) => {
    const reader = new FileReader();
    reader.onload = function(event) {
      let res = event.target.result;
      res = CryptoJS.lib.WordArray.create(res);
      // eslint-disable-next-line new-cap
      const sha1 = CryptoJS.SHA1(res).toString();
      console.log(sha1);
    };
    reader.readAsArrayBuffer(file);
    let jszip = new JSZip();
    jszip.loadAsync(file).then(zip => {
      jszip.folder("META-INF/maven").forEach((relative, file) => {
        console.log(relative, file);
        if (relative.includes("pom.properties")) {
          console.log("baohan ");
          file.async("string").then(content => {
            const a = content.split(/[\r\n]/);
            for (let i = 0; i < a.length; i++) {
              let start = a[i].indexOf("=");
              if (start != -1) {
                let temp = a[i].substring(start + 1);
                if (a[i].includes("artifactId")) {
                  console.log("artifactId", temp);
                }
                if (a[i].includes("group")) {
                  console.log("group", temp);
                }
                if (a[i].includes("version")) {
                  console.log("version", temp);
                }
              }
            }
          });
        }
      });
    });
    return new Promise((resolve, reject) => {
      let blobSlice =
        File.prototype.slice ||
        File.prototype.mozSlice ||
        File.prototype.webkitSlice;
      let chunks = Math.ceil(file.size / chunkSize);
      let currentChunk = 0;
      let spark = new SparkMD5.ArrayBuffer();
      let fileReader = new FileReader();

      fileReader.onload = function(e) {
        spark.append(e.target.result);
        currentChunk++;
        if (currentChunk < chunks) {
          loadNext();
        } else {
          let md5 = spark.end();
          resolve(md5);
        }
      };

      fileReader.onerror = function(e) {
        reject(e);
      };

      function loadNext() {
        let start = currentChunk * chunkSize;
        let end = start + chunkSize;
        if (end > file.size) {
          end = file.size;
        }
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      }

      loadNext();
    });
  };

  handleChange = data => {
    const { callback } = this.props;
    data.fileList.forEach(item => (item.status = "done"));
    callback(data.fileList);
    this.setState({ fileList: data.fileList });
  };

  customRequest = data => {
    // const { fileList } = this.state;
    // const fileName = data.file.name;
    // const fileData = {
    //   uid: `-${new Date().getTime()}`,
    //   url: "",
    //   name: fileName,
    //   status: "uploading"
    // };
    // upload(data.file).then(res => {
    //   if (res && res.success) {
    //     fileList.push({ ...fileData, url: res.url, status: "done" });
    //   } else {
    //     fileList.push({ ...fileData, status: "error" });
    //   }
    //   this.handleChange({ fileList });
    // });
  };
  beforeUpload = file => {
    this.md5(file, 1024).then(res => {
      console.log("res", res);
    });
    // this.md5(file);

    return true;
  };
  render() {
    const { fileList } = this.state;
    return (
      <Upload
        beforeUpload={this.beforeUpload}
        fileList={fileList}
        onChange={this.handleChange}
        listType="text"
        {...this.props}
      >
        {fileList.length === 0 && (
          <Button>
            <Icon type="upload" /> 选择文件
          </Button>
        )}
      </Upload>
    );
  }
}

export default FileUpload;

~~~

