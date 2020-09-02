<template>
    <div>
		<Deitor v-model="info.video" />
		<el-button type="primary">下一步</el-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

import Deitor from "@/components/editor/index.vue"
@Component({
	components:{
		Deitor
	}
})
export default class extends Vue {
	info = {
		video:""
	}
}
</script>

<style>
</style>
