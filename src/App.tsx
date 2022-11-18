import "./styles.sass";
import { AppContextProvider, IAppContext } from "./context/app.context";
import Table from "./components/Table/Table";

export default function App(): JSX.Element {
  return (
    <AppContextProvider data={[]} isFormOppend={false}>
      <div>
        <header>header</header>
        <div>sidebar</div>
        <Table />
      </div>
    </AppContextProvider>
  );
}
