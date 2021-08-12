import Container from "./styles/Container";
import Global from "./styles/Global";
import Canvas from "./components/Canvas";

function App() {
  return (
    <>
      <Global />
      <Container>
        <h1 style={{ margin: 0, padding: 5 }}>Drawing App</h1>
        <Canvas />
      </Container>
    </>
  );
}

export default App;
