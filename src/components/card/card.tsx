import { useState } from "react";
import { checkIfFavourite, toggleFavourite } from "../../utils/storage";
import { PhotoType } from "../../utils/type-definitions";

interface CardProps {
    data: PhotoType
}

const Card: React.FC<CardProps> = ({data}) => {

    const { server, id, secret, ownername, title, favourite } = data;
    const [ isFavourite, setIsFavourite] = useState(favourite)
    

    const handleFavouriteClick = () => {        
        toggleFavourite(data)
        setIsFavourite(!isFavourite)
        
    }

    return (
        <div className='image-card'>
            <img src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg
`} />
            <div className='description'>
                <div className='title'>{title}</div>
                <div className='owner'>{ownername}</div>
                <a className={`fav-button ${isFavourite? "active":""}`} onClick={handleFavouriteClick}>Favourite</a>
            </div>
        </div>
    );
}

export default Card;