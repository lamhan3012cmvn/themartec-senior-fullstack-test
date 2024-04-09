import { IPageHeader } from "./PageHeader.props";

const PageHeader = (props: IPageHeader) => {
  return (
    <div className="w-full mb-10 flex justify-between gap-5">
      <p className="text-h2 shrink-0">{props.title}</p>
      {props.children}
    </div>
  );
};

export default PageHeader;
