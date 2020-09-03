<template>
    <div class="pagin">
        <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch, Prop, Emit } from "vue-property-decorator";
@Component
export default class extends Vue {
	@Prop({
        required:true,
        type: Number,
    })
	readonly total!: number;

	@Prop({
        required:true,
        type: Number,
    })
	readonly page_size!: number;
	@Emit("update:page_size")
	update_page_size(val:number){
		return val
	}

	@Prop({
        required:true,
        type: Number,
    })
	readonly page!: number;
	@Emit("update:page")
	update_page(val:number){
		return val
	}

	sizeChange(val:number){
		this.update_page_size(val)
	}
	currentChange(val:number){
		this.update_page(val)
	}
}
</script>

<style>
.pagin {
    padding: 10px 0;
    text-align: right;
}
</style>
