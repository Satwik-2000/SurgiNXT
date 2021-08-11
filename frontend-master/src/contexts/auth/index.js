import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UploadContext } from "../upload";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  var count = [[], [], []]; //array to store the indexes of the items of each api group (refer to documentation)
  const buttons = ["pre_operative_data", "post_operative_data", "operative_video", "annotations", "usg_data"]

  

  async function uploadFile(id, caseId, clickedItems, upload_type, file, item) {
    console.log(id, caseId, clickedItems,upload_type, file, item);

    const formData = new FormData();
    formData.append("user_uuid", id);
    formData.append("case_id", caseId);
    formData.append("upload_type", upload_type);
    item.map((index) => {
      formData.append(`${clickedItems[index]}`, file[index]);
      //console.log(`${clickedItems[index]}`, file[index]);
    })
    axios
      .post(`${process.env.REACT_APP_API}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((e) => {
        console.log(e);
        //setCurrentUser(e.data);
      });
  }

  async function show(id, clickedItems, caseName, files, details) {
    //console.log(details);
    var upload_type = [];

    clickedItems.map((item) => {
      if (item === "zip") 
      {
        upload_type[0] = 0;
        count[0] =[0];
      }
      else if (
        item === "pre_operative_data" ||
        item === "post_operative_data" ||
        item === "operative_video"
      ) {
        count[0] = [...count[0], clickedItems.indexOf(item)];
        upload_type[0] = 1;
      } else if (item === "usg_report" || item === "usg_videos_images") {
        count[1] = [...count[1], clickedItems.indexOf(item)];
        upload_type[1] = 4;
      } else if (
        item === "segmented_video" ||
        item === "hand_drawn_annotations" ||
        item === "phase_annotation_video" ||
        item === "audio_description_of_video" ||
        item === "usg_annotations" ||
        item === "pre_operative_annotations" ||
        item === "post_operative_annotations"
      ) {
        count[2] = [...count[2], clickedItems.indexOf(item)];
        upload_type[2] = 6;
      }
    });

    var uploaded = false;
    if (details)
    {      
      buttons.map((item) => {
        if (details.case_details[item])
        uploaded = true;
      })
      

      if (uploaded)
      {
        count.map((item) => {
          if (item.length>0)
          uploadFile(id, details.case["case_id"],clickedItems, upload_type[count.indexOf(item)] , files, item);
          })
      }
    }
    else newCase(id, clickedItems, caseName, count, files, upload_type);
  }
  
  async function newCase(id, clickedItems, caseName, count, files, upload_type){
    axios
      .post(
        `${process.env.REACT_APP_API}/users/Registercase`,
        {
          user_uuid: id,
          case_name_entered_by_user: caseName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((e) => {
        console.log(e);
        if(e.data["data"] === "Case Name already exist please give a new name") alert("Case name already exists. Please enter a new name")
        
        else{
          count.map((item) => {
            if (item.length>0)
            uploadFile(id, e.data.data["case_id"],clickedItems, upload_type[count.indexOf(item)] , files, item);
          })
        }
        
      });
      
  }

  async function register(email, password, firstname, lastname) {
    axios
      .post("http://203.110.240.168/api/surginxt/user/registration", {
        email: email,
        password: password,
        first_name: firstname,
        last_name: lastname,
      })
      .then((e) => {
        console.log("AXIOS:", e);
        // localStorage.setItem("auth_token", e.data?.token);
        // localStorage.setItem("user_id", e.data?.id);
        console.log(e.config.data);
      });
  }

  async function login(email, password) {
    axios
      .post(process.env.REACT_APP_API + "/login", {
        email: email,
        password: password,
      })
      .then((e) => {
        console.log("AXIOS:", e);
        localStorage.setItem("auth_token", e.data?.token);
        localStorage.setItem("user_id", e.data?.id);
        setCurrentUser(e.data);
        console.log(currentUser);
      });
  }
  
  

  async function logout() {}

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged((user) => {
    // setCurrentUser();
    if (currentUser === null && loading) {
      checkLogin();
    }

    // });

    // return unsubscribe;
  }, []);

  const checkLogin = async () => {
    if (
      localStorage.getItem("auth_token") !== null &&
      localStorage.getItem("user_id") !== null
    ) {
      axios
        .get(
          `${process.env.REACT_APP_API}/users/${localStorage.getItem(
            "user_id"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        )
        .then((e) => {
          console.log(e.data);
          setCurrentUser(e.data);
        });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        login: login,
        register: register,
        show: show,
        uploadFile: uploadFile,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
