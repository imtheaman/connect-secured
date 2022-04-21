import useAppDispatch from "../../hooks/useAppDispatch";
import { setSearch } from "../../local-states/slices/uiSlice";
import { useState } from "react";
const SearchInput: React.FC<{ className?: string }> = ({ className }) => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>("");
  const searchHandler = (e: any) => {
    e.preventDefault();
    setSearchValue("");
  };
  return (
    <div
      className="bg-black-transparent absolute z-20 top-0 shadow-md left-0 bottom-0 right-0 px-8 py-7"
      onClick={() => dispatch(setSearch(false))}
    >
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
            stroke-width="1.2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
