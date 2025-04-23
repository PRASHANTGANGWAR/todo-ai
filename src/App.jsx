import { useRoutes, Navigate } from "react-router-dom";
import DashboardLayoutBasic from "./layouts/layout";
import NoteForm from "./pages/addNote";
import ViewNotes from "./pages/viewNotes";
import AIResultPage from "./pages/aiResult";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <DashboardLayoutBasic />,
      children: [
        {
          index: true,
          element: <Navigate to="addNotes" replace />,
        },
        {
          path: "addNotes",
          element: <NoteForm />,
        },
        {
          path: "viewNotes",
          element: <ViewNotes />,
        },
        {
          path: "ai-result",
          element: <AIResultPage />,
        },
      ],
    },
  ]);

  return routes;
}

export default App;
