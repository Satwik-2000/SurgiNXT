import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UploadContext } from "../../../../contexts";
import { UploadMainButton } from "../../buttons";
import FileUploadModal from "../../fileupload";
import { AuthContext } from "../../../../contexts";
import "./style.scss";

export default function UploadDefaultView() {
  const [caseNumber, setCaseNumber] = useContext(UploadContext).caseNumber;
  const currentUser = useContext(AuthContext).currentUser;
  const [clickWheelEnabled, setClickWheelEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastClicked, setLastClicked] = useState(null);
  const history = useHistory();
  const [clickedItems, setClickedItems] =
    useContext(UploadContext).clickedItems;

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


  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const modalCallBack = () => {
    if (lastClicked === "entire") {
      history.push("/upload/success");
    } else {
      setClickedItems([...clickedItems, lastClicked]);
      history.push("/upload/partial");
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
            onTopLeftClick={() => {handleButtonClick("operative") ;handleUploadClick()}}
            onBottomLeftClick={() => {handleButtonClick("pre-operative");handleUploadClick()}}
            onBottomClick={() => handleButtonClick("annotations")}
            onTopRightClick={() => handleButtonClick("usg")}
            onBottomRightClick={() => {handleButtonClick("post-operative");handleUploadClick() }}
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

      <FileUploadModal
        isOpen={isModalOpen}
        // buttonName = {}
        closeCallback={() => setIsModalOpen(false)}
        uploadCallback={modalCallBack}
      />
    </>
  );
}
