



import { Http } from '@/http';
import { app as Vue } from "@/main"
import { UserModule } from '@/module/user';
type Id = number | string;
export interface user {
	username: string
	avatar_url: string
	id:Id
}
export interface comment {
	id: Id
	user: user
	comment: string
	create_time: string
	love_num: number
	parent: string
	more: boolean
	to_user?: user
}
export interface top_parmas {
	page: number
	page_size: number
}
export interface child_parmas {
	page?: number
	page_size?: number
	parent: Id
}

interface results {
	results: comment[]
}

// interface info {
// 	to_user?:Id
// 	comment:string
// 	article:Id //主才有
// 	parent
// }
export interface base {
	comment: string
}

export interface to_one extends base {
	parent: Id
}

export interface to_two extends base,to_one {
	to_user: Id
}

class Api extends Http {
	get_top_comment = (parmas: top_parmas): Promise<comment> => {
		return this.get({ ...parmas, article: Vue.$route.params.id })
	}
	get_child_comment(parmas: child_parmas): Promise<results> {
		return this.get(parmas)
	}

	del_comment(id: Id) {
		return this.delete_one(id)
	}

	post_top_comment(comment: string) {
		const id = Vue.$route.params.id
		return this.post({ comment, article_int: id, article: id, user: UserModule.user_id, is_self: false })
	}

	post_one_comment(to_one: to_one) {
		const id = Vue.$route.params.id
		return this.post({ ...to_one, article_int: id, user: UserModule.user_id, is_self: true })
	}

	post_two_comment(to_two:to_two) {
		const id = Vue.$route.params.id
		return this.post({ ...to_two, article_int: id, user: UserModule.user_id, is_self: false })
	}
}

export const api_comment = new Api('/creator/comment/')
