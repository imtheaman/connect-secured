import useAppDispatch from "../../hooks/useAppDispatch";
import { setSearch } from "../../local-states/slices/uiSlice";
import SearchInput from "./SearchInput";
const Search: React.FC<{ className?: string }> = ({ className }) => {
  const dispatch = useAppDispatch();
  
  return (
    <div
      className="bg-black-transparent absolute z-20 top-0 shadow-md left-0 bottom-0 right-0 px-6 py-7"
      onClick={() => dispatch(setSearch(false))}
    >
      <SearchInput />
    </div>
  );
};

export default Search;
