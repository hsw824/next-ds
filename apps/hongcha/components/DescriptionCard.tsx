interface DescriptionCardType {
  title: string;
}

const DescriptionCard = ({ title }: DescriptionCardType) => {
  return <div className="w-full h-full text-white absolute top-1/2">{title}</div>;
};

export default DescriptionCard;
