import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UploadContext } from "../../../../contexts";
import { UploadSuccessButton } from "../../buttons";
import { AuthContext } from "../../../../contexts";
import FileUploadModal from "../../fileupload";
import "./style.scss";

export default function UploadSuccessView({ clickedItems }) {
  const [caseNumber, setCaseNumber] = useContext(UploadContext).caseNumber;
  const currentUser = useContext(AuthContext).currentUser;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastClicked, setLastClicked] = useState(null);
  const history = useHistory();
  const [clickWheelEnabled, setClickWheelEnabled] = useState(false);

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
            value={`Case Number : ${caseNumber}`}
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
            onCenterClick={() => handleButtonClick("entire")}
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
