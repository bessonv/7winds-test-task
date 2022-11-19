import "./styles.sass";
import { AppContextProvider, IAppContext } from "./context/app.context";
import Table from "./components/Table/Table";
import SideBar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";

export default function App(): JSX.Element {
  return (
    <AppContextProvider data={[]} isFormOppend={false} isHidden={true}>
      <div>
        <Header />
        <main>
          <SideBar />
          <Table />
        </main>
      </div>
    </AppContextProvider>
  );
}
