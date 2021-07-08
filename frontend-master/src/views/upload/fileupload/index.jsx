import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import { FileFolderIcon, UploadIcon } from "../../../assets";
import { FileDrop } from "react-file-drop";

import "./style.scss";

export default function FileUploadModal({
  isOpen,
  closeCallback,
  uploadCallback,
}) {
  const history = useHistory();
  const fileInputRef = useRef(null);

  const onFileInputChange = (event) => {
    const { files } = event.target;
    // do something with your files...
  };

  const onTargetClick = () => {
    fileInputRef.current.click();
  }; 

  const handleCancel = () => {
    closeCallback();
  };

  const handleUpload = () => {
    uploadCallback();
  };

  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          background: "white",
        },
      }}
      contentLabel="File Upload"
      className="file__upload__modal"
    >
      <img src={FileFolderIcon} alt="File Icon" className="file__icon" />

      <h2 className="title">Upload Compressed Case File</h2>
      <h4 className="subtitle">Drag and drop your files here</h4>

      <FileDrop onTargetClick={onTargetClick}>
        <img src={UploadIcon} alt="Upload Icon" className="upload__icon" />
        <div className="upload__title">.ZIP</div>
        <div className="upload__subtitle">You can also upload file by</div>

        <div className="browse__btn">Browse</div>
      </FileDrop>

      <div className="file__actions">
        <button className="cancel__btn" onClick={handleCancel}>
          Cancel
        </button>
        <button className="upload__btn" onClick={handleUpload}>
          Upload
        </button>
      </div>
      <input
        onChange={onFileInputChange}
        ref={fileInputRef}
        type="file"
        className="hidden"
      />
    </Modal>
  );
}
