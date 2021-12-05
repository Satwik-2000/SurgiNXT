import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UploadContext } from "../../../../contexts";
import { UploadAnnotationsButton } from "../../buttons";
import FileUploadModal from "../../fileupload";
import "./style.scss";

export default function UploadAnnotationsView() {
  const [caseNumber, setCaseNumber] = useContext(UploadContext).caseNumber;
  const [clickedItems, setClickedItems] =
    useContext(UploadContext).clickedItems;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastClicked, setLastClicked] = useState(null);
  const history = useHistory();
  const [clickWheelEnabled, setClickWheelEnabled] = useState(false);
  const [details, setDetails] = useContext(UploadContext).details;

  const isUploaded = (item) => {
    if (details) {
      console.log(details);
      
      if (item === "usg" && details.case_usg["usg_videos_images"] && details.case_usg["usg_report"]) return true;
      else if (details.case_details[item]) return true;
      else return false;
    }
  };

  const isSelected = (id) => {
    if (clickedItems?.length > 0 && clickedItems?.includes(id)) return true;
    else if(id === "usg" && clickedItems?.includes("usg_report") && clickedItems?.includes("usg_videos_images")) return true
    else if (lastClicked === id) return true;

    return false;
  };
  

  const uploadCallback = () => {
    // if (lastClicked === "usg-report") {
    //   setClickedItems([...clickedItems, lastClicked]);
    //   setIsModalOpen(false);

    //   if (clickedItems?.includes("usg-vid-img")) {
    //     setClickedItems([...clickedItems, "usg"]);
    //     history.push("/upload");
    //   }
    // } else if (lastClicked === "usg-vid-img") {
    //   setClickedItems([...clickedItems, lastClicked]);
    //   setIsModalOpen(false);

    //   if (clickedItems?.includes("usg-report")) {
    //     setClickedItems([...clickedItems, "usg"]);
    //     history.push("/upload");
    //   }
    // }
  };

  useEffect(() => {
    if (caseNumber !== "") setClickWheelEnabled(true);
  }, [caseNumber]);

  return (
    <>
      <div className="default__view">
        <div className="dashboard__input__wrapper">
          <input
            type="text"
            className="dashboard__input"
            placeholder="Modify Existing Case"
            disabled={true}
            readOnly={true}
            value={`Case Name : ${caseNumber}`}
          />
        </div>

        <div
          className={
            clickWheelEnabled
              ? "dashboard__button annotations"
              : "dashboard__button annotations disabled"
          }
        >
          <UploadAnnotationsButton
            isSegmentedSelected={isSelected("segmented")}
            onSegmentedClick={isSelected("segmented")}
            isPostAnnotationSelected={isSelected("segmented")}
            onPostAnnotationClick={isSelected("segmented")}
            isPreAnnotationSelected={isSelected("segmented")}
            onPreAnnotationClick={isSelected("segmented")}
            isUSGAnnotationSelected={isSelected("segmented")}
            onUSGAnnotationClick={isSelected("segmented")}
            isAudioDescriptionSelected={isSelected("segmented")}
            onAudioDescriptionClick={isSelected("segmented")}
            isPhaseAnnotationSelected={isSelected("phase-annotation")}
            onPhaseAnnotationClick={isSelected("phase-annotation")}
            isHanddrawnAnnotationSelected={isSelected("hand-drawn")}
            onHanddrawnAnnotationClick={isSelected("hand-drawn")}

            isOperativeSelected={isSelected("operative_video")}
            isOperativeUploaded = {isUploaded("operative_video")}
            isUSGSelected={isSelected("usg")}
            isUSGUploaded={isUploaded("usg")}            
            isPreOperativeSelected={isSelected("pre_operative_data")}
            isPreOperativeUploaded={isUploaded("pre_operative_data")}            
            isPostOperativeSelected={isSelected("post_operative_data")}
            isPostOperativeUploaded={isUploaded("post_operative_data")}
            isAnnotationsSelected={true} //Annotations
            onAnnotationsClick={true} //Annotations
            goBack={()=>history.push('/upload/partial')}
            clickedItems = {clickedItems}
          />
        </div>

        {/* <div
          className={
            lastClicked !== null ? "action__btn" : "action__btn disabled"
          }
          onClick={handleUploadClick}
        >
          Upload Dataset
        </div> */}
      </div>
      <FileUploadModal
        isOpen={isModalOpen}
        closeCallback={() => setIsModalOpen(false)}
        uploadCallback={uploadCallback}
      />
    </>
  );
}
