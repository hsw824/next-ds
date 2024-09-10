import { ReactNode } from 'react';

interface ComponentTypes {
  asChild?: boolean;
  htmlFor: string;
  children: ReactNode;
  className?: string;
}

//TODO: asChild 추가하고, slot 컴포넌트 먼저 구성(const component = asChild ? 'label' : Slot)
const LabelRoot = ({ htmlFor, children, className }: ComponentTypes) => {
  return (
    <label className={className} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

const Label = {
  Root: LabelRoot,
};

export default Label;
