import { Buyer } from "./buyer";
import { Game } from "./game";

export interface Data {
    type: string,
    amount:number,
    buyer:Buyer,
  }