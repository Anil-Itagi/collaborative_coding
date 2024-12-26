import React, { useEffect,useRef} from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/lib/codemirror.css';
import ACTIONS from '../Actions';



const Editor = ({socketRef,roomId,onCodeChange}) => {

    const editorRef = useRef(null);
    useEffect(() => {
        async function init() {
                editorRef.current=CodeMirror.fromTextArea(document.getElementById('realTimeEditor'), {
                  mode: { name: 'javascript', json: true },
                  theme: 'dracula',
                  autoCloseTags: true,
                  autoCloseBrackets: true,
                  lineNumbers:true,
                })
          
            editorRef.current.on('change', (instance, changes) => {
            console.log('change', changes);
            const { origin } = changes;
            const code = instance.getValue();
            onCodeChange(code);
              if (origin !== 'setValue') {
              
              socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                roomId,
                code
              })
            }
            console.log(code);
          })


          //listening code change

          if (socketRef.current) {
            console.log("working code change");
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        }
        init();
    }, [])
  
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code != null) {
          editorRef.current.setValue(code);
        }
      })
    }
   
  
    return() => {
      if (socketRef.current) {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    }
   
  }
  },[socketRef.current])


  
  return <textarea  id="realTimeEditor"/>
}

export default Editor