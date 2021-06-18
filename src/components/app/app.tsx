import { useCallback, useEffect, useRef, useState } from 'react'
import fetchPhotos from '../../services/fetch-photos'
import Grid from '../grid'
import Spinner from '../spinner'
import useLoader from './use-loader'

const Home = () => {

    const [imageList, setImageList] = useState([])
    const [page, setPage] = useState(1)
    const [isFetching, setIsFetching] = useState(false)

    const loader = useRef<HTMLDivElement>(null);

    const fetchNextPhotos = async() => {
        setIsFetching(true)
        const photos = await fetchPhotos(page)
        setImageList(imageList.concat(photos))
        setIsFetching(false)
    }

    useEffect(() => {
        fetchNextPhotos()
    }, [page])

    useLoader(loader, () => {
        if(!isFetching) {
            setPage(curr => curr + 1)  
        }        
    })

    return (
        <div>
            <Grid imageList={imageList} />
            <div ref={loader}><Spinner/></div>
        </div>
    );
}

export default Home;