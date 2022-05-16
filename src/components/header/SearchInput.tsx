import { useState } from "react";
const SearchInput: React.FC<{ className?: string }> = ({ className }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const searchHandler = (e: any) => {
    e.preventDefault();
    setSearchValue("");
  };
  return (
    <form
      className={`bg-gray-100 rounded-full relative ${
        className ? className : ""
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        autoFocus
        placeholder="type to search"
        className="bg-transparent px-4 py-2 w-full pr-10 outline-none"
      />
      <button
        type="submit"
        onClick={searchHandler}
        className="bg-white cursor-pointer outline-none p-[0.58rem] absolute top-0 right-0 shadow rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchInput;
