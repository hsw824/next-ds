import { createPortal } from 'react-dom';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: Element | null;
}

const Portal: React.FC<IProps> = (props) => {
  const { container: containerProp, ...portalProps } = props;
  const container = containerProp ? containerProp : globalThis.document.body;
  return container ? createPortal(<div {...portalProps} />, container) : null;
};

const Root = Portal;

export default Root;
