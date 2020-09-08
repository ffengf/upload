


import { upload_type } from '@/type/enum';
import { Http_list } from '@/http/http';
type Id = number | string;
export interface article_list {
	id: Id
	title: string
	img: string
	create_time: string
	goods_classy: number
	views_num: string
	love_num: number
	comment_num: number
	status: number
	top: string
}


class HttpLogin extends Http_list<article_list>{
	get_list = (parmas: Object) => {
		return this.get({ ...parmas, upload_type: upload_type.article })
	}

	put_top(data: article_list) {
		return this.put_one({ ...data, top: '1' })
	}

	remove(id:Id){
		this.delete_one(id)
	}

}

export const api_article_list = new HttpLogin('/creator/article/')
