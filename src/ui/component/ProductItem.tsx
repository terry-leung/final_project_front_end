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
        }} sx={{ maxWidth: 400 , height: '100%', borderRadius: 6, display: 'flex', flexDirection: 'column'}}>
            <CardActionArea sx={{flexGrow: 1, borderRadius: 0}}>
                <div style={{ position: 'relative', height: 115, paddingTop: '56.25%' }}>
                <CardMedia
                    component="img"
                    height="500"
                    image={`.${props.dto.image_url}`}
                    alt=""
                    style={{ padding: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                </div>
                <CardContent sx={{ flexGrow: 1}}>
                    <Typography gutterBottom variant="h6" component="div">
                        {props.dto.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{
                justifyContent: 'space-between'}}>
                <div>
                <Button variant="contained" size="small" color="error">
                    More Info
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