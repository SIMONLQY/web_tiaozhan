<template>
  <div class="online-txt">
   <el-alert
    title="上传图片请逐张上传"
    type="warning"
    close-text="阅"
    center
    show-icon>
    </el-alert>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
      <el-form-item prop="articleTitle">
        <el-input class="post-form-input" type="text" v-model='ruleForm2.articleTitle' autocomplete="off" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item prop="articleSubtitle">
        <el-input class="post-form-input" type="text" v-model='ruleForm2.articleSubtitle' autocomplete="off" placeholder="请输入副标题"></el-input>
      </el-form-item>
      <el-form-item prop="articleAuthor">
        <el-input class="post-form-input" type="text" v-model='ruleForm2.articleAuthor' autocomplete="off" placeholder="请输入作者"></el-input>
      </el-form-item>
      <el-form-item prop="articleResource">
        <el-input class="post-form-input" type="text" v-model='ruleForm2.articleResource' autocomplete="off" placeholder="请输入文章来源"></el-input>
      </el-form-item>
      <el-form-item prop="articleContent">
        <textarea :id="Id" v-model="ruleForm2.articleContent"></textarea>
      </el-form-item>
      <el-form-item class="post-form-sbmA">
        <div class="post-form-sbmA-input">
          <file-upload
          :doUpload="urlForUpfile"
          :uptip="tipForUpfile"
          v-on:listenToFUL="toGetURL"
          class="file-upload"
          ></file-upload>
        </div>
        <div class="post-form-sbmA-button">
          <el-button class="post-form-submit" type="primary" @click="submitForm('ruleForm2')">发布</el-button>
          <el-button type="primary" @click="getBack()">取消并返回</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce-imageupload'
import axios from 'axios'
import fileUpload from '@/components/fileUpload/fileUpload3.vue'
import bus from '@/Eventbus.js'

export default {
  name: 'tinymceEditor',
  components: {
    fileUpload
  },
  props: {
    value: {
      default: '',
      type: String
    },
    config: {
      type: Object,
      default: () => {
        return {
          theme: 'modern',
          height: 600
        }
      }
    },
    url: {
      default: '',
      type: String
    },
    accept: {
      default: 'image/jpeg, image/png',
      type: String
    },
    maxSize: {
      default: 2097152,
      type: Number
    },
    father : Number
  },
  created(){
    bus.$on('upFile', (data) => {
      this.countIt(data);
    })
    if(this.current == 'edit'){
      axios.get('/api/v1/article',{params:{articleId: this.fa}})
      .then(res => {
        if(res.data.success == 1){
          let passage = res.data.data;
          console.log(passage);
          this.ruleForm2.articleTitle = passage.headline;
          this.ruleForm2.articleSubtitle = passage.subheading;
          this.ruleForm2.articleAuthor = passage.author;
          this.ruleForm2.articleResource = passage.source;
          // setTimeout(function(){this.myEditor.setContent(passage.content)},1000);
          this.myEditor.setContent(passage.content);
          console.log(this.ruleForm2.articleContent);
        }    
      })
    }
  },
  data() {
    var validateArticleTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入文章标题'))
      } else {
        callback()
      }
    }
