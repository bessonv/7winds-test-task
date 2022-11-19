import "./styles.sass";
import { AppContextProvider, IAppContext } from "./context/app.context";
import Table from "./components/Table/Table";
import SideBar from "./components/Sidebar/Sidebar";

export default function App(): JSX.Element {
  return (
    <AppContextProvider data={[]} isFormOppend={false} isHidden={true}>
      <div>
        <header>header</header>
        <SideBar />
        <Table />
      </div>
    </AppContextProvider>
  );
}
