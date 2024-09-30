import React from 'react';
import Slottable, { SlottableProps } from './Slottable';

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export type AsChildProps<T> = T & {
  asChild?: boolean;
};

const Slot = ({ children, ...props }: SlotProps) => {
  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray.find((child) => {
    return React.isValidElement(child) && child.type === Slottable;
  }) as React.ReactElement<SlottableProps>;

  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child !== slottable) return child;

      if (React.isValidElement(newElement)) {
        return newElement.props.children;
      } else {
        console.warn('Slot component should have only one React element as a child');
      }
      return null;
    });
    return React.isValidElement(newElement)
      ? React.cloneElement(
          newElement,
          {
            ...props,
            ...newElement.props,
          },
          newChildren,
        )
      : null;
  }

  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
    });
  }

  console.warn('Slot component should have only one React element as a child');
  return null;
};

export default Slot;
