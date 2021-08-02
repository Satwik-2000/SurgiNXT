import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UploadContext } from "../../../../contexts";
import { UploadOperativeButton, UploadUSGButton } from "../../buttons";
import FileUploadModal from "../../fileupload";
import "./style.scss";

export default function UploadUSGView() {
  const [caseNumber, setCaseNumber] = useContext(UploadContext).caseNumber;
  const [clickedItems, setClickedItems] = useContext(UploadContext).clickedItems;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastClicked, setLastClicked] = useState(null);
  const history = useHistory();
  const [clickWheelEnabled, setClickWheelEnabled] = useState(false);
  const [fileList, setFileList] = useContext(UploadContext).fileList;
  const [details, setDetails] = useContext(UploadContext).details;

  const handleButtonClick = (which) => {
    if (which === "usg_report" || which === "usg_videos_images") {
      setIsModalOpen(true);
      setLastClicked(which);
    } else if (which === "usg") {
      setLastClicked("usg");
      history.push({pathname :"/upload/partial"});
    } else if (which === lastClicked) setLastClicked(null);
    else setLastClicked(which);
  };
  console.log(clickedItems);

  const isSelected = (id) => {
    if (clickedItems?.length > 0 && clickedItems?.includes(id)) return true;
    else if (lastClicked === id) return true;

    return false;
  };

  const isUploaded = (item) => {
    if (details)
    {
      console.log(details);
      if (details.case_usg[item]) return true
      else return false
    } 
  }



  
  const uploadCallback = (file) => {
    
    setFileList([...fileList, file]);
    if (lastClicked === "usg_report") {
      setClickedItems([...clickedItems, lastClicked]);
      setIsModalOpen(false);

      // if (clickedItems?.includes("usg-vid-img")) {
      //   setClickedItems([...clickedItems, "usg"]);
      //   history.push({pathname :"/upload/partial"});
      // }
    } else if (lastClicked === "usg_videos_images") {
      setClickedItems([...clickedItems, lastClicked]);
      setIsModalOpen(false);

      // if (clickedItems?.includes("usg-report")) {
      //   setClickedItems([...clickedItems, "usg"]);
      //   history.push({pathname :"/upload/partial"});
      // }
    }
    // history.push("/upload/usg");
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
              ? "dashboard__button usg"
              : "dashboard__button usg disabled"
          }
        >
          <UploadUSGButton
            onLeftClick={() => handleButtonClick("usg_report")}
            onRightClick={() => handleButtonClick("usg_videos_images")}
            onCenterClick={() => handleButtonClick("entire")}
            onTopLeftClick={() => handleButtonClick("operative")}
            onBottomLeftClick={() => handleButtonClick("pre-operative")}
            onBottomClick={() => handleButtonClick("annotations")}
            onTopRightClick={() => {
              handleButtonClick("usg");
            }}
            goBack={() => history.push({pathname :"/upload/partial"})}
            onBottomRightClick={() => handleButtonClick("post-operative")}
            CenterSelected={isSelected("entire")}
            TopLeftSelected={isSelected("operative")}
            isRightClicked={clickedItems?.includes("usg_videos_images")}
            isLeftClicked={clickedItems?.includes("usg_report")}
            isLeftUploaded = {isUploaded("usg_report")}
            isRightUploaded = {isUploaded("usg_videos_images")}
            BottomLeftSelected={isSelected("pre-operative")}
            BottomSelected={isSelected("annotations")}
            TopRightSelected={isSelected("usg")}
            BottomRightSelected={isSelected("post-operative")}

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
