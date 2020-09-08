


import { Http } from "@/http"
import { AxiosResponse } from 'axios'

export interface login{
	phone_num:string
	password:string
}

export interface login_info {
	username:string
	token:string
	img:string
	user_id:string
}

class HttpLogin extends Http{

	login(info:login):Promise<login_info>{
		return this.post(info)
	}
}

export const api_login =  new HttpLogin('/creator/login/')
