import { Drawer } from "antd";
import DrawerSpinner from "./DrawerSpin";
import { ICMSDrawer } from "./CMSDrawer.props";
import { useCallback, useState } from "react";
import { Button } from "~/components/ui/button";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { VscCollapseAll } from "react-icons/vsc";

const CMSDrawer = ({
  visible,
  title = "",
  children,
  placement = "right",
  size = "large",
  onClose,
  extra = <></>,
  footer = null,
  width = 500,
  config = {},
  zIndex = 49,
  expandDefault = false,
}: ICMSDrawer) => {
  const [isExpand, setExpand] = useState(expandDefault);

  const toggleExpand = useCallback(() => {
    setExpand(!isExpand);
  }, [isExpand]);

  return (
    <Drawer
      title={
        <DrawerHeader
          isExpand={isExpand}
          title={title}
          onExpand={toggleExpand}
        />
      }
      placement={placement}
      closable={true}
      width={isExpand ? "100dvw" : width}
      size={size}
      open={visible}
      onClose={onClose}
      extra={extra as any}
      footer={footer as any}
      rootStyle={{ zIndex }}
      {...config}
    >
      {visible ? (children as any) : <DrawerSpinner />}
      <div
        className="h-[24px] bg-white absolute bottom-0 left-0"
        style={{ width: "calc(100% - 24px)" }}
      ></div>
    </Drawer>
  );
};

interface IDrawerHeader {
  isExpand: boolean;
  title: string;
  onExpand: () => void;
}
const DrawerHeader = (props: IDrawerHeader) => {
  return (
    <div className="flex justify-between gap-2 items-center">
      <p className="shrink-0">{props.title}</p>
      <div className="w-full flex justify-end">
        <Button onClick={props.onExpand} size={"sm"} variant={"ghost"}>
          {props.isExpand ? (
            <VscCollapseAll size={20} />
          ) : (
            <BsArrowsAngleExpand />
          )}
        </Button>
      </div>
    </div>
  );
};

export default CMSDrawer;
