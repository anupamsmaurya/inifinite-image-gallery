import { PhotoType } from "../utils/type-definitions"

const apiKey = '71083b4d38a13104e9bc6813dfe5a597'

/**
 * Fetches paginated image data from Flickr API.
 * @param page number to fetch
 * @returns Promise of Array of image data
 */
export default async function fetchPhotos(page: number): Promise<PhotoType[]> {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&page=${page}&per_page=20&format=json&extras=owner_name&nojsoncallback=1`
    const response = await fetch(url)
    const data = await response.json()
    return data.photos.photo
}