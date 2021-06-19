import { useState } from "react";
import { toggleFavourite } from "../../utils/storage";
import { PhotoType } from "../../utils/type-definitions";
import ImageRenderer from "../image-renderer";
import placeholder from "../../mask.gif"

interface CardProps {
    data: PhotoType
}

/**
 * Component for showing a image and its metadata.
 * Also contains 'Favourite' button to preserve image on page refresh.
 */
const Card: React.FC<CardProps> = ({data}) => {

    const { server, id, secret, ownername, title, favourite } = data;
    const [ isFavourite, setIsFavourite] = useState(favourite)
    

    const handleFavouriteClick = () => {        
        toggleFavourite(data)
        setIsFavourite(!isFavourite)
        
    }

    return (
        <div className='image-card'>
            <ImageRenderer 
                url={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`}
                placeholder={placeholder} 
                title={title}
            />
            <div className='description'>
                <div className='title'>{title}</div>
                <div className='owner'>{ownername}</div>
                <button className={`fav-button ${isFavourite? "active":""}`} onClick={handleFavouriteClick}>Favourite</button>
            </div>  
        </div>
    );
}

export default Card;