<template>
    <div>
        <UpVideo v-model="info.video" v-if="info.video === ''" @video_time="video_time" />
        <template v-else>
            <Info :info="info" @submit="submit">
                <video class="video" autoplay :src="info.video" loop></video>
                <el-button @click="back" type="primary" size="medium">重新上传</el-button>
            </Info>
        </template>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import UpVideo from "@/components/upvideo/big.vue";
import Info from "@/components/upInfo/index.vue";
import { upload_type } from "@/type/enum";
import { api_up_video, video } from "./api";
@Component({
    components: {
        UpVideo,
        Info,
    },
})
export default class extends Vue {
    info: video = {
        goods_classy: 1,
        upload_type: upload_type.video,
        project_type: 1,
        title: "",
        video: "",
        img: "",
        is_goods: false,
        goods_id: [],
		introduce: "",
		video_time:""
    };

    back() {
		const info = (this.$refs["info"] as any)?.information;
        this.info = { ...info,video:'',video_time:'' };
    }

    async submit(info: video) {
        await api_up_video.create(info);
        this.$message.success("添加成功");
        this.info = {
            goods_classy: 1,
            upload_type: upload_type.video,
            project_type: 1,
            title: "",
            video: "",
            img: "",
            is_goods: false,
            goods_id: [],
			introduce: "",
			video_time:""
        };
	}

	video_time(val:number){
		this.info.video_time = Math.round(val).toString()
	}

}
</script>

<style scoped>
.video {
    width: 350px;
    height: 400px;
}
</style>
