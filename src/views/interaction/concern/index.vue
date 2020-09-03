<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="头像"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="address" label="签名"></el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
@Component({})
export default class extends Vue {
	tableData=[]
}
</script>

<style>
</style>
