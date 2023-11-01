import { useContext } from "react";
import { FavoriteContext, IFavoriteContextData } from "../contexts/FavoriteContext";

export function removeFavoriteState(context: IFavoriteContextData) {
    const { removeAll } = context
    removeAll()
}