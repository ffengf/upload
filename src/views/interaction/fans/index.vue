<template>
    <div>
		content/article
		<button @click="$router.push(`/content/video`)">click</button>
		<input type="text">
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
@Component({})
export default class extends Vue {

}
</script>

<style>
</style>
