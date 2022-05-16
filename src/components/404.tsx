import ConnectCard from "./connect-card/ConnectCard";

const NotFound = () => {
  return (
    <ConnectCard className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">Page Not Found</h1>
    </ConnectCard>
  );
};

export default NotFound;
