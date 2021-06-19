import { PhotoType } from "./type-definitions"

/**
 * Toggles status of an image as favourite or not. 
 * Uses localStorage to persist data on page refresh.
 * While marking an image as favourite adds 'favourite: true' 
 * so that it can be shown as default(useState()) on render.
 * @param photo PhotoType image object
 */
export const toggleFavourite = (photo: PhotoType) => {
    let list = getFavoriteList()
    if(list.find((item: PhotoType) => item.id === photo.id)) {
        list = list.filter((item: PhotoType) => item.id !== photo.id)
    } else {
        list.push({...photo, favourite: true})
    }
    localStorage.setItem('gallery-favourites', JSON.stringify(list))
}

/**
 * Returns all images which are marked favourite from localStorage.
 * @returns list of images marked favourite
 */
export const getFavoriteList = (): Array<PhotoType> => {
    const strValue = localStorage.getItem('gallery-favourites') 
    if(!strValue) return []
    return JSON.parse(strValue)
}