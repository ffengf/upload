<template>
    <div id="big">
        <el-upload
            class="upload-demo"
            drag
            action="https://api.mipinclub.com/file_upload"
            multiple
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <!-- <template v-if="videoUrl !== ''">
            <div class="warpper" @mouseenter="falg=true" @mouseleave="falg=false">
				<div class="box" v-if="falg" >
					<i class="el-icon-delete" @click="del"></i>
				</div>
				<video :src="videoUrl" class="video" preload controls>对不起，你的浏览器暂不支持video播放，请更换浏览器</video>
			</div>
        </template>
        <el-upload
            style="width: 40%"
            ref="upload"
            class="upload-demo"
            drag
            action="https://api.mipinclub.com/file_upload"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
			:on-progress="progress"
			:show-file-list="false"
			v-else
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                将视频拖到此处，或
                <em>点击上传</em>
            </div>
            <div class="el-upload__tip hauto" slot="tip">只能上传mp4文件，且不超过5M</div>
        </el-upload>-->
    </div>
</template>

<script>
// 拖拽
import draggable from "vuedraggable";
export default {
    name: "upload",
    props: ["url"],
    model: {
        prop: "url",
        event: "change_url",
    },
    components: {
        draggable,
    },
    data() {
        return {
            videoUrl: "",
            falg: false,
        };
    },
    methods: {
        beforeUpload(file) {
            if (file.type !== "video/ogg" && file.type !== "video/mp4") {
                this.$message.error("请上传mp4或者ogg格式视频");
                return false;
            } else {
                const url = URL.createObjectURL(file);
                var audioElement = new Audio(url);
                audioElement.addEventListener("loadedmetadata", () => {
                    this.videoTime = audioElement.duration.toFixed(2);
                });
            }
        },
        handleRemove(file, fileList, value) {
            this.videoUrl = "";
        },
        uploadSuccess(res, file, fileList, str) {
            this.videoUrl = res.url;
        },
        del() {
            this.videoUrl = "";
        },
        progress(event, file, fileList) {
            console.log(event);
        },
    },
    watch: {
        videoUrl(url) {
            this.$emit("change_url", url);
        },
    },
    created() {
        this.videoUrl = this.url;
    },
};
</script>

<style>
.el-upload-dragger {
	width: 1055px;
	height: 425px;
}
#big{
	width: 100%;
}
</style>
