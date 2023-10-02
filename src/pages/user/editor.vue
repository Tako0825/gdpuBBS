<template>
	<view class="container">
        <view class='wrapper'>
            <view class='toolbar' @tap="format">
                <view class="icon" @tap="insertImage"><img src="@/static/pic.png" alt="插入图片"></view>
                <view class="icon" @tap="clear"><img src="@/static/delete.png" alt="清空内容"></view>
                <view class="icon" @tap="undo"><img src="@/static/back.png" alt="上一步"></view>
                <view class="icon" @tap="redo"><img src="@/static/next.png" alt="下一步"></view>
            </view>

            <view class="cu-form-group">
                <view class="title">分类</view>
                <picker @change="PickerChange" :value="index" :range="picker">
                    <view class="picker">
                        {{index>-1?picker[index]:'请选择'}}
                    </view>
                </picker>
            </view>

            <editor id="editor" 
                class="ql-container" 
                placeholder="开始输入..." 
                showImgSize 
                showImgToolbar 
                showImgResize
                @statuschange="onStatusChange" 
                :read-only="false" 
                @ready="onEditorReady" 
                @blur="getContents"
            ></editor>

            <button type="button" @click="submitContents" class="submit">提交</button>
        </view>
	</view>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapGetters } = createNamespacedHelpers("category")
export default {
    data() {
        return {
            formats: {},
            timer: null,
            editorDetail: "",
            // 以下为分类选择的相关数据
            index: -1,
            picker: new Array(),
        }
    },
    computed: {
        ...mapGetters([
            "getCategoryList"
        ])
    },
    mounted() {
        this.onEditorReady();
        // 将数据渲染到富文本内
        this.timer = setInterval(() => {
            if (this.editorDetail) {
                clearInterval(this.timer)
                this.editorCtx.setContents({
                    html: this.editorDetail,
                    success(res) {
                        console.log(res);
                    }
                })
            }
        }, 100)
        // 获取分类列表
        this.picker = this.getCategoryList.map(item => {
            return item.category
        })
    },
    methods: {
        // todo - 当分类选择发生改变时, 触发该方法 (index 是当前选择的索引)
        PickerChange(e) {
            this.index = e.detail.value
            console.log(this.index);
        },
        submitContents() {
            // 获取编辑器组件的实例
            const editor = uni.createSelectorQuery().select('#editor');
            // 获取编辑器内容
            editor.context(async res => {
                const editorContents = await res.context.getContents();
                console.log(editorContents);
                // todo - 在这里发送http请求以发表文章 (先看 editorContents 的数据结构)
            }).exec();
        },
        // 失去焦点时触发，获取富文本的内容
        getContents() {
            let _this = this
            this.editorCtx.getContents({
                success(res) {
                    _this.$emit('getContents', res.html)
                }
            })
        },
        //编辑框初始化时触发
        onEditorReady() {
            uni.createSelectorQuery().select('#editor').context((res) => {
                this.editorCtx = res.context;
            }).exec()
        },
        //撤销
        undo() {
            this.editorCtx.undo()
        },
        //恢复
        redo() {
            this.editorCtx.redo()
        },
        format(e) {
            let {
                name,
                value
            } = e.target.dataset
            if (!name) return
            this.editorCtx.format(name, value)
            
        },
        //通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式
        onStatusChange(e) {
            this.formats = e.detail
            console.log(e);
        },
        //插入分隔符
        insertDivider() {
            this.editorCtx.insertDivider({
                success: function() {
                    console.log('insert divider success')
                }
            })
        },
        //清空全部内容
        clear() {
            this.editorCtx.clear({
                success: function(res) {
                    console.log("clear success")
                }
            })
        },
        //清除样式
        removeFormat() {
            this.editorCtx.removeFormat()
        },
        //插入图片
        insertImage() {
            uni.chooseImage({
                count: 1,
                success: (res) => {
                    this.editorCtx.insertImage({
                        src: res.tempFilePaths[0],
                        alt: '图像',
                        success: function() {
                            console.log('insert image success')
                        }
                    })
                }
            })
        }
    },
}
</script>

<style scoped lang="less">
.wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 15rpx;
    padding: 30rpx;

    // 工具栏
    .toolbar {
        display: flex;
        column-gap: 20rpx;
        padding: 20rpx;
        box-sizing: border-box;
        border-bottom: 0;
        font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
        background-color: #ffffff;
        position: -webkit-sticky;
        position: sticky;
        top: var(--window-top);
        z-index: 99;
        .icon {
            width: 50rpx;
            height: 50rpx;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    // 编辑器
    .ql-container {
        box-sizing: border-box;
        padding: 12px 15px;
        width: 100%;
        min-height: 30vh;
        height: auto;
        background: #fff;
        font-size: 16px;
        line-height: 1.5;
    }

    // 提交按钮
    .submit {
        width: 500rpx;
        background-color: #fff;
        color: #06c;
        font-weight: bold;
        font-size: 18px;
    }
}
</style>

