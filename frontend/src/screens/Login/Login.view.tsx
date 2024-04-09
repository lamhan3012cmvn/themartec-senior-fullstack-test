import { responsiveForm } from "~/configs/theme.config";
import { Col, Row, Typography } from "antd";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Form, FormField, FormMessage } from "~/components/ui/form";
import useLogin from "./Login.hook";
import { Input } from "~/components/ui/input";
import { Link } from "react-router-dom";
import { ROUTES } from "~/constants/routes.constant";
const { Title } = Typography;

const Login = () => {
  const { form, isLoading, onSubmit } = useLogin();

  return (
    <div className="w-full h-full">
      <Row justify="center" className="w-full h-full items-center">
        <Col span={20}>
          <Row justify="center" style={{ marginBottom: "30px" }}>
            <Col {...responsiveForm.icon}>
              <div className="flex justify-center">
                {/* <img
                  src={logo}
                  alt="logo"
                  className="w-full object-contain"
                  style={{maxWidth: '300px'}}
                /> */}
              </div>
            </Col>
          </Row>
          <Row justify="center">
            <Title style={{ textAlign: "center" }} level={4}>
              Login
            </Title>
          </Row>

          <Form {...form}>
            <form className="mt-16" onSubmit={onSubmit}>
              <div className="grid w-full items-center gap-1.5">
                <Label>Username</Label>
                <div>
                  <FormField
                    disabled={isLoading}
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <Input
                          type="text"
                          placeholder="Enter username"
                          {...field}
                        />
                        <FormMessage className="errorMessage" />
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="grid w-full items-center gap-1.5 mt-5">
                <Label>Password</Label>
                <div>
                  <FormField
                    disabled={isLoading}
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          {...field}
                        />
                        <FormMessage className="errorMessage" />
                      </>
                    )}
                  />
                </div>
              </div>
              <Button
                disabled={isLoading}
                isLoading={isLoading}
                className="w-full mt-8 !opacity-100"
              >
                {"Sign In"}
              </Button>
              <p className="text-xs text-center mt-3">
                  If don't have an account, please <Link to={ROUTES.REGISTER} className="font-bold text-primary">Register</Link>
              </p>
            </form>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
