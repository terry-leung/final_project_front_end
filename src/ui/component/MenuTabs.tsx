import React from "react";
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";

// interface TabPanelProps {
//     children?: React.ReactNode;
//     index: number;
//     value: number;
// }

// function CustomTabPanel(props: TabPanelProps) {
//     const { children, value, index, ...other } = props;
//
//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function MenuTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
                    // aria-label="basic tabs example"
                    // textColor="inherit" value={0} indicatorColor="primary"
                >
                    <Tab label="Products" {...a11yProps(0)}/>
                    <Tab label="About" {...a11yProps(1)}/>
                    <Tab label="Help" {...a11yProps(2)}/>
                </Tabs>
            </Box>
            {/*<CustomTabPanel value={value} index={0}>*/}
            {/*    Products*/}
            {/*</CustomTabPanel>*/}
            {/*<CustomTabPanel value={value} index={1}>*/}
            {/*    About*/}
            {/*</CustomTabPanel>*/}
            {/*<CustomTabPanel value={value} index={2}>*/}
            {/*    Help*/}
            {/*</CustomTabPanel>*/}
        </Box>
    );
}