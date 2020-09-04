<template>
    <div>
        <el-upload
            v-show="!sortShow"
            :action="url"
            ref="img"
            accept="image/jpeg, image/jpg, image/png"
            list-type="picture-card"
            :file-list="parent_list"
            :limit="limitMax"
            :on-preview="preview"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :on-success="imgLoadSuccess"
            :multiple="limitMax === 1 ? false : true"
        >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip el-upload__tip hauto newTip">
                <slot></slot>
            </div>
        </el-upload>
        <el-dialog :visible.sync="key" :append-to-body="true">
            <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <template v-if="isSort && limitMax > 1">
            <draggable
                v-show="sortShow"
                v-model="parent_list"
                :options="{animation: 150}"
                @start="drag = true"
                @end="drag = false"
                class="parent"
            >
                <div class="pr" v-for="(item, index) in parent_list" :key="index">
                    <template v-if="item.url">
                        <el-image :src="item.url" alt style="width: 100px; height: 100px;"></el-image>
                    </template>
                </div>
            </draggable>
            <div class="sortBtn" v-show="parent_list.length > 0">
                <el-button
                    size="medium"
                    type="danger"
                    @click.native="sortShow = !sortShow"
                >{{sortShow ? '退出' : '进入'}}图片排序模式</el-button>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import {
    Vue,
    Component,
    Watch,
    Prop,
    Model,
    Emit,
} from "vue-property-decorator";
import {
    ElUploadInternalRawFile,
    ElUploadInternalFileDetail,
} from "element-ui/types/upload";
@Component({
    name: "upimg",
    components: {
        draggable,
    },
})
export default class extends Vue {
    @Model("change_imgList", { type: [Array, String], required: true })
    readonly imgList!: string[] | string;
    @Emit("change_imgList")
    change_imgList(arr: string[] | string) {
		if(this.limitMax === 1){
			return arr[0]
		}else{
			return arr;
		}
    }

    @Prop({
        default: 1,
        type: Number,
    })
    readonly limitMax!: number;

    @Prop({
        default: true,
        type: Boolean,
    })
    readonly isSort!: boolean;

    @Prop({
        default: 5,
        type: Number,
    })
    readonly maxSize!: number;

    key = false;
    dialogImageUrl = "";
    sortShow = false;

    get parent_list() {
		if(typeof this.imgList === 'string') {
			return this.imgList === '' ? [] : [{ url:this.imgList }];
		}else{
			return (this.imgList as string[]).map((x) => ({ url: x }))
		}
    }
    set parent_list(arr: { url: string }[]) {
        this.change_imgList(arr.map((x) => x.url));
    }

    get url() {
        return `https://api.mipinclub.com/file_upload`;
    }

    beforeUpload(file: ElUploadInternalRawFile) {
        const format =
            file.type === "image/jpg" ||
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/gif";
        if (!format) {
            this.$message.error("请上传jpg、jpeg、png、gif格式");
            return false;
        }
        if (file.size > 1024 * 1024 * this.maxSize) {
            this.$message.error(`图片大小不能超过${this.maxSize}M`);
            return false;
        }
        return true;
    }
    handleRemove(_: ElUploadInternalFileDetail, fileList: any[]) {
        const arr = fileList.map((x) => x?.response?.url || x.url);
        this.change_imgList(arr);
    }

    preview(file: ElUploadInternalFileDetail) {
        if (file.url === undefined) return;
        this.dialogImageUrl = file.url;
        this.key = true;
    }

    imgLoadSuccess(res: any, __: any, fileList: any[]) {
        const arr = fileList.map((x) => x?.response?.url || x.url);
        this.change_imgList(arr);
    }
}
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
    margin-top: -10px;
}
</style>
