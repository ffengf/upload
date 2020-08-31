<template>
    <div>
		login
		<button @click="click">goto</button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

import upimg from "@/components/upimg/index.vue";
import editor from "@/components/editor/index.vue";
import upvideo from "@/components/upvideo/big.vue";
import {Mixin_list} from '@/mixin';
@Component({
    components: {
        upimg,
        editor,
        upvideo,
    },
})
export default class extends Vue {
	click(){
		this.$router.push(`/`)
	}
}
</script>

<style>
</style>
