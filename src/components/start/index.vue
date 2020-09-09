<template>
    <div class="start">
		<i></i>
		<span class="span">{{ start }}</span>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class extends Vue {


    @Prop({ required: true, type: [Number, String] })
    start!: number | string;
}
</script>

<style scoped>
.start {
    display: flex;
	align-items: center;
}
.start .span {
	margin-left: 5px;
	margin-right: 5px;
}
</style>
