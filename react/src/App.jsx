import { useState, useCallback, useEffect } from "react";

function App() {
  const [position, setPosition] = useState("bottom-right");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedPrivacyOption, setSelectedPrivacyOption] = useState("disable");
  const [selectedFullScreenOption, setSelectedFullScreenOption] =
    useState("exitFullScreen");

  const [selectedLauncherOption, setSelectedLauncherOption] =
    useState("showLauncher");

  const [unreadMessageCount, setMessageUnreadCount] = useState(0);
  useState(false);

  const [message, setMessage] = useState("");
  const [messageEventListenerIsAdded, setmessageEventListenerIsAdded] =
    useState(false);

  const onUpdateHelpshiftConfig = () => {
    window.Helpshift("updateHelpshiftConfig");
  };

  useEffect(() => {
    const newInterval = setInterval(() => {
      setMessage("");
    }, 3000);

    return () => clearInterval(newInterval);
  }, [message]);

  const onHandleFullPrivacyChange = (e) => {
    const val = e.target.value;
    setSelectedPrivacyOption(val);
    if (val === "enable") {
      window.helpshiftConfig.fullPrivacy = true;
    } else {
      window.helpshiftConfig.fullPrivacy = false;
    }
    onUpdateHelpshiftConfig();
  };

  const onHandleLogin = () => {
    window.helpshiftConfig.userId = "captain_planet12";
    window.helpshiftConfig.userEmail = "captain@example.com";
    onUpdateHelpshiftConfig();
    setIsLoggedIn(true);
  };

  const onHandleLogout = () => {
    window.helpshiftConfig.userId = "";
    window.helpshiftConfig.userEmail = "";
    onUpdateHelpshiftConfig();
    setIsLoggedIn(false);
  };

  const onHandleLauncherChange = (e) => {
    const val = e.target.value;
    if (val == "showLauncher") {
      window.Helpshift("show");
      setSelectedLauncherOption("showLauncher");
    } else {
      window.Helpshift("hide");
      setSelectedLauncherOption("hideLauncher");
    }
  };

  const onChangeWidgetPosition = (e) => {
    const value = e.target.value;
    setPosition(value);
  };

  const onWidgetPositionApply = () => {
    window.helpshiftConfig.widgetOptions.position = position;
    onUpdateHelpshiftConfig();
  };

  const onHandleFullScreenChange = (e) => {
    const val = e.target.value;
    setSelectedFullScreenOption(val);
    if (val === "exitFullScreen") {
      window.helpshiftConfig.widgetOptions.fullScreen = false;
    } else {
      window.helpshiftConfig.widgetOptions.fullScreen = true;
    }

    onUpdateHelpshiftConfig();
  };

  useEffect(() => {
    const newUnreadMessagesEventHandler = function (data) {
      setMessageUnreadCount(data.unreadCount);
    };

    window.Helpshift(
      "addEventListener",
      "newUnreadMessages",
      newUnreadMessagesEventHandler
    );

    return () => {
      window.Helpshift(
        "removeEventListener",
        "newUnreadMessages",
        newUnreadMessagesEventHandler
      );
    };
  }, []);

  const messageAddEventHandler = useCallback((data) => {
    setMessage(data.body);
  }, []);

  const onAddMessageEventClick = () => {
    window.Helpshift("addEventListener", "messageAdd", messageAddEventHandler);
    setmessageEventListenerIsAdded(true);
  };

  const onRemoveMessageEventClick = () => {
    window.Helpshift(
      "removeEventListener",
      "messageAdd",
      messageAddEventHandler
    );
    setmessageEventListenerIsAdded(false);
    setMessage("");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-5xl text-center">Web Chat</h1>

      <div className="w-full border-gray-300 mt-12 rounded-lg">
        <h3 className="py-2 pl-3 text-lg rounded-t-lg font-bold uppercase text-gray-800">
          Quick setup
        </h3>
        <div className="m-3">
          <div className="mt-2 flex justify-between">
            <h4 className="text-lg py-2">Update config</h4>
            <div>
              <button onClick={onUpdateHelpshiftConfig}>
                Update Helpshift Config
              </button>
            </div>
          </div>
          <div className="mt-2 flex justify-between">
            <h4 className="text-lg py-2">Login with helpshift</h4>
            <div>
              {isLoggedIn ? (
                <button onClick={onHandleLogout}>Logout</button>
              ) : (
                <button onClick={onHandleLogin}>Login</button>
              )}
            </div>
          </div>
          <div className="mt-2 flex justify-between">
            <h4 className="text-lg py-2">Full privacy</h4>
            <div className="lex flex-col space-y-2 p-2">
              <form>
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value={"enable"}
                    checked={selectedPrivacyOption === "enable"}
                    onChange={onHandleFullPrivacyChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  ></input>
                  <span className="ml-2 text-gray-700">Enable Full Privacy</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value={"disable"}
                    checked={selectedPrivacyOption === "disable"}
                    onChange={onHandleFullPrivacyChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  ></input>
                  <span className="ml-2 text-gray-700">Disable Full Privacy</span>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full   border-gray-300 mt-12 rounded-lg">
        <h3 className="py-2 pl-3 text-lg rounded-t-lg font-bold uppercase text-gray-800">
          Widget options
        </h3>
        <div className="m-3">
          <div className="mt-2 flex justify-between">
            <h4 className="text-lg py-2">Launcher Options</h4>
            <div className="lex flex-col space-y-2 p-2">
              <form>
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value={"showLauncher"}
                    checked={selectedLauncherOption === "showLauncher"}
                    onChange={onHandleLauncherChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  ></input>
                  <span className="ml-2 text-gray-700">Show</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value={"hideLauncher"}
                    checked={selectedLauncherOption === "hideLauncher"}
                    onChange={onHandleLauncherChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  ></input>
                  <span className="ml-2 text-gray-700">Hide</span>
                </label>
              </form>
            </div>
          </div>
          <div className="mt-3 flex justify-between">
            <h4 className="text-lg py-2">Select Position</h4>
            <div>
              <select
                className=" appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                value={position}
                onChange={onChangeWidgetPosition}
              >
                <option value="bottom-right">bottom-right</option>
                <option value="bottom-left">bottom-left</option>
                <option value="top-left">top-left</option>
                <option value="top-right">top-right</option>
              </select>

              <button className="ml-3" onClick={onWidgetPositionApply}>
                Apply
              </button>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <h4 className="text-lg py-2">Full screen mode</h4>
            <div className="lex flex-col space-y-2 p-2">
              <form>
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value={"enterFullScreen"}
                    checked={selectedFullScreenOption === "enterFullScreen"}
                    onChange={onHandleFullScreenChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  ></input>
                  <span className="ml-2 text-gray-700">Enter</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value={"exitFullScreen"}
                    checked={selectedFullScreenOption === "exitFullScreen"}
                    onChange={onHandleFullScreenChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  ></input>
                  <span className="ml-2 text-gray-700">Exit</span>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full   border-gray-300 mt-12 rounded-lg">
        <h3 className="py-2 pl-3 text-lg rounded-t-lg font-bold uppercase text-gray-800">
          Event handlers
        </h3>
        <div className="m-3">
          <div className="mt-4 flex justify-between">
            <h3 className="text-lg py-2">Unread Message Count</h3>
            <div className="mr-2 p-2">Count: {unreadMessageCount}</div>
          </div>

          <div className="mt-4 flex justify-between">
            <h3 className="text-lg py-2">Message add event</h3>
            <div>
              {messageEventListenerIsAdded ? (
                <button onClick={onRemoveMessageEventClick}>Remove</button>
              ) : (
                <button onClick={onAddMessageEventClick}>Add</button>
              )}
            </div>
          </div>
          <div>
            {messageEventListenerIsAdded && (
              <p>
                Message added is : <b>{message}</b>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
