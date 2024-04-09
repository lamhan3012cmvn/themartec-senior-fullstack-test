import { CloudUploadOutlined } from "@ant-design/icons";
import { Upload, UploadProps } from "antd";
import { IUploadComponent } from "./UploadComponent.props";
import { useMemo } from "react";

const UploadComponent = (props: IUploadComponent) => {
  const { multiple = false, accept } = props || {};

  const handleBeforeUpload: UploadProps["beforeUpload"] = (files) => {
    if (props.onChangeFile) {
      props.onChangeFile(files);
    }

    return false;
  };

  const onRemove: UploadProps["onRemove"] = () => {
    if (props.onRemoveFile) props.onRemoveFile();
  };

  const acceptType = useMemo(() => {
    if (accept === "document") return ".pdf,.doc,.docx";
    if (accept === "image") return "image/*";
    return "";
  }, [accept]);

  return (
    <Upload.Dragger
      multiple={multiple}
      listType="picture"
      beforeUpload={handleBeforeUpload}
      // accept="image/*"
      accept={acceptType}
      maxCount={1}
      onRemove={onRemove}
    >
      <p className="ant-upload-drag-icon">
        <CloudUploadOutlined />
      </p>
      <p className="ant-upload-text">Click or drag and drop the file</p>
    </Upload.Dragger>
  );
};

export default UploadComponent;
