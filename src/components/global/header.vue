<template>
    <div>
        <el-menu class="menu" mode="horizontal" :router='true' :default-active="defaultActive">
            <el-menu-item index="/uploadVideo">发布视频</el-menu-item>
            <el-menu-item index="/uploadArticle">发布文章</el-menu-item>
			<!-- <el-menu-item index="/content">内容管理</el-menu-item>
			<el-menu-item index="/interaction">互动管理</el-menu-item>
			<el-menu-item index="/data">数据管理</el-menu-item> -->
            <el-submenu index="/content">
                <template slot="title">内容管理</template>
                <el-menu-item index="/content/video">视频管理</el-menu-item>
                <el-menu-item index="/content/article">文章管理</el-menu-item>
            </el-submenu>
			<el-submenu index="/interaction">
                <template slot="title">互动管理</template>
                <el-menu-item index="/interaction/concern">关注列表</el-menu-item>
                <el-menu-item index="/interaction/fans">粉丝列表</el-menu-item>
            </el-submenu>
			<!-- <el-submenu index="/data">
                <template slot="title">数据管理</template>
                <el-menu-item index="/data/video">视频数据</el-menu-item>
				<el-menu-item index="/data/article">文章数据</el-menu-item>
            </el-submenu> -->
        </el-menu>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
@Component
export default class extends Vue {
    get defaultActive() {
        return this.$route.path;
    }
}
</script>

<style lang='less' scoped>
</style>
