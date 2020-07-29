/*
 * @Author: your name
 * @Date: 2020-07-29 09:42:44
 * @LastEditTime: 2020-07-29 09:48:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \myapp\src\mixin\list.ts
 */


import { Vue, Component, Watch } from "vue-property-decorator";



interface id {
	id: number
}

// @ts-ignore
@Component
export abstract class Mixin_list<T extends id> extends Vue {
	list: T[] = [];
	total: number = 0;
	page_size: number = 0;
	page: number = 1;
	selete: T[] = [];
	ordering: string = '';

	allSelect(val: T[]) {
		this.selete = val
	}

	sort_change({ prop, order }: any) {//ascending 升 id
		if (order === null) {
			this.ordering = ''
			return
		}
		this.ordering = order === "ascending" ? prop : `-${prop}`;
	}

	get get_select() {
		return this.selete.map(x => x.id)
	}

	@Watch('page')
	watch_page() {
		this.get_list()
	}

	@Watch('page_size')
	watch_page_size() {
		this.get_list()
	}

	abstract get_list(): void

	created() {
		this.get_list()
	}
};
