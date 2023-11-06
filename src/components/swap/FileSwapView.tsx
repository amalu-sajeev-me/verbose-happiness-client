import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SwapCanvas } from "./SwapCanvas";

export const FileSwapView: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Dialog open fullScreen>
            <DialogTitle>
                Swap Pages
            </DialogTitle>
            <DialogContent>
                <Alert variant="standard" color="warning">
                    <AlertTitle>
                        Warning: experimental feature
                    </AlertTitle>
                    This is an experimental feature. you can play around with it. it may have bugs and incomplete features.
                </Alert>
                <Alert variant="standard" color="info">
                    <AlertTitle>
                        How To: 
                    </AlertTitle>
                    Click and drag around the pages to swap their position.
                </Alert>
                <SwapCanvas />
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>navigate(-1)} variant="contained" color="secondary">
                    Go Back
                </Button>
            </DialogActions>
        </Dialog>
    );
}