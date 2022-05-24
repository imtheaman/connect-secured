const GoBackBtn: React.FC<{ onClick?: () => any; className?: string }> = ({
  onClick,
  className
}) => {
  return (
    <button
      className={`bg-white rounded-full p-2 ${className ? className : ''}`}
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='1.5'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15 19l-7-7 7-7'
        />
      </svg>
    </button>
  );
};

export default GoBackBtn;
