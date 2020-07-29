/*
 * @Author: your name
 * @Date: 2020-07-29 09:44:09
 * @LastEditTime: 2020-07-29 09:45:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \myapp\src\mixin\picker.ts
 */

declare module 'vue/types/vue' {
	interface Vue {
		mixin_pickerOptions: any
	}
}
export const mixin_pickerOptions = {
	data() {
		return {
			pickerOptions: {
				shortcuts: [
					{
						text: "今天",
						onClick(picker: any) {
							picker.$emit("pick", new Date());
						}
					},
					{
						text: "昨天",
						onClick(picker: any) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit("pick", date);
						}
					},
					{
						text: "一周前",
						onClick(picker: any) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit("pick", date);
						}
					}
				]
			}
		}
	}
}
