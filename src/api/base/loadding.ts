/*
 * @Author: your name
 * @Date: 2020-07-29 10:39:42
 * @LastEditTime: 2020-07-29 11:05:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \myapp\src\api\base\loadding.ts
 */

import { Loading } from 'element-ui'

class Load {
	protected loadingCount: number = 0;
	protected loading: any = undefined;

	protected startLoading() {
		this.loading = Loading.service({
			lock: true,
			text: '拼命加载中……',
			background: 'rgba(0, 0, 0, 0.7)'
		});
	}

	protected endLoading() {
		this.loading.close();
	}

	public showLoading() {
		if (this.loadingCount === 0) {
			this.startLoading();
		}
		this.loadingCount += 1;
	}

	public hideLoading() {
		if (this.loadingCount <= 0) {
			return;
		}
		this.loadingCount -= 1;
		if (this.loadingCount === 0) {
			this.endLoading();
		}
	}

	static create(){
		return new Load()
	}
}

export const loadding =  Load.create()
