import { useRoutes } from "react-router-dom";
import DashboardLayoutBasic from "./layouts/layout"; // or ./layouts/DashboardLayoutBasic
import AddNotes from "./pages/addNote";
import NoteForm from "./pages/addNote";
import NoteCard from "./components/noteCard";
import ViewNotes from "./pages/viewNotes";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <DashboardLayoutBasic />,
      children: [
        {
          path: "addNotes",
          element: <NoteForm />,
        },
        {
          path:"viewNotes",
          element:<ViewNotes/>
        }
      ],
    },
  ]);

  return routes;
}

export default App;
