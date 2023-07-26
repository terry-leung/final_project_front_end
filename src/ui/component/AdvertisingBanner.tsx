// import BearCarousel, {TBearSlideItemDataList, BearSlideImage} from 'bear-react-carousel';
import 'bear-react-carousel/dist/index.css';
import {Grid} from "@mui/material";

const images = [
    {id: 1, imageUrl: "https://www.guitar-galleries.co.uk/cdn/shop/t/11/assets/banner_3_2048x2048.jpg?v=23493192034441138281689171508"},
    {id: 2, imageUrl: "https://www.harperfield.co.uk/media/sgwmpn11/musical-instruments-banner.jpg?width=1440&height=405&quality=90"},
    {id: 3, imageUrl: "https://bothners.b-cdn.net/wp-content/uploads/2023/07/Roland-E-X50-Web-banner.jpg"},
];

export default function AdvertisingBanner(){
    const data: TBearSlideItemDataList = images.map(row => {
        return {
            key: row.id,
            // BearSlideImage or BearSlideCard
            children: <BearSlideImage imageUrl={row.imageUrl}/>
        };
    });

    return (
        <>
            <Grid style={{padding: 30,
                margin: "0px auto"}}>
            <BearCarousel
                data={data}
                height="310px"
                // width= "500"
                isEnableNavButton
                isEnablePagination
                interval={5000}
                isInfiniteLoop={true}
            />
            </Grid>
        </>
    )
}