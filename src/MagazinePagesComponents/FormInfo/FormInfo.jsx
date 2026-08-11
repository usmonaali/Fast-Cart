import { Button, TextField } from "@mui/material";
import React from "react";

const FormInfo = () => {
  return (
    <div>
      <div
        className={`w-[780px] h-[432px] rounded-[4px] dark:bg-[#1C2536] shadow-2xl ml-[30px] p-[30px]`}
      >
        <div>
          <form className={`flex items-center flex-wrap gap-[20px]`} action="">
            <TextField id="outlined-basic" className="dark:text-white" label="Name" variant="outlined" />
            <TextField id="outlined-basic" className="dark:text-white" label="Email" variant="outlined" />
            <TextField id="outlined-basic" className="dark:text-white" label="Phone" variant="outlined" />
            <TextField
            
              fullWidth
              sx={{
                width: "710px",
                height:"176px",
                "& .MuiInputBase-root": {
                  height: "176px",
                },
              }}
            />
            <Button
            sx={{
                width:"215px",
                height:"56px",
                backgroundColor:"#DB4444",
                marginLeft:"495px"
            }} 
            variant="contained"
            >Send Massage</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormInfo;
