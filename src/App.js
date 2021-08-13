import Container from "./styles/Container";
import Global from "./styles/Global";
import Download from "./components/Download";

function App() {
  return (
    <>
      <Global />
      <Container>
        <Download />
      </Container>
    </>
  );
}

export default App;
