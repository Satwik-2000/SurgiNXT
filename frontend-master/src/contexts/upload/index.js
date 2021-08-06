import React from "react";
import axios from "axios";

import { useState, createContext } from "react";

export const UploadContext = createContext();

export const UploadContextProvider = (props) => {
  const [clickedItems, setClickedItems] = useState([]);
  const [caseNumber, setCaseNumber] = useState("");
  const [fileList, setFileList] = useState([]);
  const [caseList, setCaseList] = useState([]);
  const [details, setDetails] = useState(null);

  function existingCaseList() {
    axios.
    get("http://203.110.240.168/api/surginxt/allcasesforuser/437a0823-0029-466b-a4ee-62249267d070",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })
    .then((e) => {
        //e.data.map((item) => setCaseList([...caseList, item["case_name_entered_by_user"]]))
        setCaseList(e.data)
    })
    //history.push("/upload/partial");
}


  return (
    <UploadContext.Provider
      value={{
        clickedItems: [clickedItems, setClickedItems],
        caseNumber: [caseNumber, setCaseNumber],
        fileList: [fileList, setFileList],
        caseList: caseList,
        existingCaseList: existingCaseList,
        details: [details, setDetails],
      }}
    >
      {props.children}
    </UploadContext.Provider>
  );
};

export default UploadContextProvider;
