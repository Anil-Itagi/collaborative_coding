import React, { useEffect } from 'react'
import { useState,useRef } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { useLocation ,useNavigate,Navigate,useParams} from 'react-router-dom';
import toast from 'react-hot-toast'
import axios from 'axios';
// import Contact from '../components/Contact';
import Room from './Room';


const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const EditorPage = () => {
  const { roomId } = useParams();
  const codeRef = useRef(null);
  //  const zpRef = useRef(null);

  const socketRef = useRef(null);
  const location = useLocation();
  const reactNavigate = useNavigate();
  const [clients,setClients] = useState([]);
  const [output, setOutput] = useState('');

    const runCode = async () => {
      const code = codeRef.current;
        try {
            const response = await axios.post(`${BASE_URL}/run-code`, { code });
            setOutput(response.data.result || 'No output');
        } catch (err) {
            setOutput(err.response?.data?.error || 'Error running code');
        }
    };
  
  const handleError = (err) => {
    console.log("socket error", err);
    toast.error('socket connection failed, try again later.')
    reactNavigate('/')
  }

  useEffect(() => {
    const init = async () => {
      try {
        // Initialize the socket connection
          socketRef.current = await initSocket();
          socketRef.current.on('connect', () => {
          console.log('WebSocket connected to server');
         
        });
        // Add socket error listeners
        
        // socketRef.current.on('connect_error', handleError);
        // socketRef.current.on('connect_failed', handleError);
    
        // Add a listener for disconnect events
        socketRef.current.on('disconnect', (reason) => {
          console.log('Disconnected from server:', reason);
        });


        // listening for the joined events 
      socketRef.current.on(ACTIONS.JOINED, ({ clients, userName, socketId }) => {
      if (userName !== location.state?.userName)
      {
        toast.success(`${userName} joined the room`)
        console.log(`${userName} joined the room`);
        }

        const uniqueClients= Array.from(
        new Map(clients.map(item => [item.userName, item])).values()
        );
        
        setClients(uniqueClients);
        
           socketRef.current.emit(ACTIONS.SYNC_CODE, {
           code: codeRef.current,
           socketId,
        })
        
       
      })
        
        //listening for the disconnection
        socketRef.current.on(ACTIONS.DISCONNECTED, ({socketId,userName}) => {
          toast.success(`${userName} left the room `);
          setClients((prev) => {
            return prev.filter((client)=>client.socketId!==socketId)
          })
        })

        //  Emit join event if required
        //console.log(location.state?.userName);
        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          userName: location.state?.userName,
        });
      } catch (error) {
        console.error('Error initializing socket:', error);
      }
    };

    init();

    //listeing for joined events
    

   // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
              //socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);

        socketRef.current = null;
      }
    };
  }, []);


  if (!location.state) {
     <Navigate to="/"/>
  }
 
  //copy room id function

  const copyRoomId = async() => {
    try {
      await navigator.clipboard.writeText(roomId)
      toast.success('Room ID has been copied to your clipboard')
    } catch (error) {
      toast.error('Could not copy room ID');
      console.log('Could not copy room ID');
    }
  }

  
  const leaveRoom = () => {
    reactNavigate('/');
    //stopMeeting();
    window.location.reload();
  }

  
  return (
    <div className='mainWrap'>
      <div className='aside'>
        <div className='asideInner'>
          <div className="logo">
            <img className='logoImage' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9idCOG8NjycbP7CZ-DbFWXQkrbQxaeSodGA&s" alt="logo" />
          </div>
          <h1>Connected</h1>
          <div className='clientList'>
            {
              clients.map((client) =>
                <Client key={client.socketId} userName={client.userName} />)
            }
          </div>
        </div>
        <button className="btn copyBtn" onClick={copyRoomId}>Copy ROOM ID</button>
        <button className="btn leaveBtn" onClick={leaveRoom}>Leave</button>
        
      </div>

      
      <div className="editor grid">
        <div className="g-col-12">  
                 <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code) => { codeRef.current = code }} />  
        </div>
       
       
        <div className="container1">
          <div className="g-col-12 above">
            <Room userName={location.state?.userName} />
        </div>
      </div>
</div>
   
    
      
     
        <div className="runner">
              <button className="btn runBtn" onClick={runCode}>RUN</button>    
             {output}
         </div>
      <div>
       
      </div>
        
    </div>
  )
}

export default EditorPage