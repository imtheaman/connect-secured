import { Dispatch, SetStateAction } from 'react';
import SearchInput from './SearchInput';
const Search: React.FC<{
  setSearch: Dispatch<SetStateAction<boolean>>;
}> = ({ setSearch }) => {
  return (
    <div
      className='bg-black-transparent absolute z-20 top-0 shadow-md left-0 bottom-0 right-0 px-6 py-7'
      onClick={() => setSearch(false)}
    >
      <SearchInput setSearch={setSearch} />
    </div>
  );
};

export default Search;
