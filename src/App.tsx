import "./styles.sass";
import { AppContextProvider, IAppContext } from "./context/app.context";
import Table from "./components/Table/Table";

const eID = {
  id: 21526,
  rowName: "31c13086-3da7-453b-9a2c-d2f26250d681"
};

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
