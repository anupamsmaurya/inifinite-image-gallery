export interface PhotoType {
    id: string,
    owner: string,
    ownername: string,
    secret: string,
    server: string,
    farm: number,
    title: string,
    ispublic: number,
    isfriend: number,
    isfamily: number,
    favourite?: boolean 
}

export interface PhotoCollectionType {
    page: number,
    pages: number,
    perpage: number,
    total: number,
    photo: PhotoType[]
}