import { useState, useCallback } from "react";

function App() {
  const [position, setPosition] = useState("bottom-right");

  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadCountEventListenerAdded, setunreadCountIsEventListenerAdded] =
    useState(false);

  const [message,setMessage] = useState("");
  const [messageEventListenerAdded,setmessageEventListenerAdded] = useState(false);

  const updateHelpshiftConfig = () => {
    window.Helpshift("updateHelpshiftConfig");
  };

  const enablePrivacy = () => {
    window.helpshiftConfig.fullPrivacy = true;
    updateHelpshiftConfig();
  };

  const disablePrivacy = () => {
    window.helpshiftConfig.fullPrivacy = false;
    updateHelpshiftConfig();
  };

  const handleLogin = () => {
    window.helpshiftConfig.userId = "captain_planet";
    window.helpshiftConfig.userEmail = "captain@example.com";
    updateHelpshiftConfig();
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setPosition(value);
  };

  const handleWidgetPosition = () => {
    window.helpshiftConfig.widgetOptions.position = position;
    updateHelpshiftConfig();
  };

  const enterFullScreen = () => {
    window.helpshiftConfig.widgetOptions.fullScreen = true;
    updateHelpshiftConfig();
  };

  const newUnreadMessagesEventHandler = useCallback((data) => {
    setUnreadCount(data.unreadCount);
  }, []);


  const addMessageCountEvent = () => {
    window.Helpshift(
      "addEventListener",
      "newUnreadMessages",
      newUnreadMessagesEventHandler
    );
    setunreadCountIsEventListenerAdded(true);
  };

  const removeMessageCountEvent = () => {
    window.Helpshift(
      "removeEventListener",
      "newUnreadMessages",
      newUnreadMessagesEventHandler
    );
    setunreadCountIsEventListenerAdded(false);
  };

  var messageAddEventHandler = useCallback( (data) =>{
    setMessage(data.body);
  },[]);

  const addMessageEvent=()=>{
    window.Helpshift("addEventListener", "messageAdd", messageAddEventHandler);
    setmessageEventListenerAdded(true);
  }

  const removeMessageEvent=()=>{
    window.Helpshift("removeEventListener", "messageAdd", messageAddEventHandler);
    setmessageEventListenerAdded(false);
  }

  return (
    <>
      <h1>Webchat demo</h1>
      <button onClick={updateHelpshiftConfig}>Update Helpshift Config</button>

      <div>
        <h3>Login with helpshift</h3>
        <button onClick={handleLogin}>Login</button>
      </div>

      <div>
        <h3>Privacy Options</h3>
        <button onClick={enablePrivacy}>Enable Privacy</button>
        <button onClick={disablePrivacy}>Disable Privacy</button>
      </div>

      <div>
        <h3>Widget options</h3>
        <ul>
          <li>
            <div>
              <h5>Launcher Options</h5>
              <button onClick={() => window.Helpshift("show")}>
                Show launcher
              </button>
              <button onClick={() => window.Helpshift("hide")}>
                Hide launcher
              </button>
            </div>
          </li>
          <li>
            <div>
              <h4>Select Position</h4>
              <select value={position} onChange={onChangeHandler}>
                <option value="bottom-right">bottom-right</option>
                <option value="bottom-left">bottom-left</option>
                <option value="top-left">top-left</option>
                <option value="top-right">top-right</option>
              </select>
              <button onClick={handleWidgetPosition}>Apply</button>
            </div>
          </li>
          <li>
            <div>
              <h5>Fullscreen Mode</h5>
              <button onClick={enterFullScreen}>Enter full screen</button>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <h3>Unread Message Count</h3>
        <button onClick={addMessageCountEvent}>
          Set unread message count event
        </button>
        <button onClick={removeMessageCountEvent}>
          Unset unread message count event
        </button>

        {unreadCountEventListenerAdded && (
          <>
            <h4>Event added. Unread message count is : {unreadCount}</h4>
          </>
        )}
      </div>

      <div>
        <h3>Message add event</h3>
        <button onClick={addMessageEvent}>
          Set message add event
        </button>
        <button onClick={removeMessageEvent}>
          Unset message add event
        </button>
        {messageEventListenerAdded && (<p>Message added is : <b>{message}</b></p>)}
      </div>
    </>
  );
}

export default App;
