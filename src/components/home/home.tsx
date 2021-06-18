import { useCallback, useEffect, useRef, useState } from 'react';
import fetchPhotos from '../../services/fetch-photos';
import Grid from '../grid'
import Spinner from '../spinner'

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

    const loadMore = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isFetching) {
            setPage(curr => curr + 1)
        }
    }, [page, fetchNextPhotos]);

    useEffect(() => {
        fetchNextPhotos()
    }, [page])

    useEffect(() => {
        const options = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.25
        };

        const observer = new IntersectionObserver(loadMore, options);

        // observer the loader
        if (loader && loader.current) {
            observer.observe(loader.current);
        }

        // clean up on willUnMount
        return () => {
            if (loader && loader.current) { 
                observer.unobserve(loader.current);
            }            
        }
    }, [loader, loadMore]);


    return (
        <div>
            <Grid imageList={imageList} />
            <div ref={loader}><Spinner/></div>
        </div>
    );
}

export default Home;