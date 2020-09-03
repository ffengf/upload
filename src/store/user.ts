import {
	VuexModule,
	Mutation,
	Action,
	getModule,
	Module
} from "vuex-module-decorators";

@Module({name: 'Auth', namespaced: true, stateFactory: true})
export default class User extends VuexModule{
	private token:string|null = StorageDb.getLocal('token')

}
