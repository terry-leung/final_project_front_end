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
        }} sx={{ maxWidth: 345 , borderRadius: 8}}>
            <CardActionArea sx={{borderRadius: 0}}>
                <CardMedia
                    component="img"
                    height="350"
                    image={`.${props.dto.image_url}`}
                    alt=""
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.dto.name}
                    </Typography>
                    {/*<Typography variant="body2" color="text.secondary">*/}
                    {/*    Lizards are a widespread group of squamate reptiles, with over 6,000*/}
                    {/*    species, ranging across all continents except Antarctica*/}
                    {/*</Typography>*/}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
            </CardActions>
        </Card>
    );
}