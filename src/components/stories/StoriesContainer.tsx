import Story from "./Story";

const StoriesContainer = () => {
  return (
    <div className="flex items-center space-x-3 px-6  overflow-x-scroll no-scrollbar mt-8">
      <Story name="The Aman" profilePic="/girl1.jpg" me={true} />
      <Story name="Alyssia Octavia" profilePic="/girl1.jpg" />
    </div>
  );
};

export default StoriesContainer;
