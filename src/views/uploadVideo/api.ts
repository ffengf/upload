


import { Http } from "@/http"
import { upload_type } from '@/type/enum';
type Id = number | string;
export interface video{
	goods_classy:number
	upload_type:number
	project_type:upload_type.video
	title:string
	video:string
	img:string
	is_goods:boolean
	goods_id:Id[]
	introduce:string
	video_time:string
}


class HttpLogin extends Http{
	create(info:video):Promise<any>{
		return this.post(info)
	}
}

export const api_up_video =  new HttpLogin('/creator/article/')
