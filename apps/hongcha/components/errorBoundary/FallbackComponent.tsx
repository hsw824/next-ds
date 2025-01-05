const FallbackComponent = ({ error }: { error: Error }) => {
  return (
    <div>
      <h2 className="text-lg">문제가 발생했습니다. 관리자에게 문의하세요.</h2>
      <div>{error?.message}</div>
    </div>
  );
};
export default FallbackComponent;
