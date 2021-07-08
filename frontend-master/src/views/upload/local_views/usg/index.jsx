import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UploadContext } from "../../../../contexts";
import { UploadOperativeButton, UploadUSGButton } from "../../buttons";
import FileUploadModal from "../../fileupload";
import "./style.scss";

export default function UploadUSGView() {
  const [caseNumber, setCaseNumber] = useContext(UploadContext).caseNumber;
  const [clickedItems, setClickedItems] =
    useContext(UploadContext).clickedItems;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastClicked, setLastClicked] = useState(null);
  const history = useHistory();
  const [clickWheelEnabled, setClickWheelEnabled] = useState(false);

  const handleButtonClick = (which) => {
    if (which === "usg-report" || which === "usg-vid-img") {
      setIsModalOpen(true);
      setLastClicked(which);
    } else if (which === "usg") {
      setLastClicked("usg");
      history.push("/upload/partial");
    } else if (which === lastClicked) setLastClicked(null);
    else setLastClicked(which);
  };

  const isSelected = (id) => {
    if (clickedItems?.length > 0 && clickedItems?.includes(id)) return true;
    else if (lastClicked === id) return true;

    return false;
  };

  const shouldShowPercentageOrNot = () => {
    console.log("CLICKED ITEMS : ", clickedItems);
    // maximum occupied by usg button is 3 instances
    if (clickedItems.length > 3) return true;

    let _items = clickedItems;

    if (_items.findIndex((e) => e == "usg-report") !== -1) {
      let _ = _items.splice(
        clickedItems.findIndex((e) => e == "usg-report"),
        1
      );
      _items = _;
    }

    if (_items.findIndex((e) => e == "usg-vid-img") !== -1) {
      let _ = _items.splice(
        clickedItems.findIndex((e) => e == "usg-vid-img"),
        1
      );
      _items = _;
    }

    if (_items.findIndex((e) => e == "usg") !== -1) {
      let _ = _items.splice(
        clickedItems.findIndex((e) => e == "usg"),
        1
      );
      _items = _;
    }

    if (_items.length > 0) return true;

    return false;
  };
  // const handleUploadClick = () => {
  //   setIsModalOpen(true);
  // };

  const uploadCallback = () => {
    if (lastClicked === "usg-report") {
      setClickedItems([...clickedItems, lastClicked]);
      setIsModalOpen(false);

      if (clickedItems?.includes("usg-vid-img")) {
        setClickedItems([...clickedItems, "usg"]);
        history.push("/upload/partial");
      }
    } else if (lastClicked === "usg-vid-img") {
      setClickedItems([...clickedItems, lastClicked]);
      setIsModalOpen(false);

      if (clickedItems?.includes("usg-report")) {
        setClickedItems([...clickedItems, "usg"]);
        history.push("/upload/partial");
      }
    }
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
            onLeftClick={() => handleButtonClick("usg-report")}
            onRightClick={() => handleButtonClick("usg-vid-img")}
            onCenterClick={() => handleButtonClick("entire")}
            onTopLeftClick={() => handleButtonClick("operative")}
            onBottomLeftClick={() => handleButtonClick("pre-operative")}
            onBottomClick={() => handleButtonClick("annotations")}
            onTopRightClick={() => {
              handleButtonClick("usg");
            }}
            goBack={() => history.push("/upload/partial")}
            onBottomRightClick={() => handleButtonClick("post-operative")}
            CenterSelected={isSelected("entire")}
            TopLeftSelected={isSelected("operative")}
            isLeftSelected={isSelected("usg-report")}
            isRightSelected={isSelected("usg-vid-img")}
            isRightClicked={clickedItems?.includes("usg-vid-img")}
            isLeftClicked={clickedItems?.includes("usg-report")}
            BottomLeftSelected={isSelected("pre-operative")}
            BottomSelected={isSelected("annotations")}
            TopRightSelected={isSelected("usg")}
            BottomRightSelected={isSelected("post-operative")}
            partialUpload={shouldShowPercentageOrNot()}
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
