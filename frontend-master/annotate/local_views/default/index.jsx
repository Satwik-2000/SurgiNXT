import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UploadContext } from "../../../../contexts";
import { AnnotateMainButton } from "../../buttons";
// import FileUploadModal from "../../fileupload";
import "./style.scss";

export default function AnnotateDefaultView() {
  const history = useHistory();

  // const [btn, setBtn] = useState(0)

  // function handleClick(type){
  //   setBtn(type)
  //   );
  // }

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
          <AnnotateMainButton
            // onTopLeftClick={() => handleButtonClick("operative")};
            goSurgicalTools={() => {history.push({pathname:"/annotate/partial", state :"surgicaltools"})}}
            goSurgeryPhases={() => {history.push({pathname:"/annotate/partial", state : "surgeryphases"})}}
            goExpert={() => {history.push({pathname:"/annotate/partial", state : "expert"})}}
            goAudio={() => {history.push({pathname:"/annotate/partial", state : "audio"})}}
            goUSG={() => {history.push({pathname:"/annotate/partial", state : "USG"})}}
            goPreOperative={() => {history.push({pathname:"/annotate/partial", state : "preoperative"})}}
            goPostOperative={() => {history.push({pathname:"/annotate/partial", state : "postoperative"})}}
            goSurgeryObject={() => {history.push({pathname:"/annotate/partial", state : "surgeryobject"})}}
          />
        </div>

        
      </div>

      
    </>
  );
}
