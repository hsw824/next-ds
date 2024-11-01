import Label from "@ui/components/Label/Label";
import { StoryObj, Meta } from "@storybook/react";
const meta = {
  title: "Label",
  component: Label.Root,
} satisfies Meta<typeof Label.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Titled: Story = {
  args: {
    asChild: false,
    htmlFor: "food",
    children: "stories test",
  },
};
