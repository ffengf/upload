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
}


@Module({ name: 'user', dynamic: true, namespaced: true, stateFactory: true, store })
export default class User extends VuexModule {
	private TOKEN: string | null = StorageDb.getLocal('token')
	private USERNAME: string = ''
	private IMG: string = ''

	@Mutation
	private LOGIN({ username, img, token }: mutation_login) {
		this.USERNAME = username
		this.IMG = img
		this.TOKEN = token
	}

	@Mutation
	private LOGOUT() {
		this.USERNAME = ''
		this.IMG = ''
		this.TOKEN = null
	}

	@Action
	public async login(info: login) {
		const { username, token, img } = await api_login.login(info)
		StorageDb.setLocal('username', username)
		StorageDb.setLocal('img', img)
		StorageDb.setLocal('token', token)
		this.LOGIN({ username, img, token })
	}

	@Action
	public logout() {
		StorageDb.removeLocal('username')
		StorageDb.removeLocal('img')
		StorageDb.removeLocal('token')
		this.LOGOUT()
	}

	public get token() {
		return this.TOKEN
	}

	public get info() {
		return {
			name: this.USERNAME,
			img_url: this.IMG
		}
	}
}


export const UserModule = getModule(User);
