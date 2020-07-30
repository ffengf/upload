<template>
    <div>
        <!-- <el-upload
            v-show="!sortShow"
            action="https://api.mipinclub.com/file_upload"
            ref="img"
            accept="image/jpeg, image/jpg, image/png"
            list-type="picture-card"
            :file-list="imgListArr"
            :limit="limitMax"
            :on-preview="handlePictureCardPreview"
            :on-remove="(file, fileList) => handleRemove(file, fileList, isAll)"
            :before-upload="beforeUpload"
            :on-success="(response, file, fileList) => imgLoadSuccess(response, file, fileList, true)"
			:multiple="limitMax == 1 ? false : true"
        >
            <i class="el-icon-plus"></i>
            <div
                slot="tip"
                class="el-upload__tip el-upload__tip hauto"
                :class="{newTip: imgListArr.length > 0}"
            >
                <slot name="img_tip"></slot>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
            <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <template v-if="isSort">
            <draggable
                v-show="sortShow"
                v-model="imgListArr"
                :options="{animation: 150}"
                @start="drag = true"
                @end="drag = false"
                class="parent"
            >
                <div class="pr" v-for="(item, index) in imgListArr" :key="index">
                    <template v-if="item.response || item.url">
                        <el-image :src="item | url" alt style="width: 100px; height: 100px;"></el-image>
                    </template>
                </div>
            </draggable>
            <div class="sortBtn" v-show="imgListArr.length > 0">
                <el-button
                    size="medium"
                    type="danger"
                    @click.native="sortShow = !sortShow"
                >{{sortShow ? '退出' : '进入'}}图片排序模式</el-button>
            </div>
        </template>-->
    </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import { equals } from "ramda";
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";

@Component({
    components: {
        draggable,
    },
})
export default class extends Vue {
    @Model("change_imgList", { type: Array })
    readonly imgList!: string[];

    @Prop({
        default: 1,
    })
    readonly limitMax!: number;

    @Prop({
        default: false,
    })
    readonly isSort!: boolean;

    beforeUpload(file: any) {
        const format =
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/gif";
        if (!format) {
            // this.$message.error("请上传jpg、jpeg、png、gif格式");
        }
        const is5M = file.size / 1024 / 1024 / 1024 / 1024 / 1024 < 5;

        if (!is5M) {
            // this.$message.error("图片大小不能超过5M");
        }

        return format && is5M;
    }

    created() {
        console.log(this.isSort);
    }
}

// export default {
//     name: "upload",
// 	props: ["limitMax", "imgList", "fileFormat", "isSort", "isAll"],
// 	model:{
// 		prop:"imgList",
// 		event:"change_imgList"
// 	},
//     components: {
//         draggable
//     },
//     data() {
//         return {
//             loadingImg: null,
//             dialogVisible: false,
//             dialogImageUrl: "",
//             imgListArr: [],
//             sortShow: false
//         };
//     },
//     methods: {
//         beforeUpload(file) {
//             let format = null;
//             if (this.fileFormat === "jpg") {
//                 format = file.type === "image/jpeg";
//                 if (!format) {
//                     this.$message.error("请上传jpg格式");
//                 }
//             } else {
//                 format =
//                     file.type === "image/jpeg" ||
//                     file.type === "image/png" ||
//                     file.type === "image/gif";
//                 if (!format) {
//                     this.$message.error("请上传jpg、jpeg、png、gif格式");
//                 }
//             }
//             const is5M = file.size / 1024 / 1024 / 1024 / 1024 / 1024 < 5;

//             if (!is5M) {
//                 this.$message.error("图片大小不能超过5M");
// 			}

//             return format && is5M;
//         },
//         // 移除图片
//         handleRemove(file, fileList, value) {
// 			this.imgListArr = fileList
//         },
//         // 预览图片
//         handlePictureCardPreview(file) {
//             this.dialogImageUrl = file.url;
//             this.dialogVisible = true;
//         },
//         // 上传成功
//         imgLoadSuccess(res, file, fileList, str) {
// 			this.imgListArr = fileList
//         },
//         // 加载成功
//         loadSuccess(index) {
//             this.loadingImg = index;
// 		},
// 		clear(arr=[]){
// 			this.imgListArr = arr
// 		}
// 	},
// 	computed:{
// 		get_imgList(){
// 			return this.imgList
// 		}
// 	},
// 	watch:{
// 		imgListArr(e,old){
// 			if(equals(e,old)) return
// 			const emit = e.map(x => x.response ? x.response.url : x.url)
// 			if(this.limitMax === Number(1)){
// 				this.$emit('change_imgList',emit[0] === undefined ? '' : emit[0])
// 			}else{
// 				this.$emit('change_imgList',emit)
// 			}
// 		},
// 		get_imgList(){
// 			if(typeof this.imgList === 'string'){
// 				this.imgListArr = this.imgList !== "" ? [{ url:this.imgList }] : []
// 			}else{
// 				this.imgListArr = this.imgList.map(x => ({url:x}))
// 			}
// 		}
// 	},
// 	filters:{
// 		url(item){
// 			return item.response ? item.response.url : item.url
// 		}
// 	},
// 	created(){
// 		if(typeof this.imgList === 'string'){
// 			this.imgListArr = this.imgList !== "" ? [{ url:this.imgList }] : []
// 		}else{
// 			this.imgListArr = this.imgList.map(x => ({url:x}))
// 		}
// 	}
// };
</script>

<style scoped>
.parent {
    border: 2px dashed #a7b7f1;
    padding: 20px;
    overflow: hidden;
}
.pr {
    position: relative;
    border: 1px solid #dedede;
    border-radius: 5px;
    margin-right: 5px;
    list-style: none;
    padding: 2px;
    width: 100px;
    height: 100px;
    float: left;
}
.sortBtn {
    clear: both;
    margin-top: 5px;
}
.newTip {
    margin-top: -15px;
}
</style>
