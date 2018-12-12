import React from "react";
import { render } from "react-dom";
import Interval from "react-interval";

import Intersection from "./states/intersection";
import TrafficLight from "./components/traffic-light";
import Pedestrian from "./components/pedestrian";

import { Store, create, valueOf } from "microstates";

import "./style.css";

let initial = create(Intersection, {
  pedestrian: { activity: "standing" },
  light: { color: "red", timer: 3 }
});

class App extends React.Component {
  state = {
    $: Store(initial, $ => this.setState({ $ }))
  };

  render() {
    let intersection = this.state.$;

    return (
      <>
        <Interval enabled timeout={1000} callback={intersection.tick} />
        <main>
          <TrafficLight light={intersection.light} />
          <Pedestrian pedestrian={intersection.pedestrian} />
        </main>
        <footer>
          {JSON.stringify(valueOf(intersection), undefined, 2)}
        </footer>
      </>
    );
  }
}
render(<App />, document.getElementById("root"));
