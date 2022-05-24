import { ReactNode } from 'react';

const GrayBg: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='mx-auto'>
      <div className='text-xs py-1 text-gray-500 bg-gray-100 px-2 w-fit rounded-md my-3 text-center'>
        {children}
      </div>
    </div>
  );
};

export default GrayBg;
