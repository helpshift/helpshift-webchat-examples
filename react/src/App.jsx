

function App() {

  const updateHelpshiftConfig=()=>{
    window.Helpshift("updateHelpshiftConfig");
  }

  return (
    <>
      <h1>Webchat demo</h1>
      <button onClick={updateHelpshiftConfig}>Update Helpshift Config</button>
    </>
  )
}

export default App
