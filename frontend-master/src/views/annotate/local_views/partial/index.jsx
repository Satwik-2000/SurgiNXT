import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UploadContext } from "../../../../contexts";
import { AnnotatePartialButton } from "../../buttons";
// import FileUploadModal from "../../fileupload";
import "./style.scss";

export default function AnnotatePartialView () {
  const history = useHistory();
  const location = useLocation();
  // console.log(location.state);
  
  // const handleButtonClick = (which) => {
  //   if (which === "usg") history.push("/upload/usg");
  //   else if (which === "annotations") history.push("/upload/annotations");
  //   // else if (which === "entire") history.push("/upload/annotations");
  //   else if (which === lastClicked) setLastClicked(null);
  //   else setLastClicked(which);
  // };
 

  return (
    <>
      <div className="default__view">
        

        <div>
          <AnnotatePartialButton
            button = {location.state}
            //  onTopLeftClick={() => handleButtonClick("operative")};
            // goBack={() => history.push("/upload/partial")}
          />
        </div>

        
      </div>

      
    </>
  );
}
