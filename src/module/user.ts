import {
	VuexModule,
	Mutation,
	Action,
	getModule,
	Module
} from "vuex-module-decorators";

import store from "./index"
import StorageDb from '@/util/storage';
import { login } from '@/views/login/api';
import { api_login } from '@/views/login/api'

interface mutation_login {
	username: string
	img: string
	token: string
	user_id:string
}


@Module({ name: 'user', dynamic: true, namespaced: true, stateFactory: true, store })
export default class User extends VuexModule {
	private TOKEN: string | null = StorageDb.getLocal('token')
	private USERNAME: string = StorageDb.getLocal('username')
	private IMG: string = StorageDb.getLocal('img')
	private USER_ID: string = StorageDb.getLocal('user_id')

	@Mutation
	private LOGIN({ username, img, token, user_id }: mutation_login) {
		this.USERNAME = username
		this.IMG = img
		this.TOKEN = token
		this.USER_ID = user_id
	}

	@Mutation
	private LOGOUT() {
		this.USERNAME = ''
		this.IMG = ''
		this.TOKEN = null
		this.USER_ID = ''
	}

	@Action
	public async login(info: login) {
		const { username, token, img, user_id } = await api_login.login(info)
		StorageDb.setLocal('username', username)
		StorageDb.setLocal('img', img)
		StorageDb.setLocal('token', token)
		StorageDb.setLocal('user_id', user_id)
		this.LOGIN({ username, img, token, user_id })
	}

	@Action
	public logout() {
		StorageDb.removeLocal('username')
		StorageDb.removeLocal('img')
		StorageDb.removeLocal('token')
		StorageDb.removeLocal('user_id')
		this.LOGOUT()
	}

	public get token() {
		return this.TOKEN
	}

	public get user_id(){
		return this.USER_ID
	}

	public get info() {
		return {
			name: this.USERNAME,
			img_url: this.IMG
		}
	}
}


export const UserModule = getModule(User);
