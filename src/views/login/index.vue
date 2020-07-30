<!--
 * @Author: your name
 * @Date: 2020-07-29 16:11:35
 * @LastEditTime: 2020-07-29 16:28:30
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \upload\src\views\login\index.vue
-->
<template>
	<div>
		<upimg v-model="imglist" :limitMax='20' />
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";


import upimg from '@/components/upimg/index.vue'


@Component({
	components:{
		upimg
	}
})
export default class extends Vue {
	imglist = ['https://cos.mipinclub.com/image/2020/07/72495e58da8c48e8a00285882b968c25.png']

	created(){

	}
}
</script>

<style>

</style>
