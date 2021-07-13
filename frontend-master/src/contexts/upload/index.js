import React from "react";
import axios from "axios";

import { useState, createContext } from "react";

export const UploadContext = createContext();

export const UploadContextProvider = (props) => {
  const [clickedItems, setClickedItems] = useState([]);
  const [caseNumber, setCaseNumber] = useState("");

  return (
    <UploadContext.Provider
      value={{
        clickedItems: [clickedItems, setClickedItems],
        caseNumber: [caseNumber, setCaseNumber],
      }}
    >
      {props.children}
    </UploadContext.Provider>
  );
};

export default UploadContextProvider;
