import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UploadContext } from "../../../../contexts";
import { UploadPartialButton } from "../../buttons";
import FileUploadModal from "../../fileupload";
import { AuthContext } from "../../../../contexts";
import "./style.scss";
import axios from "axios";

export default function UploadPartialView() {
  const [caseNumber, setCaseNumber] = useContext(UploadContext).caseNumber;
  const currentUser = useContext(AuthContext).currentUser;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastClicked, setLastClicked] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const [clickWheelEnabled, setClickWheelEnabled] = useState(true);
  const [clickedItems, setClickedItems] =
    useContext(UploadContext).clickedItems;
  const [fileList, setFileList] = useContext(UploadContext).fileList;
  const [details, setDetails] = useContext(UploadContext).details;

  const handleButtonClick = (which) => {
    if (which === "usg") {
      history.push("/upload/usg");
    } else if (which === "annotations") history.push("/upload/annotations");
    else if (which === lastClicked) setLastClicked(null);
    else {
      setLastClicked(which);
      setIsModalOpen(true);
    }
  };

  const isSelected = (id) => {
    //console.log(`isSelected : ${id}  :  ${clickedItems}`);
    if (clickedItems?.length > 0 && clickedItems?.includes(id)) return true;
    else if (id === "usg" && clickedItems?.includes("usg_report") && clickedItems?.includes("usg_videos_images")) return true;
    
    // else if (lastClicked === id) return true;

    return false;
  };
  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleUploadCallback = (file) => {
    if (lastClicked === "entire") {
      history.push({ pathname: "/upload/success", component: file });
    } else {
      setClickedItems([...clickedItems, lastClicked]);
      setIsModalOpen(false);
      setFileList([...fileList, file]);
      history.push({ pathname: "/upload/partial" });
    }
  };

  useEffect(() => {
    if (caseNumber !== "") setClickWheelEnabled(true);
  }, [caseNumber]);

  useEffect(() => {
    check();
    
  }, []);

  const isUploaded = (item) => {
    if (details)
    {
      //console.log(details);
      if (details.case_details[item]) return true
      else return false
    } 
  }

  const check = () => {
    if (location.component) {
      console.log(location.component["case_id"]);
      setCaseNumber(location.component["case_name_entered_by_user"]);

      axios
        .post(
          "http://203.110.240.168/api/surginxt/casedetailsforuser",
          {
            user_uuid: currentUser.UserDetails["id"],
            case_id: location.component["case_id"],
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        )
        .then((e) => {
          //console.log(e.data);
          setDetails(e.data);
        });
        
    }
  };

  //console.log(details);

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
          <UploadPartialButton
            id={currentUser.UserDetails["id"]}
            caseName={caseNumber}
            files={fileList}
            clickedItems={clickedItems}
            onCenterClick={() => handleButtonClick("entire")}
            onTopLeftClick={() => handleButtonClick("operative_video")}
            onBottomLeftClick={() => handleButtonClick("pre_operative_data")}
            onBottomClick={() => handleButtonClick("annotations")}
            onTopRightClick={() => handleButtonClick("usg")}
            onBottomRightClick={() => handleButtonClick("post_operative_data")}
            CenterSelected={isSelected("entire")}
            TopLeftSelected={isSelected("operative_video")}
            BottomLeftSelected={isSelected("pre_operative_data")}
            BottomSelected={isSelected("annotations")}
            TopRightSelected={isSelected("usg")}
            BottomRightSelected={isSelected("post_operative_data")}
            TopLeftUploaded = {isUploaded("operative_video")}
            BottomLeftUploaded = {isUploaded("pre_operative_data")}
            BottomUploaded = {isUploaded("annotations")}
            TopRightUploaded = {isUploaded("usg_data")}
            BottomRightUploaded = {isUploaded("post_operative_data")}
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
        uploadCallback={handleUploadCallback}
      />
    </>
  );
}
