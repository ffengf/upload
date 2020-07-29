/*
 * @Author: your name
 * @Date: 2020-07-29 10:29:40
 * @LastEditTime: 2020-07-29 13:18:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \myapp\src\api\http.ts
 */

import axios from 'axios';
import { loadding } from './loadding'

const server = axios.create({
	baseURL: process.env.API,
	timeout: 10000,
	headers: {
		Accept: 'application/json',
		ContentType: 'application/json',
	},
})


server.interceptors.request.use(config => {
	loadding.showLoading()
	return config;
}, err => {
	loadding.hideLoading()
	return Promise.reject(err);
})
server.interceptors.response.use(({data}) => {
	loadding.hideLoading()
	if(data.code){
		return Promise.reject(data)
	}
	return data
}, err => {
	loadding.hideLoading()
	if(err.response && err.response.status === 401){
		return Promise.reject(err)
	}
	return Promise.reject(err)
})

type Id = number | string;

interface Post_extends {
	id:Id
}

export class Http<Get,Post extends Post_extends> {
	private readonly uri:string

	constructor(uri:string){
		this.uri = uri
	}

	get(params:Get){
		return server.get(this.uri,{ params })
	}

	find_one(id:Id){
		return server.get(`${this.uri}${id}/`)
	}

	post({ id,...data }:Post){
		return server.post(`${this.uri}${id}/`,data)
	}

	delete(id:Id | Id[]){
		const deleteid = Array.isArray(id) ? id.join(',') : id
		return server.delete(`${this.uri}?deleteid=${deleteid}`)
	}

}


