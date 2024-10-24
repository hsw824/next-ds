export interface SlottableProps {
  children: React.ReactNode;
}

const Slottable = ({ children }: SlottableProps) => {
  return <>{children}</>;
};

export default Slottable;
