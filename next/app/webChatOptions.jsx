"use client";
import React from "react";

const WebChatOptions = () => {
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
        </div>
      </div>
    </>
  );
};

export default WebChatOptions;
