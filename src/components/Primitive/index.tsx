import Slot from '../Slot/Slot';
import ReactDOM from 'react-dom';
import { forwardRef } from 'react';
const NODES = [
  'a',
  'button',
  'div',
  'form',
  'h2',
  'h3',
  'img',
  'input',
  'label',
  'li',
  'nav',
  'ol',
  'p',
  'span',
  'svg',
  'ul',
] as const;

type Primitives = { [E in (typeof NODES)[number]]: PrimitiveForwardRefComponent<E> };

type PrimitivePropsWithRef<E extends React.ElementType> = React.ComponentPropsWithRef<E> & { asChild?: boolean };

interface PrimitiveForwardRefComponent<E extends React.ElementType>
  extends React.ForwardRefExoticComponent<PrimitivePropsWithRef<E>> {}

const Primitive = NODES.reduce((primitive, node) => {
  const Node = forwardRef((props: PrimitivePropsWithRef<typeof node>, forwardRef: any) => {
    const { asChild, ...primitiveProps } = props;
    const Comp: any = asChild ? Slot : node;

    return <Comp {...primitiveProps} ref={forwardRef} />;
  });

  return { ...primitive, [node]: Node };
}, {} as Primitives);

function dispatchDiscreteCustomEvent<E extends CustomEvent>(target: E['target'], event: E) {
  if (target) ReactDOM.flushSync(() => target.dispatchEvent(event));
}

export { Primitive, dispatchDiscreteCustomEvent };
