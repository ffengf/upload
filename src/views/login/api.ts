


import { Http } from "@/http"

interface login{
	phone_num:string
	password:string
}

class HttpLogin extends Http{

	login(info:login){
		return this.post(info)
	}
}

export const api_login =  new HttpLogin('/creator/login/')
