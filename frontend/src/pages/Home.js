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
      <div className='homePage'>
        
          Home page
          <div className="form">
              <h4 className='label'>Create a Room</h4>
              <div className='input'>
               
                  <input type="text" className="input-box" placeholder='ROOM ID' value={roomId} onChange={(e)=> setRoomId(e.target.value)} onKeyUp={handleInputEnter}/>
                  <input type="text" className="input-box" placeholder='USER NAME' value={userName} onChange={(e)=> setUserName(e.target.value)} onKeyUp={handleInputEnter} />
                  <button className='btn joinBtn' onClick={joinRoom}>Join</button>
                  <span className="createIfo">
                      If you don't have an invite then create &nbsp; <a href="#" className='createNewBtn' onClick={createNewRoom}>New room</a>
                  </span>
              </div>
          </div>
          <footer className='footer'>
              Built by ANI <a href="#">Contact</a>
          </footer>
      </div>
  )
}

export default Home