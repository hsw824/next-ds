import { ReactNode, forwardRef } from 'react';
import { Primitive } from '../Primitive';

interface ComponentTypes extends React.LabelHTMLAttributes<HTMLLabelElement> {
  asChild?: boolean;
  children: ReactNode;
}

const LabelRoot = forwardRef<HTMLLabelElement, ComponentTypes>(({ asChild = false, children, ...props }, ref) => {
  return (
    <Primitive.label ref={ref} {...props}>
      {children}
    </Primitive.label>
  );
});

const Label = {
  Root: LabelRoot,
};

export default Label;
