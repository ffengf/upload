<template>
    <div>
        <el-container>
            <el-aside width="200px">
                <el-menu
                    class="menu"
                    :router="true"
                    :default-active="$route.path"
                >
					<template v-for="e in routerInfo">
						<el-menu-item :index="e.index" :key="e.index">{{ e.name }}</el-menu-item>
					</template>
                </el-menu>
            </el-aside>
            <el-main>
                <RView />
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import RView from "@/components/routerView/index.vue";

export interface routerInfo {
	name:string,
	index:string
}

@Component({
    components: {
		RView,
	}
})
export default class extends Vue {
	@Prop({type: Array,required:true})
	readonly routerInfo !: routerInfo[]
}
</script>

<style>
</style>
