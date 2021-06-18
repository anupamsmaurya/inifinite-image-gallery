import { PhotoType } from "./type-definitions"

export const checkIfFavourite = (id: string) => {
    const list = getFavoriteList()
    return list.length === 0 ? false : list.find((item: PhotoType) => item.id === id)
}

export const toggleFavourite = (photo: PhotoType) => {
    let list = getFavoriteList()
    if(list.find((item: PhotoType) => item.id === photo.id)) {
        list = list.filter((item: PhotoType) => item.id !== photo.id)
    } else {
        list.push({...photo, favourite: true})
    }
    localStorage.setItem('gallery-favourites', JSON.stringify(list))
}

export const getFavoriteList = () => {
    const strValue = localStorage.getItem('gallery-favourites') 
    //debugger
    if(!strValue) return []
    return JSON.parse(strValue)
}