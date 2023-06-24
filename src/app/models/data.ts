import { Buyer } from "./buyer";
import { Game } from "./game";

export interface Data {
    game: Game | null,
    type: string,
    buyer:Buyer,
    amount:number
  }