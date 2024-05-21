import { useState } from "react";

function App() {
  const [position, setPosition] = useState("bottom-right");

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
    </>
  );
}

export default App;
