import { Layout } from "./layout";
import { Navigation } from "./navigation/context";

function App() {
    return <Navigation outlet={Layout} />;
}

export default App;
