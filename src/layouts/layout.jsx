import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import logo from "../assets/noteplus.png";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import demoTheme from "../theme/theme";
import NAVIGATION from "../routes/navigation";


export default function DashboardLayoutBasic() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const router = React.useMemo(() => {
    return {
      pathname: location.pathname,
      searchParams,
      navigate,
    };
  }, [location.pathname, searchParams, navigate]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
        title: (
          <span style={{ color: "black", fontWeight: 700 }}>NOTEPLUS</span>
        ),
        logo: <img src={logo} alt="NOTEPLUS" />,
      }}
    >
      <DashboardLayout disableCollapsibleSidebar={true}>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
