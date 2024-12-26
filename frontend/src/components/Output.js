import React,{useState} from 'react'
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const Output = ({code}) => {
    const [output, setOutput] = useState('');

    const runCode = async () => {
        console.log(code);
        try {
            const response = await axios.post(`${BASE_URL}/run-code`, {code  });
            setOutput(response.data.result || 'No output');
        } catch (err) {
            setOutput(err.response?.data?.error || 'Error running code');
        }
    };
  return (
      <div>
              {output}
          <button className="btn runBtn" onClick={runCode}>Leave</button>
          <div className='video'>
              
          </div>
    </div>
  )
}

export default Output