<template>
    <div>
        <div class="box">
            <el-page-header @back="$router.go(-1)" content="评论列表"></el-page-header>
        </div>
        <div class="mt20">
			<el-button type="primary" @click="key=true;comment=''" style="float:right">评论</el-button>
            <ul>
				<template v-for="ele in list">
					<Item :key="ele.id" :info="ele" :F5="get_list"/>
				</template>
			</ul>
			<Page :total="total" :page.sync="page" :page_size.sync="page_size" />
        </div>
		<el-dialog
            title="请输入回复内容"
            :visible.sync="key"
            width="300px"
        >
            <span>
                <el-input v-model="comment"></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="medium" @click="submit">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Mixin_list } from '@/mixin';
import { Vue, Component, Watch } from "vue-property-decorator";
import { api_comment, comment } from "./api";
import Item from "./item.vue"
import Page from "@/components/page/index.vue";
const List = Mixin_list<comment>((api_comment.get_top_comment as any))
// @ts-ignore
@Component({
	components:{ Item,Page }
})
export default class extends List {

	comment = ''
	key = false

	async submit(){
		await api_comment.post_top_comment(this.comment)
		this.key = false
		this.$message.success('回复成功')
		this.get_list()
	}
}
</script>

<style>
</style>
