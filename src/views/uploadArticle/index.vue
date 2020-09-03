<template>
    <div>
		<template v-if="type === 0">
			<Deitor v-model="info.video" />
			<div style="display: flex; justify-content: center;margin: 20px 0;">
				<el-button @click="type = 1" type="primary" size="medium">下一步</el-button>
			</div>
		</template>
		<template v-else>
			<Info>
				<div class="phone" v-html="info.video"></div>
				<el-button @click="type = 0" type="primary" size="medium">重新编辑</el-button>
			</Info>
		</template>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

import Deitor from "@/components/editor/index.vue"
import Info from "@/components/upInfo/index.vue"
@Component({
	components:{
		Deitor,
		Info,
	}
})
export default class extends Vue {
	type = 0
	info = {
		video:""
	}
}
</script>

<style scoped>
.phone{
	width: 300px;
	height: 600px;
	background: rgb(242, 242, 242);
	border-radius: 2%;
	overflow-y: auto;
}
</style>
