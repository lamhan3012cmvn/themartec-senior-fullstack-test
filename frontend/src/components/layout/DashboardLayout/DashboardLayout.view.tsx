import { Layout, theme } from "antd";
import UserLogged from "./UserLogged/UserLogged.view";
const { Header, Content } = Layout;

type Props = {
  children: any;
};

const DashboardLayout = (props: Props) => {
  const { children } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Layout className="site-layout">
        <Header
          className={"p-3 md:py-4 md:px-6 lg:py-5 lg:px-12"}
          style={{ background: colorBgContainer }}
        >
          <div className="flex justify-between items-center h-full">
            <div className="w-full flex justify-end items-center">
              <UserLogged />
            </div>
          </div>
        </Header>
        <Content>
          <div className="p-6">
            <div className="w-full bg-white p-5 rounded-md">{children}</div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
