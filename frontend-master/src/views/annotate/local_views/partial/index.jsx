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


  return (
    <>
      <div className="default__view">
        

        <div>
          <AnnotatePartialButton
            button = {location.state}
            startafresh = {() => history.push("/segmentation")}
          />
        </div>

        
      </div>

      
    </>
  );
}
