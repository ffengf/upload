

import { filter } from "ramda";

export const clean = (data: Record<string,string | number>)=>{
	return filter(x => x !== "",data)
}
