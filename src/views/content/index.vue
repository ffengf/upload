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
		{ name:'视频管理', index:'/content/video' },
		{ name:'文章管理', index:'/content/article' }
	]
}
</script>

<style>
</style>
