"use client";
import React, { useState } from "react";

const WebChatOptions = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedPrivacyOption, setSelectedPrivacyOption] = useState("disable");

  const onLogin = () => {
    window.helpshiftConfig.userId = "captain_planet12";
    window.helpshiftConfig.userEmail = "captain@example.com";
    window.Helpshift("updateHelpshiftConfig");
    setIsLoggedIn(true);
  };

  const onLogout = () => {
    window.helpshiftConfig.userId = "";
    window.helpshiftConfig.userEmail = "";
    window.Helpshift("updateHelpshiftConfig");
    setIsLoggedIn(false);
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
            <div className="lex flex-col space-y-2 p-2">
              <form>
                <label className="inline-flex items-center mr-4">
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
                </label>
                <label className="inline-flex items-center">
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
                </label>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default WebChatOptions;
