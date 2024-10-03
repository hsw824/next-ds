import React, { forwardRef } from 'react';
import Slottable, { SlottableProps } from './Slottable';

export type AsChildProps<T> = T & {
  asChild?: boolean;
};
interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

type PossibleRef<T> = React.Ref<T> | undefined;

type AnyProps = Record<string, any>;

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);

    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === 'style') {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  }
  return { ...slotProps, ...overrideProps };
}

function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach((ref) => setRef(ref, node));
}

function getElementRef(element: React.ReactElement) {
  // React <=18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get;
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element as any).ref;
  }

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get;
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }

  // Not DEV
  return element.props.ref || (element as any).ref;
}

const Slot = forwardRef<any, SlotProps>((props, ref) => {
  const { children, ...slotProps } = props;
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
            ...(mergeProps(slotProps, newElement.props) as any),
            ref: ref ? composeRefs(ref, (newElement as any).ref) : (newElement as any).ref,
          },
          newChildren,
        )
      : null;
  }

  if (React.isValidElement(children)) {
    const childrenRef = getElementRef(children);
    return React.cloneElement(children, {
      ...(mergeProps(slotProps, children.props) as any),
      ref: ref ? composeRefs(ref, childrenRef) : childrenRef,
    });
  }

  console.warn('Slot component should have only one React element as a child');
  return null;
});

export default Slot;
