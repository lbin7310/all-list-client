import React from "react";
import Team from "./Component/Team/Team";

class App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render () {
    return (
      <div>
        <Team />
      </div>
    )
  }
}

export default App;
