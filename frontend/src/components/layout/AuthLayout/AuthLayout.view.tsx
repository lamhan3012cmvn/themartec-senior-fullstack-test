import { Col, Row, Typography } from "antd";
import { responsiveForm } from "~/configs/theme.config";
import { IAuthLayout } from "./AuthLayout.props";

const { Title } = Typography;
const AuthLayout = (props: IAuthLayout) => {
  return (
    <div className="h-screen">
      <Row className="w-full h-full">
        <Col {...responsiveForm.left}>
          <div className="flex items-center justify-center h-full bg-black">
            <Title level={1} style={{ color: "white" }}>
              CMS
            </Title>
          </div>
        </Col>
        <Col {...responsiveForm.right}>{props.children}</Col>
      </Row>
    </div>
  );
};

export default AuthLayout;
