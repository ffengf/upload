<template>
    <div id="big">
        <el-upload
            class="upload-demo"
            drag
            action="https://api.mipinclub.com/file_upload"
            multiple
        >
            <div class="slot">
				<div id="center">
					<i class="el-icon-upload"></i>
					<p><em>点击上传</em>或直接将视频文件拖入此区域</p>
					<p class="p">（竖版视频将投放至社区）</p>
				</div>
				<div class="footer">
					<div>
						<p>视频格式</p>
						<p>支持常用视频格式，推荐使用MP4</p>
					</div>
					<div>
						<p>视频大小</p>
						<p>视频文件大小不超过5G</p>
					</div>
					<div>
						<p>横版视频：建议宽高比例为16：9</p>
						<p>分辨率为1280x720以上</p>
						<p>竖版视频：建议宽高比例为9：16</p>
						<p>分辨率为720x1280以上</p>
					</div>
				</div>
			</div>
            <div class="el-upload__tip" slot="tip">
				<p>流程：</p>
				<p>1.上传：将视频上传至觅品服务器，上传完成后自动跳转至编辑页，并为视频设置合适的标题、分类信息；</p>
				<p>2.转码：上传完成后，服务器将视频转码成多种清晰度格式，便于播放器识别播放；</p>
				<p>3.审核：转码成功后，视频进入内容审查环节；</p>
				<p>4.发布：审核通过，视频将成功发布。</p>
			</div>
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
    mounted(){
        // document.getElementsByClassName('el-icon-upload')[0].remove()
        // document.getElementsByClassName('el-upload__text')[0].remove()
    }
};
</script>

<style>
.el-upload-dragger {
	width: 1055px;
	height: 425px;
}
.slot{
	background: rgb(243, 243, 238);
	height: 100%;
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
}
.slot #center{
	/* background: red; */
	width: 50%;
	height: 50%;
	margin-top: 6%;
}
.slot #center em{
	color: rgba(24, 144, 255, 1);
	margin: 0 10px;
}
.slot .footer{
	width: 100%;
	height: 90%;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.slot div{
	color: rgba(0, 0, 0, 0.45);
	font-size: 14px;
}
</style>
