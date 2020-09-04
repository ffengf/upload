
import { Http } from '@/http'
type Id = number | string;
export interface goods {
	id:Id
	img_list:string[]
	name:string
}

interface goods_list{
	count:number
	results:goods[]
}

class HttpUpInfo extends Http{
	search_goods():Promise<goods_list>{
		return this.server.get(this.uri)
	}
}

export const api_up_info =  new HttpUpInfo('/creator/spu_list/')
