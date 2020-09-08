



import { Http } from '@/http';
import { app as Vue } from "@/main"
type Id = number | string;
export interface user {
	username: string
	avatar_url: string

}
export interface comment {
	id: Id
	user: user
	comment: string
	create_time: string
	love_num: number
	parent: string
}
export interface top_parmas {
	page: number
	page_size: number
}
export interface child_parmas {
	page: number
	page_size: number
	parent:string
}

class Api extends Http {
	get_top_comment(parmas: top_parmas): Promise<comment> {
		return this.get({ ...parmas, article: Vue.$route.params.id })
	}
	get_child_comment(parmas: child_parmas): Promise<comment> {
		return this.get(parmas)
	}
}

export const api_comment = new Api('/creator/comment/')
