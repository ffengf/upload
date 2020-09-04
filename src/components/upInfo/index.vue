<template>
    <div class="content">
        <el-row :gutter="30">
            <el-col :span="16">
                <el-form
                    :model="information"
                    :rules="rules"
                    ref="form"
                    label-width="100px"
                    class="demo-ruleForm"
                    label-position="top"
                >
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="information.title" placeholder="请输入标题" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item label="添加封面" prop="img">
                        <Upimg
                            v-model="information.img"
                            :limitMax="1"
                            :isAll="false"
                            :isSort="false"
                        >
                            <span slot="img_tip">图片大小150px*50px,大小不超过3M,只支持.jpg, .png格式(最多上传1张)</span>
                        </Upimg>
                    </el-form-item>
                    <el-form-item label="添加分类" prop="goods_classy">
                        <el-select
                            v-model="information.goods_classy"
                            placeholder="请选择分类"
                            size="medium"
                        >
                            <el-option :value="1" label="好物种草"></el-option>
                            <el-option :value="2" label="项目"></el-option>
                            <el-option :value="3" label="运动健康"></el-option>
                            <el-option :value="4" label="风味美食"></el-option>
                            <el-option :value="5" label="时尚潮流"></el-option>
                            <el-option :value="6" label="品质生活"></el-option>
                            <el-option :value="7" label="萌宠"></el-option>
                            <el-option :value="8" label="美容化妆"></el-option>
                            <el-option :value="9" label="家居"></el-option>
                            <el-option :value="10" label="汽车"></el-option>
                            <el-option :value="11" label="旅游"></el-option>
                            <el-option :value="12" label="教育"></el-option>
                            <el-option :value="13" label="男士护肤"></el-option>
                            <el-option :value="14" label="综艺"></el-option>
                            <el-option :value="15" label="女士护肤"></el-option>
                        </el-select>
                        <el-select
                            v-if="information.goods_classy === 2"
                            v-model="information.project_type"
                            placeholder="请选择项目分类"
                            size="medium"
                        >
                            <el-option :value="1" label="游学留学"></el-option>
                            <el-option :value="2" label="全球置业"></el-option>
                            <el-option :value="3" label="海外身份"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="添加描述"
                        prop="introduce"
                        v-if="information.upload_type === 2"
                    >
                        <el-input v-model="information.introduce" placeholder="请输入描述" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item label="是否添加产品" prop="is_goods">
                        <el-radio-group size="medium" v-model="information.is_goods">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="添加商品" prop="goods_id" v-if="information.is_goods === true">
                        <el-select v-model="information.goods_id" multiple placeholder="请选择商品">
                            <el-option
                                v-for="item in list"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                                <span style="float: left">{{ item.name }}</span>
                                <img
                                    style="float: right;height:50px;width:50px"
                                    :src="item.img_list[0]"
                                />
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div style="display: flex; justify-content: center;margin: 20px 0;">
                        <el-button @click="submit" type="primary" size="medium">提交</el-button>
                    </div>
                </el-form>
            </el-col>
            <el-col :span="8">
                <slot></slot>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Emit } from "vue-property-decorator";
import { ElForm } from "element-ui/types/form";
import Upimg from "@/components/upimg/index.vue";
import { api_up_info, goods } from "./api";
@Component({
    components: { Upimg },
})
export default class extends Vue {
    information = {};
    @Prop({ required: true, type: Object })
    readonly info!: Record<string, any>;
	rules = {};

	@Emit('submit')
    async submit() {
		await (this.$refs["form"] as ElForm | undefined)?.validate();
		return this.information
    }

    list:goods[] = [];

    async get_list() {
		const { results } = await api_up_info.search_goods();
		this.list = results
    }

    created() {
        this.get_list();
        this.information = { ...this.info };
    }
}
</script>

<style lang='less' scoped>
// .content {
// width: 60%;
// height: 100%;
// background: red;
// }
</style>


