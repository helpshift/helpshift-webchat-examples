function App() {
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

  return (
    <>
      <h1>Webchat demo</h1>
      <button onClick={updateHelpshiftConfig}>Update Helpshift Config</button>
      <div>
        <h3>Privacy Options</h3>
        <button onClick={enablePrivacy}>Enable Privacy</button>
        <button onClick={disablePrivacy}>Disable Privacy</button>
      </div>
    </>
  );
}

export default App;
