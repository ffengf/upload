
<template>
    <div id="wangeditor">
        <div id="div1" class="toolbar"></div>
        <div style="padding: 5px 0; color: #ccc">从这里编辑内容</div>
        <div id="edit_text" class="text"></div>
    </div>
</template>

<script lang="ts">
//没有d.ts声明文件
// @ts-ignore
import E from "wangeditor";
import {
    Vue,
    Component,
    Watch,
    Prop,
    Model,
    Emit,
} from "vue-property-decorator";

@Component({
    name: "editorTxt",
})
export default class extends Vue {
    @Model("change_input", { type: String, required: true })
	readonly input!: string;
    @Emit("change_input")
    change_input(str: string) {
        return str;
    }

	editor:any

    get value() {
        return this.input;
    }
    set value(val) {
        this.change_input(val);
	}
    get url() {
        return `http://152.136.202.78:8080/admin/article/imgUpload`;
    }

    mounted() {
		const editor = new E('#div1', '#edit_text');
		this.editor = editor
        editor.customConfig.onchangeTimeout = 1;
        editor.customConfig.uploadFileName = "file";
        editor.customConfig.uploadImgServer = this.url;
        editor.customConfig.onchange = (value: string) => {
            this.value = value;
        };
        editor.customConfig.debug = true;
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
            "redo",
        ];
        editor.customConfig.zIndex = 1;
		editor.create();
		editor.txt.html(this.value)
    }
}
</script>

<style>
#edit_text > div {
	overflow: hidden !important;
	background: rgb(243, 243, 243);
}
</style>
