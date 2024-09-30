import { ReactNode } from 'react';

interface ComponentTypes extends React.LabelHTMLAttributes<HTMLLabelElement> {
  asChild?: boolean;
  children: ReactNode;
}

const LabelRoot = ({ asChild = false, children, ...props }: ComponentTypes) => {
  return <label {...props}>{children}</label>;
};

const Label = {
  Root: LabelRoot,
};

export default Label;
