

import { Vue, Component, Watch } from "vue-property-decorator";
import { clean } from '@/util/object';



interface id {
	id: number
}
interface get_list<T> {
	results: T[]
	count: number
}

type axios_get<T> = (filter: Object) => Promise<get_list<T>>


export const Mixin_list = <T extends id>(axios_get: axios_get<T>) => {
	// @ts-ignore
	@Component
	abstract class Mixin_list extends Vue {
		list: T[] = [];
		total: number = 0;
		page_size: number = 0;
		page: number = 1;
		selete: T[] = [];
		ordering: string = '';

		abstract filter: Record<string,string|number>

		allSelect(val: T[]) {
			this.selete = val
		}

		sort_change({ prop, order }: Record<string,string>) {//ascending 升 id
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

		async get_list() {
			const { page, page_size, ordering } = this
			const data = clean({ page, ordering, page_size, ...this.filter })
			const { count, results } = await axios_get(data)
			this.total = count
			this.list = results
		}

		created() {
			this.get_list()
		}
	};
	return Mixin_list
}
