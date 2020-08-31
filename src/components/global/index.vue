<template>
    <div id="page">
        <el-container width="500" id="container">
            <el-header>
				<Header />
			</el-header>
            <el-main>
				<RView />
			</el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

import Header from './header.vue'
import RView from '@/components/routerView/index.vue'
@Component({
	components:{
		Header,
		RView
	}
})
export default class extends Vue {}
</script>

<style lang='less' scoped>
#page{
	width: 100%;
	height: 100%;
	background: rgb(246, 246, 246);
	display: flex;
    justify-content: center;
	#container{
		width: 1140px !important;
		overflow: hidden;
		background: #fff;
		flex: none !important;
	}
}
</style>
