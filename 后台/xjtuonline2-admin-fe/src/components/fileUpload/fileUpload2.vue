<!-- 这是文件上传组件，请在所需要的地方应用并调整对应参数 -->



<template>
	<div class="hahaha">
    <el-upload
      class="upload-file"
      drag
      :action="doUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :file-list="fileList"
      :accept="acceptLimit"
      :before-upload="beforeUpload"
      :on-success="toGetURL">
      <i class="el-icon-upload"></i>
      <div class="el-upload_text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload_tip">{{upTip}}</div>
    </el-upload>
  </div>
</template>

<script>
import axios from 'axios'
import bus from '@/Eventbus.js'
export default {
  name: 'fileUpload',
  props: {
    imgType: Number,
    doUpload: String,
    upTip: String,
    acceptLimit: String,
  },
  // props: {
  //     doUpload: '',
  //     acceptLimit: '',
  //     uptip: String
  // },
  data(){
    return {
      // doUpload: this.uploadURL,
      fileList: [],
      fileURL: ''
    }
  },
  methods: {
    handlePreview(){

    },
    beforeUpload(file) {
//       debugger
//       console.log(file,'文件‘)
      this.files = file;
      this.fileList = [this.files];
      const isLt2M = file.size / 1024 / 1024 < 3
      if (!isLt2M) {
        this.$message.warning('上传文件大小不能超过 3Mb！')
        return
      }
      this.fileName = file.name;

      var strs = new Array(); //定义一数组     
      strs = this.fileName.split('.'); //分成数组存储
      var suffix = strs[strs.length - 1]; //获取文件后缀
      if (suffix != 'jpg' && suffix != 'jpeg' && suffix != 'png' && suffix != 'bmp')
      {
        alert('文件格式不对吧');
        return false;
      }

      //imgType: 0 => 横幅  1 => 栏目置顶图  2 => 头条新闻缩略  3 => 常用服务  4 => 挑战V网和专题图
      // if (this.imgType == 0) {
      //         var width = file.width;
      //         var height = file.height;
      //         if (width == 1341 || height == 400){
      //           console.log('success')
      //         }else {
      //           alert('文件尺寸应为：1341*400！');
      //           file.value = '';
      //           return false;
      //         }
      //   } else 
      //   if (this.imgType == 1) {
      //         var width = file.width;
      //         var height = file.height;
      //         if (width == 204 || height == 138){
      //           console.log('success')
      //         }else {
      //           alert('文件尺寸应为：204*138！');
      //           file.value = '';
      //           return false;
      //         }
      //   } else
      //   if (this.imgType == 2) {
      //     console.log(this.imgType)
      //         var width = file.width;
      //         var height = file.height;
      //         console.log(width)
      //         if (width == 628 || height == 540){
      //           console.log('success')
      //         }else {
      //           alert("文件尺寸应为：628*540！");
      //           file.value = "";
      //           return false;
      //         }
      //   } else 
      //    if (this.imgType == 3) {
              
      //           let width = file.width;
      //           let height = file.height;

             
      //         if (width == 250 || height == 100){
      //           console.log('success')
      //         }else {
      //           alert("文件尺寸应为：250*100！");
      //           file.value = "";
      //           return false;
      //         }
      //   } else 
      //    if (this.imgType == 4) {
      //         var width = file.width;
      //         var height = file.height;
      //         if (width == 204 || height == 138){
                
      //         }else {
      //           alert("文件尺寸应为：204*138！");
      //           file.value = "";
      //           return false;
      //         }
      //   }

      return isLt2M
      console.log('确认上传'+this.files.name)
//      return false
    },
    toGetURL(res, b, c) {
      if(res.success == 1){
        this.fileURL = res.data;
        bus.$emit('fileURL', this.fileURL);
      }else{
        alert('图片添加失败？尝试更换图片！');
        this.fileList = [];
        bus.$emit('fileURL', '');
        console.log(res.err_msg);
      }
       //这里只能请各位后端老爷们把各处文件上传的返回体写得一样咯。。。
    },
    // handlePreview(file) {
    //   console.log(file);
    // },
    handleRemove(file, fileList) {
      bus.$emit('fileURL', '');
    },
    // handleExceed(files, fileList) {
    //   this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    // },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style>
</style>
