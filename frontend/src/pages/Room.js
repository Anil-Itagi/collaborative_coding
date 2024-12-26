import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = ({userName}) => {
  const { roomId } = useParams();
  
  const meeting = async (element) => {

    const appID = Number(process.env.REACT_APP_APP_ID_ZEGOCLOUD);
    const serverSecret = process.env.REACT_APP_SERVER_SECRET_ZEGOCLOUD;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      userName
    );
  
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  };
    
 
    return  <div
             ref={meeting}
      ></div>
   
};

export default Room;