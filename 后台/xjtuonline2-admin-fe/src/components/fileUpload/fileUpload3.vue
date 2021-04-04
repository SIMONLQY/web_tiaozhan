<!-- 这是文件上传组件，请在所需要的地方应用并调整对应参数 -->



<template>
	<div class="hahaha">
    <el-upload
      class="upload-file"
      drag
      :action="doUpload"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :file-list="fileList"
      multiple
      :limit="7"
      :on-exceed="handleExceed"
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
    doUpload: String,
    upTip: String,
    acceptLimit: String,
  },
  data(){
    return {
      fileList: [],
      fileURL: ''
    }
  },
  methods: {
    beforeUpload(file) {
      this.files = file;
    //   this.fileList = this.fileList.push(file);
      let isLt2M = (file.size / 1024 / 1024 < 5);
      if (!isLt2M) {
        alert('上传文件大小不能超过 5Mb！');
        return false
      }
      this.fileName = file.name;
      return isLt2M
      console.log('确认上传'+this.files.name)
//      return false
    },
    toGetURL(res, file, fileList) {
      if(res.success == 1){
        this.fileURL = res.data.file_path;
        bus.$emit('upFile', [file.name, this.fileURL]);
      }else{
        alert(file.name + '添加失败！');
        // bus.$emit('fileURL', '');
        console.log(res.err_msg);
      }
       //这里只能请各位后端老爷们把各处文件上传的返回体写得一样咯。。。
    },
    // handlePreview(file) {
    //   console.log(file);
    // },
    handleRemove(file, fileList) {
    },
    handleExceed(files, fileList) {
    //   this.$message.warning(`当前限制选择 7 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    alert('文件数量超出限制！');
    },
    beforeRemove(file, fileList) {
      
      return 
    }
  }
}
</script>

<style>
</style>
