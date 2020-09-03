<template>
    <div>
        <UpVideo v-model="info.video" v-if="info.video === ''" />
		<Info v-else>
			<video class="video" autoplay :src="info.video" loop></video>
			<el-button @click="info.video = ''" type="primary" size="medium">重新上传</el-button>
		</Info>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import UpVideo from "@/components/upvideo/big.vue";
import Info from "@/components/upInfo/index.vue"
@Component({
    components: {
		UpVideo,
		Info,
    },
})
export default class extends Vue {
    info = {
        video: "https://cos.mipinclub.com/video/2020/09/64bbf99702d44150a069eac90482c077.mp4",
        name: "",
    };
}
</script>

<style scoped>
.video{
	width: 350px;
	height: 400px;
}
</style>
