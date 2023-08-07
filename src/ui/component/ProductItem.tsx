import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {ProductListDto} from "../../data/dto/ProductListDto.ts";
import {useNavigate} from "react-router-dom";

type Props = {
    dto: ProductListDto
}
export default function ProductItem(props: Props) {
    const navigate = useNavigate();

    return (
        <Card onClick={() => {
            navigate(`product/${props.dto.pid}`);
        }} sx={{ maxWidth: 345 , height: '100%', borderRadius: 6, display: 'flex', flexDirection: 'column'}}>
            <CardActionArea sx={{flexGrow: 1, borderRadius: 0}}>
                <CardMedia
                    component="img"
                    height="300"
                    image={`.${props.dto.image_url}`}
                    alt=""
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {props.dto.name}
                    </Typography>
                    {/*<Typography variant="body2" color="text.secondary">*/}
                    {/*    Lizards are a widespread group of squamate reptiles, with over 6,000*/}
                    {/*    species, ranging across all continents except Antarctica*/}
                    {/*</Typography>*/}
                </CardContent>
            </CardActionArea>
            <CardActions sx={{
                justifyContent: 'space-between'}}>
                <div>
                <Button variant="contained" size="small" color="error">
                    More
                </Button>
                </div>
                <div>
                    {
                        props.dto.has_stock ? (
                            <>
                                <Typography variant="body2" color="text.secondary">
                                    In stock !
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Typography variant="body2" color="text.secondary">
                                    Out of stock
                                </Typography>
                            </>
                        )
                    }
                </div>
            </CardActions>
        </Card>
    );
}