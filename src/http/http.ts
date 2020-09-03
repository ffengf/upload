
import axios, { AxiosInstance } from 'axios';
import { loadding } from './loadding'
import { app as Vue } from '@/main'

const server = axios.create({
	baseURL: process.env.VUE_APP_API,
	timeout: 10000,
	headers: {
		"Accept": 'application/json',
		"Content-Type": 'application/json',
	},
})


server.interceptors.request.use(config => {
	loadding.showLoading()
	return config;
}, err => {
	loadding.hideLoading()
	return Promise.reject(err);
})
server.interceptors.response.use(({ data }) => {
	loadding.hideLoading()
	if (data.code) {
		Vue.$message.error(data.msg)
		return Promise.reject(data)
	}
	return data
}, err => {
	loadding.hideLoading()
	if (err?.response?.status === 401) {
		return Promise.reject(err)
	}
	return Promise.reject(err)
})

type Id = number | string;

interface has_id {
	id: Id
}

export abstract class Http_list<T extends has_id> {
	protected readonly uri: string
	protected readonly server: AxiosInstance = server;

	constructor(uri: string) {
		this.uri = uri
	}

	protected get<R>(params: unknown): Promise<R> {
		return this.server.get(this.uri, { params })
	}

	protected get_one<R>(id: Id): Promise<R> {
		return this.server.get(`${this.uri}${id}`)
	}

	protected post<T>(data: T) {
		return this.server.post(this.uri, data)
	}

	protected put_one({ id, ...data }: T) {
		return this.server.put(`${this.uri}${id}/`, data)
	}

	protected put_many(id_list: T[], type: unknown) {
		const updateid = id_list.map(x => x.id)
		return this.server.put(`${this.uri}multiple_put/`, { updateid, type })
	}

	protected delete(id: Id | Id[]) {
		const deleteid = Array.isArray(id) ? id.join(',') : id
		return this.server.delete(`${this.uri}multiple_delete/?deleteid=${deleteid}`)
	}
}


export abstract class Http{
	protected readonly uri: string
	protected readonly server: AxiosInstance = server;

	constructor(uri: string) {
		this.uri = uri
	}

	protected post(data:any){
		return this.server.post(this.uri, data)
	}

	protected get(params: any) {
		return this.server.get(this.uri, { params })
	}
}
