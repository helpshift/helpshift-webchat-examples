// @NOTE: To use client components we have to use "use client" directive at top of file,
//  above the imports as shown below.

"use client";
import React, { useState, useEffect, useCallback } from "react";

const WebChatOptions = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedPrivacyOption, setSelectedPrivacyOption] = useState("disable");

  const [selectedLauncherOption, setSelectedLauncherOption] =
    useState("showLauncher");

  const [position, setPosition] = useState("bottom-right");

  const [selectedFullScreenOption, setSelectedFullScreenOption] =
    useState("exitFullScreen");

  const [unreadMessageCount, setMessageUnreadCount] = useState(0);

  const [message, setMessage] = useState("");
  const [messageEventListenerIsAdded, setmessageEventListenerIsAdded] =
    useState(false);

  const onLogin = () => {
    // @NOTE: You can update the data in config object using the below code.
    window.helpshiftConfig.userId = "captain_planet12";
    window.helpshiftConfig.userEmail = "captain@example.com";

    // @NOTE: If you want to update the helpshiftConfig object after your web page
    //  has loaded, you can do it by calling the following API.
    window.Helpshift("updateHelpshiftConfig");
    setIsLoggedIn(true);
    setMessage("");
  };

  const onLogout = () => {
    window.helpshiftConfig.userId = "";
    window.helpshiftConfig.userEmail = "";
    window.Helpshift("updateHelpshiftConfig");
    setIsLoggedIn(false);
    setMessage("");
  };

  const onFullPrivacyChange = (e) => {
    const val = e.target.value;
    setSelectedPrivacyOption(val);
    if (val === "enable") {
      window.helpshiftConfig.fullPrivacy = true;
    } else {
      window.helpshiftConfig.fullPrivacy = false;
    }
    window.Helpshift("updateHelpshiftConfig");
  };

  const onLauncherChange = (e) => {
    const val = e.target.value;
    if (val == "showLauncher") {
      // @NOTE: You can show Web Chat completely by calling the following API.
      window.Helpshift("show");
      setSelectedLauncherOption("showLauncher");
    } else {
      // @NOTE: You can hide Web Chat completely by calling the following API.
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
    window.Helpshift("updateHelpshiftConfig");
  };

  const onFullScreenChange = (e) => {
    const val = e.target.value;
    setSelectedFullScreenOption(val);
    if (val === "exitFullScreen") {
      window.helpshiftConfig.widgetOptions.fullScreen = false;
    } else {
      window.helpshiftConfig.widgetOptions.fullScreen = true;
    }

    window.Helpshift("updateHelpshiftConfig");
  };

  // @NOTE: In order to add an event to the window, you should add it
  // when the component mounts using the useEffect hook
  // and remove it when the component unmounts.

  // @NOTE: Do not call window.Helpshift("updateHelpshiftConfig") inside useEffect.
  //  This may lead to unknown side effects.
  useEffect(() => {
    // @NOTE: In order to add New Unread Messages event handler, add the following code.
    const newUnreadMessagesEventHandler = function (data) {
      setMessageUnreadCount(data.unreadCount);
    };

    window.Helpshift(
      "addEventListener",
      "newUnreadMessages",
      newUnreadMessagesEventHandler
    );

    // @NOTE: In order to remove New Unread Messages event handler, add the following code.
    return () => {
      window.Helpshift(
        "removeEventListener",
        "newUnreadMessages",
        newUnreadMessagesEventHandler
      );
    };
  }, []);

  // @NOTE: We do not recommend adding events dynamically (on button clicks)
  // because they will be reattached every time the component re-renders and can potentially lead to memory leaks.
  // Instead, we prefer to add them
  // when the component mounts, and remove them when the component unmounts

  // However, if you still want to start listening to events on some action, then this is the right way
  // You can do so by using use callback hook.

  // @NOTE: To add Message Add event handler, add the following code.
  // This event is triggered when the user adds a message to a conversation.

  const messageAddEventHandler = useCallback((data) => {
    setMessage(data.body);
  }, []);

  const onAddMessageEventClick = () => {
    window.Helpshift("addEventListener", "messageAdd", messageAddEventHandler);
    setmessageEventListenerIsAdded(true);
  };

  // @NOTE: In order to remove Message Add event handler, add the following code.
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
    <>
      <div className="w-full border-gray-300 mt-12 rounded-lg">
        <h3 className="py-2 pl-3 text-lg rounded-t-lg font-bold uppercase text-gray-800">
          Quick setup
        </h3>
        <div className="m-3">
          <div className="mt-2 flex justify-between">
            <h4 className="text-lg py-2">Update config</h4>
            <div>
              <button onClick={() => window.Helpshift("updateHelpshiftConfig")}>
                Update Helpshift Config
              </button>
            </div>
          </div>

          <div className="mt-2 flex justify-between">
            <h4 className="text-lg py-2">Login user</h4>
            <div>
              {isLoggedIn ? (
                <button onClick={onLogout}>Logout</button>
              ) : (
                <button onClick={onLogin}>Login</button>
              )}
            </div>
          </div>
          <div className="mt-2 flex justify-between">
            <h4 className="text-lg py-2">Full privacy</h4>
            <div className="flex flex-col space-y-2 p-2">
              <form>
                <div className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value={"enable"}
                    checked={selectedPrivacyOption === "enable"}
                    onChange={onFullPrivacyChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  ></input>
                  <span className="ml-2 text-gray-700">
                    Enable Full Privacy
                  </span>
                </div>
                <div className="inline-flex items-center">
                  <input
                    type="radio"
                    value={"disable"}
                    checked={selectedPrivacyOption === "disable"}
                    onChange={onFullPrivacyChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  ></input>
                  <span className="ml-2 text-gray-700">
                    Disable Full Privacy
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-gray-300 mt-12 rounded-lg">
        <h3 className="py-2 pl-3 text-lg rounded-t-lg font-bold uppercase text-gray-800">
          Widget options
        </h3>
        <div className="m-3">
          <div className="mt-2 flex justify-between">
            <h4 className="text-lg py-2">Launcher Options</h4>
            <div className="flex flex-col space-y-2 p-2">
              <form>
                <div className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value={"showLauncher"}
                    checked={selectedLauncherOption === "showLauncher"}
                    onChange={onLauncherChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  ></input>
                  <span className="ml-2 text-gray-700">Show</span>
                </div>
                <div className="inline-flex items-center">
                  <input
                    type="radio"
                    value={"hideLauncher"}
                    checked={selectedLauncherOption === "hideLauncher"}
                    onChange={onLauncherChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  ></input>
                  <span className="ml-2 text-gray-700">Hide</span>
                </div>
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
            <div className="flex flex-col space-y-2 p-2">
              <form>
                <div className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value={"enterFullScreen"}
                    checked={selectedFullScreenOption === "enterFullScreen"}
                    onChange={onFullScreenChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  ></input>
                  <span className="ml-2 text-gray-700">Enter</span>
                </div>
                <div className="inline-flex items-center">
                  <input
                    type="radio"
                    value={"exitFullScreen"}
                    checked={selectedFullScreenOption === "exitFullScreen"}
                    onChange={onFullScreenChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  ></input>
                  <span className="ml-2 text-gray-700">Exit</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-gray-300 mt-12 rounded-lg">
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
    </>
  );
};

export default WebChatOptions;
