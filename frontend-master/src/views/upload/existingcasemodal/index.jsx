import React, { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-responsive-modal-scroll";
import { FileFolderIcon, UploadIcon } from "../../../assets";
import {ListGroup} from "react-bootstrap";
import { AuthContext } from "../../../contexts";
import axios from "axios";


import "./style.scss";

export default function ExistingCaseModal({
  isOpen,
  closeCallback,
  id,
}) {
  const history = useHistory();
  const [caseList, setCaseList] = useState([]);
  const [clicked, setClicked] = useState("")
  const currentUser = useContext(AuthContext).currentUser;

  const handleCancel = () => {
    closeCallback();
  };  

  function alertClicked() {
    axios.
    get("http://203.110.240.168/api/surginxt/allcasesforuser/" + currentUser.UserDetails["id"],
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

function go(event){
  console.log(caseList[event]);
    history.push({pathname: "/upload/partial", component: caseList[event]})
}


  

  return (
    <Modal
      open={isOpen}
      onClose = {handleCancel}
      style={{
        content: {
          background: "white",
        },
      }}
      contentLabel="File Upload"
      classNames={{modal: "existing__case__modal",}}
    >

      <h2 className="title">Existing Cases</h2>
      <br></br>

      <ListGroup onSelect = {go}>
          <ListGroup.Item action onClick = {alertClicked} >Show List</ListGroup.Item>
          {caseList.map((item) => <ListGroup.Item action eventKey = {caseList.indexOf(item)}>{item["case_name_entered_by_user"]}</ListGroup.Item>)}
      </ListGroup>
     
    </Modal>
  );
}
