


import { Http_list } from '@/http/http';
import { UserModule } from '@/module/user';
import { app as Vue } from "@/main"


type Id = number | string;
export interface user_list {
	id: Id
	avatarUrl: string
	username: string
	isFollow: number
	description: string
}

export interface follow{
	target_id:Id
	action:number
}

class Http extends Http_list<user_list>{
	private get_fans(parmas: Object) {
		return this.get({ ...parmas, toUser: UserModule.user_id, search: "follower" })
	}

	private get_concern(parmas: Object) {
		return this.get({ ...parmas, toUser: UserModule.user_id, search: "following" })
	}

	get_list = (parmas: Object) => {
		return Vue.$route.name === "concern" ?
			this.get_concern.call(this, parmas) :
			this.get_fans.call(this, parmas)
	}

	follow(data:follow){
		return this.server.post('/creator/sns_follow/',{ ...data,user_id:UserModule.user_id })
	}
}

export const api_interaction_list = new Http('/creator/user_list/')
