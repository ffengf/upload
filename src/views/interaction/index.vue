<template>
    <div>
        <Content :routerInfo="routerInfo" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Content from '@/components/content/index.vue'

@Component({
    components: {
		Content,
	}
})
export default class extends Vue {
	routerInfo = [
		{ name:'关注列表', index:'/interaction/concern' },
		{ name:'粉丝列表', index:'/interaction/fans' }
	]
}
</script>

<style>
</style>
