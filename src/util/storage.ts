

type StorageType = 'sessionStorage' | 'localStorage'

class StorageDb {
	public static getSession(name:string):any{
		return this.get('sessionStorage',name)
	}

	public static setSession(name:string,context:any){
		this.createAndupdate('sessionStorage',name,context)
	}

	public static removeSession(name:string){
		this.remove('sessionStorage',name)
	}


	public static getLocal(name:string):any{
		return this.get('localStorage',name)
	}

	public static setLocal(name:string,context:any){
		this.createAndupdate('localStorage',name,context)
	}
	public static removeLocal(name:string){
		this.remove('localStorage',name)
	}


	private static createAndupdate(type:StorageType,name:string,context:any){
		if(typeof context !== 'string'){
			window[type].setItem(name, JSON.stringify(context))
		}else{
			window[type].setItem(name,context)
		}
	}

	private static get(type:StorageType,name:string){

		const ret = window[type].getItem(name)
		if(typeof ret === null){
			return null
		}else{
			return JSON.parse(ret as any)
		}
	}
	private static remove(type:StorageType,name:string){
		window[type].removeItem(name)
	}
}
