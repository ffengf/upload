<template>
    <li class="item">
        <img class="img" :src="info.user.avatar_url" />
        <div class="warpper">
            <div class="name">{{ info.user.username }}</div>
            <div class="time color_info">{{ info.create_time }}</div>
            <div class="comment">{{ info.comment }}</div>
            <div class="btn_box">
                <Start class="color_info iconfont icon-zan1" :start="info.love_num"/>
                <el-button class="color_info" type="text" icon="el-icon-delete" @click="del()">删除</el-button>
                <el-button class="color_info" type="text" icon="iconfont icon-huifu" @click="comment_one">回复</el-button>
                <template>
                    <el-button
                        v-if="isShow"
                        @click="show"
                        class="color_info"
                        type="text"
                        icon="el-icon-arrow-down"
                    >显示更多</el-button>
                    <el-button
                        v-if="key === true"
                        @click="key = false"
                        class="color_info"
                        type="text"
                        icon="el-icon-arrow-up"
                    >收起</el-button>
                </template>
            </div>
            <ul class="children" v-if="key === true">
                <li class="item" v-for="ele in children" :key="ele.id">
                    <img class="img" :src="ele.user.avatar_url" />
                    <div class="warpper">
                        <div class="name">{{ ele.user.username }}</div>
                        <div class="time color_info">{{ ele.create_time }}</div>
                        <div class="comment">
							<span v-if="ele.to_user !== null">回复 <span class="color_info">{{ ele.to_user.username }}：</span></span>
							<span>{{ ele.comment }}</span>
						</div>
                        <div class="btn_box">
                            <el-button class="color_info" type="text" icon="el-icon-delete" @click="del(ele.id)">删除</el-button>
                            <el-button class="color_info" type="text" icon="iconfont icon-huifu" @click="comment_two(ele)">回复</el-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
		<el-dialog
            title="请输入回复内容"
            :visible.sync="dialog_key"
            width="300px"
        >
            <span>
                <el-input v-model="sub_info.comment"></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="medium" @click="submit">确定</el-button>
            </span>
        </el-dialog>
    </li>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { api_comment,comment } from "./api";
import Start from "@/components/start/index.vue";
@Component({
    components: { Start },
})
export default class extends Vue {
    @Prop({ required: true, type: Object })
	info!: comment;
	@Prop({ required:true,type:Function })
	F5 !:Function

	sub_info : any = {
		comment:''
	}

    children: comment[] = [];
	key = false;
	dialog_key = false

    async show() {
        if (this.children.length === 0) {
            await this.get_child()
        }
        this.key = true;
	}

	async get_child(){
		const { results } = await api_comment.get_child_comment({
			parent: this.info.id,
		});
		this.children = results;
	}

    get isShow() {
        if (this.key === false && this.info.more === true) {
            return true;
        }
        return false;
	}

	async del(id:number|string|undefined){
		if(id === undefined){
			await api_comment.del_comment(this.info.id)
			this.F5()
		}else{
			await api_comment.del_comment(id)
			this.get_child()
		}
		this.$message.success('删除成功')
	}

	async submit(){
		if(this.sub_info.parent !== undefined){
			await api_comment.post_one_comment(this.sub_info)
		}else if (this.sub_info.to_user !== undefined){
			await api_comment.post_two_comment(this.sub_info)
		}else{
			return
		}
		this.dialog_key = false
		this.$message.success('回复成功')
		this.get_child()
	}

	comment_one(){
		this.sub_info = {
			parent: this.info.id,
			comment:''
		}
		this.dialog_key = true
	}

	comment_two(info:comment){
		this.sub_info = {
			parent:this.info.id,
			to_user: info.user.id,
			comment:''
		}
		this.dialog_key = true
	}
}
</script>

<style lang='less' scoped>
.item {
    width: 100%;
    margin: 5px 0;
    display: flex;
    box-sizing: border-box;
    // flex-direction: column;
    .img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        padding-top: 5px;
    }
    .warpper {
        margin-left: 20px;
        .name {
            letter-spacing: 1px;
            font-weight: 550;
            font-size: 14px;
        }
        .time {
            font-size: 12px;
        }
        .comment {
            word-wrap: break-all;
            overflow: hidden;
            word-break: normal;
        }
        .btn_box {
            width: 230px;
            display: flex;
            align-items: center;
        }
        .btn_box > * {
            margin-left: 10px;
        }
    }
}
</style>

<style>
.color_info {
    color: rgb(144, 147, 153);
}
</style>