//     var validateArticleContent = (rule, value, callback) => {
//       if (value === '') {
//         callback(new Error('请输入文章内容'))
//       } else {
//         callback()
//       }
//     }
    var validateArticleResource = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入文章来源，原创亦请注明'))
      } else {
        callback()
      }
    }
    const Id = Date.now()
    return {
      urlForUpfile: '/api/v1/admin/file',
      tipForUpfile: '上传文件不大于2Mb, 文件类型不限, 最多上传7个文件',
      filesURL: [],
      ruleForm2: {
        articleTitle: '',
        articleSubtitle: '',
        articleAuthor: '',
        articleResource: '',
        articleContent: '',
      },
      article_id: '',
      rules2: {
        articleTitle: [
          { validator: validateArticleTitle, trigger: 'blur' }
        ],
        articleResource: [
          { validator: validateArticleResource, trigger: 'blur' }
        ]
      },
      Id: Id,
      myEditor: null,
      DefaultConfig: {
        // GLOBAL
        language_url: '/tinymce/zh_CN.js',
        language: 'zh_CN', //汉化
        skin_url: '/tinymce/skins/lightgray',        
        height: 500, //默认高度
        theme: 'modern', //默认主题
        menubar: true,
        toolbar: `styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | insertfile link imageupload | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code | undo redo | fullscreen `,//需要的工具栏
        plugins: `
            paste
            importcss
            code
            table
            advlist
            fullscreen
            link
            lists
            textcolor
            colorpicker
            hr
            preview
            imageupload
          `,
        // CONFIG
        forced_root_block: 'p',
        force_p_newlines: true,
        importcss_append: true,
        // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
        content_style: `
            *                         { padding:0; margin:0; }
            html, body                { height:100%; }
            img                       { max-width:100%; display:block;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
          `,
        insert_button_items: 'imageupload link | inserttable',
        // CONFIG: Paste
        paste_retain_style_properties: 'all',
        paste_word_valid_elements: '*[*]',        // word需要它
        paste_data_images: true,                  // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false,     // 插入word文档需要该属性
        paste_webkit_styles: 'all',
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: true,
        // CONFIG: Font
        fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px 28px 32px 36px 72px',
        // CONFIG: StyleSelect
        style_formats: [
          {
            title: '首行缩进',
            block: 'p',
            styles: { 'text-indent': '2em' }
          },
          {
            title: '行高',
            items: [
              { title: '1', styles: { 'line-height': '1' }, inline: 'span' },
              { title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span' },
              { title: '2', styles: { 'line-height': '2' }, inline: 'span' },
              { title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span' },
              { title: '3', styles: { 'line-height': '3' }, inline: 'span' }
            ]
          }
        ],
        // FontSelect
        font_formats: `
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`,
        // Tab
        tabfocus_elements: ':prev,:next',
        object_resizing: true,
        // Image
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions'
      },
      number: 0,
      submitList: [],
      fa: this.$route.query.name,
      current: this.$route.query.use,
    }
  },
  methods: {
    getBack(){
      this.$router.push('/')
    },
    countIt(data){
      this.submitList[this.number] = data;
      this.number = this.number + 1;
    },
    toGetURL(theUrl) {
      this.filesURL = theUrl
    },
    submitForm (formName) {
      var activeEditor = tinymce.activeEditor; 
      var editBody = activeEditor.getBody(); 
      activeEditor.selection.select(editBody); 
      var articleText = activeEditor.selection.getContent( { 'format' : 'text' } );
      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.current == 'create') {
            axios({
              method: 'post',
              url:'/api/v1/admin/selfApply', //URL和后端商议后确定，data中变量名称亦同
              data: {
                headline: this.ruleForm2.articleTitle,
                subheading: this.ruleForm2.articleSubtitle,
                author: this.ruleForm2.articleAuthor,
                source: this.ruleForm2.articleResource,
                content: this.myEditor.getContent(),
                father: this.fa,
                content_no_label: articleText
              }
            }).then(response => {
              if (response.data.success == 1) {
                this.$notify({
                  title: '文章已提交！',
                  type: 'success'
                }); 
                this.article_id = response.data.data.article_id;
                for(let i = 0; i < this.submitList.length; i++) {
                  let data = {
                    attachmentName: this.submitList[i][0],
                    articleId: this.article_id,
                    filePath: this.submitList[i][1]
                  }
                  console.log(data);
                  axios.post('/api/v1/admin/attachment', data)
                  .then(res => {
                    if(res.data.success == 1){
                      this.$notify({
                        title: '成功！',
                        message: data.attachmentName + '上传成功',
                        type: 'success'
                      }); 
                    } else {
                      this.$notify({
                        title: '失败！',
                        message: data.attachmentName + '上传失败',
                        type: 'error'
                      }); 
                    }
                  })
                }
                this.$router.push('/');//这里是投稿成功之后的跳转页面（所以还需要写一个成功跳转的提示页面）
              }
              else {
                console.log(0)
              }
            }).catch(err => {
              this.$notify({
                  title: '失败！',
                  message: err,
                  type: 'error'
                }); 
              console.log(err);
            })
          }
          if(this.current == 'edit') {
            axios({
              method: 'put',
              url:'/api/v1/admin/selfApply',
              data: {
                article_id: this.fa,
                headline: this.ruleForm2.articleTitle,
                subheading: this.ruleForm2.articleSubtitle,
                author: this.ruleForm2.articleAuthor,
                source: this.ruleForm2.articleResource,
                content: this.myEditor.getContent(),
                content_no_label: articleText
              }
            }).then(response => {
              if (response.data.success == 1) {
                this.$notify({
                  title: '文章已修改！',
                  type: 'success'
                }); 
                for (let i = 0; i < this.submitList.length; i++){
                  let data = {
                    attachmentName: this.submitList[i][0],
                    articleId: this.fa,
                    filePath: this.submitList[i][1]
                  }
                  console.log(data);
                  axios.post('/api/v1/admin/attachment', data)
                  .then(res => {
                    if(res.data.success == 1) {                      
                      this.$notify({
                        title: '成功！',
                        message: data.attachmentName + '上传成功',
                        type: 'success'
                      }); 
                    } else {
                      this.$notify({
                        title: '失败！',
                        message: data.attachmentName + '上传失败',
                        type: 'error'
                      }); 
                    }
                  })
                }
                this.$router.push('/');
              }
              else {
                console.log(0)
              }
            }).catch(err => {
              this.$notify({
                  title: '失败！',
                  message: err,
                  type: 'error'
                }); 
              console.log(err);
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    setContent(content) {
      this.myEditor.setContent(content)
    },
    getContent() {
      return this.myEditor.getContent()
    },
    init() {
      const self = this
      window.tinymce.init({
        // 默认配置
        ...this.DefaultConfig,
        // 挂载的DOM对象
        selector: `#${this.Id}`,
        file_picker_types: 'file',
        // prop内传入的的config
        ...this.config,
        setup: (editor) => {
          self.myEditor = editor
          editor.on(
            'init', () => {
              self.loading = true
              self.$emit('on-ready')   // 抛出 'on-ready' 事件钩子
              editor.setContent(self.value)
              self.loading = false
            }
          )
          // 抛出 'input' 事件钩子，同步value数据
          editor.on(
            'input change undo redo', () => {
              self.$emit('input', editor.getContent())
            }
          )
        },
        imageupload_url: '/api/v1/admin/uploadImgS', // 接收图片的后端地址
        imageupload_converCb: (res) => { // 根据后端返回的数据，转换成符合插件要求的数据结构
          return {
            error: res.data.error,
            pathList: res.data.data.pathlist
          }
        },
      })
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    // 销毁tinymce
    this.$emit('on-destroy')
    window.tinymce.remove(`#${this.Id}`)
  },
}
</script>

<style scoped>
  .online-txt {
    background-color: #F0FCFF;
  }
  .demo-ruleForm {
    padding: 30px;
    max-width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 0 auto;
  }
  .post-form-input {
    width: 800px;
  }
  .submit-box {
    width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .post-form-sbmA {
    display: flex;
    
  }
  .post-form-submit {
    min-width: 120px;
  }
</style> 