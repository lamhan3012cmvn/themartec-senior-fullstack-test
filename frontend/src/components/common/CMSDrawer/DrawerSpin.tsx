import { Spin } from "antd";

interface IProps {
  spinning?: boolean;
}

const DrawerSpinner = (props: IProps) => {
  return (
    <Spin
      size="large"
      style={{ position: "sticky", top: "50%", left: "50%" }}
      spinning={props.spinning}
    />
  );
};

export default DrawerSpinner;
