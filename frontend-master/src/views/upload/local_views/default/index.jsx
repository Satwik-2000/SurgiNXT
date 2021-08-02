import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UploadContext } from "../../../../contexts";
import { UploadMainButton } from "../../buttons";
import FileUploadModal from "../../fileupload";
import ExistingCaseModal from "../../existingcasemodal";
import { AuthContext } from "../../../../contexts";
import "./style.scss";

export default function UploadDefaultView() {
  const [caseNumber, setCaseNumber] = useContext(UploadContext).caseNumber;
  const currentUser = useContext(AuthContext).currentUser;
  const [clickWheelEnabled, setClickWheelEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caseOpen, setCaseOpen] = useState(false);
  const [lastClicked, setLastClicked] = useState(null);
  const history = useHistory();
  const [clickedItems, setClickedItems] = useContext(UploadContext).clickedItems;
  const [fileList, setFileList] = useContext(UploadContext).fileList;
  

  const handleButtonClick = (which) => {
    if (which === "usg") history.push("/upload/usg");
    else if (which === "annotations") history.push("/upload/annotations");
    // else if (which === "entire") history.push("/upload/annotations");
    else if (which === lastClicked) setLastClicked(null);
    else setLastClicked(which);
  };

  const isSelected = (id) => {
    if (clickedItems?.length > 0 && clickedItems?.includes(id)) return true;
    else if (lastClicked === id) return true;

    return false;
  };

  const handleCaseModal = () => {
    setCaseOpen(true);
  }

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const modalCallBack = (file) => {
    if (lastClicked === "entire") {
      setFileList([...fileList, file])
      history.push({pathname :"/upload/success"});
    } else {
      setClickedItems([...clickedItems, lastClicked]);
      setFileList([...fileList, file])
      history.push({pathname :"/upload/partial"});
    }
  };

  useEffect(() => {
    if (caseNumber === undefined || caseNumber === "")
      setClickWheelEnabled(false);
    else setClickWheelEnabled(true);
  }, [caseNumber]);

  console.log(currentUser);

  return (
    <>
      <div className="default__view">
        {!clickWheelEnabled ? <div className="dashboard__input__wrapper">
          <button
            type="button"
            className="dashboard__input"
            onClick = {handleCaseModal}
            // placeholder="Modify Existing Case"
            // value={caseNumber}
            // onChange={(e) => setCaseNumber(e.target.value)}
            >Modify Existing Case 
          </button>
          <div style = {{paddingRight: 10}}>/</div>
          <div className="dashboard__plus" onClick={() => setCaseNumber(" ")}>
            +
          </div>
        </div> : 
        <div className = "dashboard__input__wrapper">
          <input 
            type = "text"
            placeholder = "Case Name"
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
          />
        </div>} 

        <div
          className={
            clickWheelEnabled
              ? "dashboard__button"
              : "dashboard__button disabled"
          }
        >
          <UploadMainButton
            onCenterClick={() => {handleButtonClick("entire"); handleUploadClick()}}
            onTopLeftClick={() => {handleButtonClick("operative_video") ;handleUploadClick()}}
            onBottomLeftClick={() => {handleButtonClick("pre_operative_data");handleUploadClick()}}
            onBottomClick={() => handleButtonClick("annotations")}
            onTopRightClick={() => handleButtonClick("usg")}
            onBottomRightClick={() => {handleButtonClick("post_operative_data");handleUploadClick() }}
            CenterSelected={isSelected("entire")}
            TopLeftSelected={isSelected("operative_video")}
            BottomLeftSelected={isSelected("pre_operative_data")}
            BottomSelected={isSelected("annotations")}
            TopRightSelected={isSelected("usg")}
            BottomRightSelected={isSelected("post_operative_data")}
          />
        </div>

        <div
          className={
            lastClicked !== null ? "action__btn" : "action__btn disabled"
          }
          onClick={handleUploadClick}
        >
          Upload Dataset
        </div>
      </div>
 
      <FileUploadModal
        isOpen={isModalOpen}
        closeCallback={() => setIsModalOpen(false)}
        uploadCallback={modalCallBack}
      />

      <ExistingCaseModal
        isOpen={caseOpen}
        closeCallback={() => setCaseOpen(false)}
        //id = {currentUser.UserDetails["id"]}
      />
    </>
  );
}
