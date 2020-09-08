<template>
    <div>
		<div class="box">
            <el-page-header @back="$router.go(-1)" content="评论列表"></el-page-header>
        </div>

		<div class="mt20">
			123
		</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { api_comment } from './api'
@Component({})
export default class extends Vue {


	created(){
		api_comment.get_top_comment({ page:1,page_size:100 })
		api_comment.get_child_comment({ page:1,page_size:100,parent:'182' })
	}
}
</script>

<style>
</style>
