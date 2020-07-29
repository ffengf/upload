/*
 * @Author: your name
 * @Date: 2020-07-29 11:09:05
 * @LastEditTime: 2020-07-29 15:47:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \myapp\src\api\login.ts
 */


import { Http } from './base'

interface Post{
	username:string;
	password:string
}

class Login extends Http<any,Post,any>{
	constructor(uri:string){
		super(uri)
	}
}

export const xml_login = new Login('/login/')
