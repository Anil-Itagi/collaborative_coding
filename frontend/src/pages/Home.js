import React, {   useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

import {useNavigate} from 'react-router-dom'
const Home = () => {

   
    // const history = useHistory();
    const [roomId, setRoomId] = useState("");
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidv4();
        setRoomId(id);
        toast.success('Created a new room');
        
    }
    const joinRoom = () => {
        if (!roomId || !userName)
        {
            toast.error("Room ID & Username is required");
            return;
        }
        //redirect to room 
        
      
        navigate(`/editor/${roomId}`, {
            state: {
                userName,
                roomId
                
            }
        })
    }

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
       }
    }  
  return (
     <div className="homePage d-flex flex-column justify-content-center align-items-center vh-110" style={{backgroundColor:"#FDE49E"}}>

    
    <div className="form bg-white p-5 rounded shadow-lg">
        <h4 className="label mb-4 text-center">Create or Join Room</h4>
        
        <div className="input">
            {/* ROOM ID Input */}
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control input-box" 
                    placeholder="ROOM ID" 
                    value={roomId} 
                    onChange={(e) => setRoomId(e.target.value)} 
                    onKeyUp={handleInputEnter} 
                />
            </div>
            
            {/* USER NAME Input */}
            <div className="mb-4">
                <input 
                    type="text" 
                    className="form-control input-box" 
                    placeholder="USER NAME" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                    onKeyUp={handleInputEnter} 
                />
            </div>

            {/* Join Button */}
            <div className="text-center">
                <button className="btn bg-success btn-lg" onClick={joinRoom} style={{width:"100%"}}>
                    Join
                </button>
            </div>

            {/* Create Room Info */}
            <div className="mt-3 text-center">
                <span className="createIfo">
                    Don't have an invite, create ? &nbsp;
                    <a href="#" className="createNewBtn" onClick={createNewRoom}>New room</a>
                </span>
            </div>
        </div>
    </div>

    {/* Footer */}
    <footer className="footer mt-5 text-center">
        <p>Built by ANI </p>
    </footer>
</div>

  )
}

export default Home