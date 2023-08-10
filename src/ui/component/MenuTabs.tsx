import React from "react";
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function MenuTabs() {
    const [value, setValue] = React.useState(0);

    // @ts-ignore
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        // console.log(event);
        setValue(newValue);
    };

    return (
        <Box>
            <Box>
                <Tabs
                    sx={{
                        '& .MuiTab-root:hover': {
                            textDecoration: 'none',
                            borderBottom: 'none',
                        },
                }}
                    value={value}
                    onChange={handleChange}

                >
                    <Tab label="Products" {...a11yProps(0)}/>
                    <Tab label="About" {...a11yProps(1)}/>
                    <Tab label="Help" {...a11yProps(2)}/>
                </Tabs>
            </Box>

        </Box>
    );
}