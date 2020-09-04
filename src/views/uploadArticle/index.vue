<template>
    <div>
        <template v-if="type === 0">
            <Deitor v-model="info.content" />
            <div style="display: flex; justify-content: center;margin: 20px 0;">
                <el-button @click="type = 1" type="primary" size="medium">下一步</el-button>
            </div>
        </template>
        <template v-else>
            <Info :info="info" ref="info" @submit="submit">
                <div class="phone" v-html="info.content"></div>
                <el-button @click="back" type="primary" size="medium">重新编辑</el-button>
            </Info>
        </template>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

import Deitor from "@/components/editor/index.vue";
import Info from "@/components/upInfo/index.vue";

import { article, api_up_article } from "./api";
import { upload_type } from '@/type/enum';
@Component({
    components: {
        Deitor,
        Info,
    },
})
export default class extends Vue {
    type = 0;
    info: article = {
        goods_classy: 1,
        upload_type: upload_type.article,
        project_type: 1,
        title: "",
        content: "",
        img: "",
        is_goods: false,
		goods_id: [],
    };

    back() {
        const info = (this.$refs["info"] as any)?.information;
		this.info = { ...info };
		this.type = 0
	}

	async submit(info:article){
		await api_up_article.create(info)
		this.$message.success('添加成功')
		this.info = {
			goods_classy: 1,
			upload_type: upload_type.article,
			project_type: 1,
			title: "",
			content: "",
			img: "",
			is_goods: false,
			goods_id: [],
		}
		this.type = 0
	}
}
</script>

<style scoped>
.phone {
    width: 300px;
    height: 600px;
    background: rgb(242, 242, 242);
    border-radius: 2%;
    overflow-y: auto;
}
</style>
