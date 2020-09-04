


import { Http } from "@/http"
import { upload_type } from '@/type/enum';
type Id = number | string;
export interface article{
	goods_classy:number
	upload_type:number
	project_type:upload_type.article
	title:string
	content:string
	img:string
	is_goods:boolean
	goods_id:Id[]
}


class HttpLogin extends Http{
	create(info:article):Promise<any>{
		return this.post(info)
	}
}

export const api_up_article =  new HttpLogin('/creator/article/')
