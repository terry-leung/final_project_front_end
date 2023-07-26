import {Container} from "@mui/material";

export default function LoadingContainer() {
    return <Container>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: "95hv",
        }}>
Loading...
        </div>
    </Container>
}