import { Tag } from "antd";
import { Typography } from "antd";
const { Paragraph } = Typography;

export const articleListColumns = [
  {
    title: "ID",
    dataIndex: "id",
    sorter: {
      multiple: 2,
    },
  },
  {
    title: "Name",
    render: (record: any) => (
      <Paragraph
        ellipsis={{
          rows: 4,
        }}
      >
        {record?.name}
      </Paragraph>
    ),
    sorter: {
      multiple: 3,
    },
  },
  {
    title: "Category",
    dataIndex: "category",
    render: (record: any) => record?.name,
  },
  {
    title: "Tags",
    dataIndex: "tags",
    render: (tags: Array<string>) => {
      return (
        <>
          {(tags || []).map((tag: string) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      );
    },
    sorter: {
      multiple: 3,
    },
  },
  {
    title: "Views",
    dataIndex: "views",
    sorter: {
      multiple: 3,
    },
  },
  {
    title: "SEO Title",
    render: (record: any) => (
      <Paragraph
        ellipsis={{
          rows: 4,
        }}
      >
        {record?.seoTitle}
      </Paragraph>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text: string) => <Tag color="magenta">{text}</Tag>,
  },
  {
    title: "Author",
    dataIndex: "createdBy",
  },
];
