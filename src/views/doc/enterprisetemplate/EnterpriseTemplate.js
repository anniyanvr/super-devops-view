// Generated by XCloud DevOps for Codegen, refer: http://dts.devops.wl4g.com
import {transDate, getDay} from 'utils/'

import ace from 'ace-builds'
import 'ace-builds/webpack-resolver'

import 'ace-builds/src-noconflict/snippets/javascript'
import 'ace-builds/src-noconflict/snippets/html'
import 'ace-builds/src-noconflict/snippets/css'
import 'ace-builds/src-noconflict/snippets/scss'
import 'ace-builds/src-noconflict/snippets/json'
import 'ace-builds/src-noconflict/snippets/java'
import 'ace-builds/src-noconflict/snippets/text'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-javascript'


export default {
    name: 'enterpriseTemplate',
    data() {
        return {

            subPath: '/template',

            path: '',
            content: '',
            data: {},

            aceEditor: null,
            themePath: 'ace/theme/eclipse', // 不导入 webpack-resolver，该模块路径会报错 (ace/theme/github)
            modePath: 'ace/mode/html', // 同上
        }
    },

    activated() {
        this.$store.dispatch('set_menu_close')
    },

    mounted() {



        this.aceEditor = ace.edit(this.$refs.ace, {
            //maxLines: 20, // 最大行数，超过会自动出现滚动条
            //minLines: 10, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
            fontSize: 12, // 编辑器内字体大小
            theme: this.themePath, // 默认设置的主题
            mode: this.modePath, // 默认设置的语言模式
            tabSize: 4, // 制表符设置为 4 个空格大小
            readOnly: false,
            wrap: true,
            highlightActiveLine: false,
            value: '',
            enableSnippets: true,
            enableLiveAutocompletion: true,
            enableBasicAutocompletion: true
        })
        /*this.aceEditor.setOptions({
            enableSnippets: true,
            enableLiveAutocompletion: true,
            enableBasicAutocompletion: true
        })*/


    },
    methods: {

        openFile(path){
            console.info(path)
            this.path = path;
            this.$$api_udm_getFileInfo({
                data: {
                    subPath: this.subPath,
                    path: path,
                },
                fn: json => {

                    this.aceEditor.setValue(json.data.content, -1)// 赋值后光标位置：-1头 ｜ 1尾

                    this.data= json.data;
                    //TODO 继续拓展。。。
                    if(path.endsWith('.java') || path.endsWith('.java.ftl')){
                        this.aceEditor.getSession().setMode("ace/mode/java")
                    }else{
                        this.aceEditor.getSession().setMode("ace/mode/html")
                    }

                },
            })
        },

        saveFile(){
            let content = this.aceEditor.getValue();
            this.$$api_udm_saveFile({
                data: {
                    subPath: this.subPath,
                    path: this.path,
                    content: content,
                },
                fn: json => {
                    this.$message({
                        message: 'Success',
                        type: 'success'
                    });
                    this.openFile(this.path);
                },
            })
        }



    }
}
