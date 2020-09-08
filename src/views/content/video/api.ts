


import { upload_type } from '@/type/enum';
import { Http_list } from '@/http/http';
type Id = number | string;
export interface video_list {
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


class Http extends Http_list<video_list>{
	get_list = (parmas: Object) => {
		return this.get({ ...parmas, upload_type: upload_type.video })
	}

	put_top(data: video_list) {
		return this.put_one({ ...data, top: '1' })
	}

	remove(id:Id){
		this.delete_one(id)
	}

}

export const api_video_list = new Http('/creator/article/')
