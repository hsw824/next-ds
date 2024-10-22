import TabMenuContainer from "../../../packages/ui/src/components/TabMenu/index";
import { StoryObj, Meta } from "@storybook/react";

interface TabMenuContainerProps {
  data: Array<{
    id: number;
    title: string;
    description: string | React.ReactNode;
  }>;
}

const SampleComponent1 = () => (
  <div>
    <h2>컴포넌트 입니다.</h2>
    <p>content가 컴포넌트입니다.</p>
  </div>
);

const SampleComponent2 = () => (
  <div style={{ width: "100%", height: "100%", backgroundColor: "aliceblue" }}>
    <h2>컴포넌트 입니다.</h2>
    <p>content가 컴포넌트입니다. 스타일을 적용했습니다.</p>
  </div>
);

const basicData = [
  { id: 1, title: "1", description: "가" },
  { id: 2, title: "2", description: "나" },
  { id: 3, title: "3", description: "다" },
  { id: 4, title: "4", description: "라" },
  { id: 5, title: "5", description: "마" },
];

const componentContentData = [
  { id: 1, title: "1", description: <SampleComponent1 /> },
  { id: 2, title: "2", description: <SampleComponent2 /> },
];

const meta = {
  title: "TabMenus",
  component: TabMenuContainer,
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: "tab data",
      control: "object",
    },
  },
} satisfies Meta<typeof TabMenuContainer>;

export default meta;

type Story = StoryObj<typeof TabMenuContainer>;

const Template: Story = {
  render: (args: TabMenuContainerProps) => (
    <TabMenuContainer {...args}>
      <TabMenuContainer.TabButtons>
        {args.data.map((item) => (
          <TabMenuContainer.TabButton
            key={item.id}
            id={item.id}
            title={item.title}
          />
        ))}
      </TabMenuContainer.TabButtons>
      <TabMenuContainer.TabContent />
    </TabMenuContainer>
  ),
};

export const Default: Story = {
  ...Template,
  args: {
    data: basicData,
  },
};

export const WithComponentContent: Story = {
  ...Template,
  args: {
    data: componentContentData,
  },
};
