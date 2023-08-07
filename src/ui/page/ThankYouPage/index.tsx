import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Typography} from "@mui/material";

export default function ThankYouPage() {
    const [countdownTimer, setCountdownTimer] = useState<number>(5);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            if (countdownTimer > 1) {
                setCountdownTimer((prevCount) => (prevCount - 1));
            } else {
                navigate("/")
            }
        }, 1000)
    },[countdownTimer]);

    return(
        <>
            <Typography>
                <h5>
            Payment Success. Thank you!
            This will redirect to main page automatically after {countdownTimer} second(s).
                </h5>
            </Typography>
        </>
    )
}