<template>
    <div>
        <el-table :data="list" style="width: 100%">
            <el-table-column prop="avatarUrl" label="头像" width="150">
                <template slot-scope="scope">
                    <img style="width:100px;height:100px" :src="scope.row.avatarUrl" />
                </template>
            </el-table-column>
            <el-table-column prop="username" label="姓名"></el-table-column>
            <el-table-column prop="description" label="签名"></el-table-column>
            <el-table-column label="操作" width="260" fixed="right">
                <template slot-scope="scope">
                    <template>
                        <el-button
                            size="mini"
                            v-if="scope.row.isFollow === 0"
                            @click="follow(scope.row.id,1)"
                            type="success"
                        >关注</el-button>
                        <el-button
                            size="mini"
                            v-else
                            type="danger"
                            @click="follow(scope.row.id,-1)"
                        >取消关注</el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <Page :total="total" :page.sync="page" :page_size.sync="page_size" />
    </div>
</template>

<script lang="ts">
import { Mixin_list } from "@/mixin";
import { Vue, Component, Watch } from "vue-property-decorator";
import { api_interaction_list, user_list } from "./api";
import Page from "@/components/page/index.vue";

const List = Mixin_list<user_list>(api_interaction_list.get_list as any);
// @ts-ignore
@Component({
    components: { Page },
})
export default class extends List {
    async follow(target_id: string | number, action: number) {
		await api_interaction_list.follow({ target_id,action })
		this.$message.success('修改成功')
		this.get_list()
	}

    @Watch("$route.name")
    watch_route() {
        this.get_list();
    }
}
</script>

<style>
</style>
