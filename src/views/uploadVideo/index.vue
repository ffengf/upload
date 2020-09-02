<template>
    <div>
        <UpVideo v-model="info.video" v-if="info.video === ''" />
		<Info v-else />
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
        video: "1",
        name: "",
    };
}
</script>

<style>
</style>
