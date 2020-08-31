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
		{ name:'视频数据', index:'/data/video' },
		{ name:'文章数据', index:'/data/article' }
	]
}
</script>

<style>
</style>
