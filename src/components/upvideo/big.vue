<template>
    <div id="big">
        <el-upload
            class="upload-demo"
            drag
            action="https://api.mipinclub.com/file_upload"
            multiple
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
        >
            <div class="slot">
                <div id="center">
                    <i class="el-icon-upload"></i>
                    <p>
                        <em>点击上传</em>或直接将视频文件拖入此区域
                    </p>
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
    </div>
</template>

<script lang="ts">
import {
    Vue,
    Component,
    Watch,
    Prop,
    Model,
    Emit,
} from "vue-property-decorator";

@Component
export default class extends Vue {
    @Model("change_url", { type: String, required: true })
    readonly url!: string;
    @Emit("change_url")
    change_imgList(url: string) {
        return url;
	}
	@Emit("video_time")
	video_time(time:number){
		return time
	}

    beforeUpload(file: HTMLFieldSetElement) {
		const url = URL.createObjectURL(file)
		const video = new Audio(url)
		video.addEventListener('loadedmetadata',()=>{
			this.video_time(video.duration)
		})
        if (file.type !== "video/ogg" && file.type !== "video/mp4") {
            this.$message.error("请上传mp4或者ogg格式视频");
            return false;
        }
	}

	uploadSuccess(res:any){
		this.change_imgList(res.url)
	}
}
</script>

<style>
.el-upload-dragger {
    width: 1055px;
    height: 425px;
}
.slot {
    background: rgb(243, 243, 238);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.slot #center {
    /* background: red; */
    width: 50%;
    height: 50%;
    margin-top: 6%;
}
.slot #center em {
    color: rgba(24, 144, 255, 1);
    margin: 0 10px;
}
.slot .footer {
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.slot div {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
}
</style>
