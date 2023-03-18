import { Disc } from "./components/Disc";
import { Icon } from "./components/Icon";

const App = () => {
  return (
    <h1 className="text-lg font-bold">
      Hello world
      <Icon name="suggestions" />
      <Disc color="sky" />
    </h1>
  );
};

export default App;
