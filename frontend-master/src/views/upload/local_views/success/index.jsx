import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UploadContext } from "../../../../contexts";
import { UploadSuccessButton } from "../../buttons";
import { AuthContext } from "../../../../contexts";
//import { FileContext } from "../../fileupload";
import "./style.scss";

export default function UploadSuccessView({ clickedItems }) {
  const [caseNumber, setCaseNumber] = useContext(UploadContext).caseNumber;
  const currentUser = useContext(AuthContext).currentUser;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastClicked, setLastClicked] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const [clickWheelEnabled, setClickWheelEnabled] = useState(false);
  const [fileList, setFileList] = useContext(UploadContext).fileList;
  // const files = useContext(FileContext).filestate;

  const handleButtonClick = (which) => {
    if (which === lastClicked) setLastClicked(null);
    else setLastClicked(which);
  };

  const isSelected = (id) => {
    if (clickedItems?.length > 0 && clickedItems?.includes(id)) return true;
    else if (lastClicked === id) return true;

    return false;
  };
  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (caseNumber !== "") setClickWheelEnabled(true);
  }, [caseNumber]);

  console.log(currentUser);
  //console.log(location.component);
 
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
              ? "dashboard__button"
              : "dashboard__button disabled"
          }
        >
          <UploadSuccessButton
            id = {currentUser.UserDetails["id"]}
            caseName = {caseNumber}
            file = {fileList}
            onCenterClick={() => {handleButtonClick("entire");}}
            onTopLeftClick={() => handleButtonClick("operative")}
            onBottomLeftClick={() => handleButtonClick("pre-operative")}
            onBottomClick={() => handleButtonClick("annotations")}
            onTopRightClick={() => handleButtonClick("usg")}
            onBottomRightClick={() => handleButtonClick("post-operative")}
            CenterSelected={isSelected("entire")}
            TopLeftSelected={isSelected("operative")}
            BottomLeftSelected={isSelected("pre-operative")}
            BottomSelected={isSelected("annotations")}
            TopRightSelected={isSelected("usg")}
            BottomRightSelected={isSelected("post-operative")}
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
      {/* <FileUploadModal
        isOpen={isModalOpen}
        closeCallback={() => setIsModalOpen(false)}
        uploadCallback={() => history.push("/upload/success")}
      /> */}
    </>
  );
}
