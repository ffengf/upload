<template>
    <div class="content">
        <el-row :gutter="30">
            <el-col :span="16">
                <el-form
                    :model="information"
                    :rules="rules"
                    ref="goodsForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    label-position="top"
                >
                    <el-form-item label="标题" prop="name">
                        <el-input v-model="information.name" placeholder="请输入标题" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item label="添加分类" prop="goods_unit">
                        <el-select
                            v-model="information.goods_unit"
                            placeholder="请选择分类"
                            size="medium"
                        >
                            <el-option value="好物种草"></el-option>
                            <el-option value="游学留学"></el-option>
                            <el-option value="全球置业"></el-option>
							<el-option value="海外身份"></el-option>
                            <el-option value="运动健康"></el-option>
                            <el-option value="风味美食"></el-option>
							<el-option value="时尚潮流"></el-option>
                            <el-option value="品质生活"></el-option>
                            <el-option value="萌宠"></el-option>
							<el-option value="美容化妆"></el-option>
                            <el-option value="家居"></el-option>
                            <el-option value="汽车"></el-option>
							<el-option value="旅游"></el-option>
                            <el-option value="教育"></el-option>
                            <el-option value="男士护肤"></el-option>
							<el-option value="综艺"></el-option>
                            <el-option value="女士护肤"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否添加产品" prop="is_real_seal">
                        <el-radio-group size="medium" v-model="information.is_real_seal">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="隐私设置" prop="goods_unit">
                        <el-select
                            v-model="information.goods_unit"
                            placeholder="请选择隐私设置"
                            size="medium"
                        >
                            <el-option value="1" label="公开-所有人可见"></el-option>
                            <el-option value="2" label="私密-仅自己可见"></el-option>
                            <el-option value="3" label="我关注的人可见"></el-option>
                            <el-option value="4" label="关注我的人可见"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发布选项" prop="is_real_seal">
                        <el-radio-group size="medium" v-model="information.is_real_seal">
                            <el-radio :label="true">立即发布</el-radio>
                            <el-radio :label="false">定时发布</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="发布时间" prop="is_real_seal">
                        <el-date-picker v-model="information.value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="是否允许管理员更改您的作品分享" prop="is_real_seal">
                        <div slot="label">
                            <span>是否允许管理员更改您的作品分享</span>
                            <el-tooltip
                                class="item"
                                effect="dark"
                                content="将您的作品推送给更多用户"
                                placement="top"
                            >
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </div>
                        <el-radio-group size="medium" v-model="information.is_real_seal">
                            <el-radio :label="true">允许</el-radio>
                            <el-radio :label="false">不允许</el-radio>
                        </el-radio-group>
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
import { Vue, Component, Watch } from "vue-property-decorator";
@Component({})
export default class extends Vue {
    information = {};
	rules={}
    async submit() {}
}
</script>

<style lang='less' scoped>
// .content {
// width: 60%;
// height: 100%;
// background: red;
// }
</style>


