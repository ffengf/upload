<template>
    <div>
        <div class="tabList">
            <span :class="{cur: '' === filter.status}" @click="()=> filter.status = ''">全部</span>
            <span
                :class="{cur: index + 1 === filter.status}"
                v-for="(item, index) in tabList"
                :key="index"
                @click="()=> filter.status = index + 1"
            >{{item}}</span>
        </div>
        <div class="mt20">
            <el-table :data="list" style="width: 100%">
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="img" label="封面图" width="150">
                    <template slot-scope="scope">
                        <img style="width:100px;height:100px" :src="scope.row.img" />
                    </template>
                </el-table-column>
                <el-table-column prop="goods_classy" label="分类">
                    <template slot-scope="scope">
                        <span>{{ scope.row.goods_classy | goods_classy }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="信息" width="100">
                    <template slot-scope="scope">
                        <div>评论:{{ scope.row.comment_num }}</div>
                        <div>点赞量:{{ scope.row.love_num }}</div>
                        <div>浏览量:{{ scope.row.views_num }}</div>
                    </template>
                </el-table-column>

                <el-table-column prop="top" label="是否置顶">
                    <template slot-scope="scope">
                        <span>{{ scope.row.top | top }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <span>{{ scope.row.status | status }}</span>
                    </template>
                </el-table-column>
				<el-table-column prop="create_time" label="发布时间"></el-table-column>
                <el-table-column label="操作" width="260" fixed="right">
                    <template slot-scope="scope">
                        <template>
                            <el-button
                                size="mini"
                                v-if="scope.row.top === null"
                                @click="top(scope.row)"
                                type="success"
                            >置顶</el-button>
                            <el-button size="mini" v-else type="danger" @click="top(scope.row)">取消置顶</el-button>
                        </template>
                        <el-button size="mini" @click="remove(scope.row.id)" type="danger">删除</el-button>
                        <el-button size="mini" @click="comment(scope.row.id)" type="primary">评论列表</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Page :total="total" :page.sync="page" :page_size.sync="page_size" />
        </div>
    </div>
</template>

<script lang="ts">
import { Mixin_list } from "@/mixin";
import { Vue, Component, Watch } from "vue-property-decorator";
import { api_article_list, article_list } from "./api";
import Page from "@/components/page/index.vue";

const List = Mixin_list<article_list>(api_article_list.get_list as any);
// @ts-ignore
@Component({
    components: {
        Page,
    },
    filters: {
        goods_classy(e: number) {
            return [
                "",
                "好物种草",
                "项目",
                "运动健康",
                "风味美食",
                "时尚潮流",
                "品质生活",
                "萌宠",
                "美容化妆",
                "家居",
                "汽车",
                "旅游",
                "教育",
                "男士护肤",
                "综艺",
                "女士护肤",
            ][e];
        },
        status(e: number) {
            return ["", "待审核", "审核通过", "审核失败"][e];
        },
        top(e: any) {
            return e === null ? "未置顶" : "置顶";
        },
    },
})
export default class extends List {
    tabList = ["待审核", "审核通过", "审核失败"];

    filter = {
        status: "",
    };

    async top(row: article_list) {
		await api_article_list.put_top(row)
		this.$message.success('修改成功')
		this.get_list()
    }

    async remove(id: number | string) {
		await api_article_list.remove(id)
		this.$message.success('删除成功')
		this.get_list()
	}

	comment(id: number | string){
		this.$router.push(`/content/comment/${id}`)
	}

    @Watch("filter.status")
    Watch_filter() {
        this.get_list();
    }
}
</script>

<style lang='less' scoped>
.tabList {
    display: flex;
    span {
        background: #909399;
        margin-right: 20px;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        color: #fff;
    }
    span.cur,
    span:hover {
        background: #67c23a;
        color: #fff;
    }
}
</style>
