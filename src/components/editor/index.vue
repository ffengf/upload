
<template>
    <div id="wangeditor">
        <div ref="editor" style="text-align: left"></div>
    </div>
</template>

<script lang="ts">
//没有d.ts声明文件
// @ts-ignore
import E from "wangeditor"
import {
    Vue,
    Component,
    Watch,
    Prop,
    Model,
    Emit,
} from "vue-property-decorator"

@Component({
    name: "editorTxt",
})
export default class extends Vue {
    @Model("change_input", { type: String, required: true })
    readonly input!: string
    @Emit("change_input")
    change_input(str: string) {
        return str
	}

	get value(){
		return this.input
	}
	set value(val){
		this.change_input(val)
	}

	get url() {
		return `http://152.136.202.78:8080/admin/article/imgUpload`;
    }

	mounted(){
		const editor = new E(this.$refs.editor)
		editor.customConfig.onchangeTimeout = 1
		editor.customConfig.uploadFileName = "file"
		editor.customConfig.uploadImgServer = this.url
		editor.customConfig.onchange = (value:string) => {
			this.value = value
		}
		editor.customConfig.debug = true
        editor.customConfig.menus = [
            "head",
            "bold",
            "fontSize",
            "fontName",
            "italic",
            "underline",
            "strikeThrough",
            "foreColor",
            "backColor",
            "link",
            "list",
            "justify",
            "quote",
            "image",
            "table",
            "code",
            "undo",
            "redo"
        ]
		editor.customConfig.zIndex = 9
        editor.create()
	}

}
</script>

<style>
</style>
