const ProfilePic: React.FC<{
  profilePic: string;
  width?: string | number;
  bgColor?: string;
  height?: string | number;
  border?: boolean;
}> = ({ profilePic, width, height, border = true, bgColor }) => {
  return (
    <>
      {!profilePic || profilePic.startsWith('blob') ? (
        <div
          style={{ width, height }}
          className={`flex items-center border-gray-300 justify-center ${
            border && 'border'
          } ${bgColor ? bgColor : 'bg-white'} rounded-full ${width || height || 'w-12 h-12'}`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-[50%] h-[50%] mb-[.2rem]'
            fill='#5a5b5c'
            viewBox='0 0 512 512'
          >
            <path d='M256 288c79.53 0 144-64.47 144-144s-64.47-144-144-144c-79.52 0-144 64.47-144 144S176.5 288 256 288zM351.1 320H160c-88.36 0-160 71.63-160 160c0 17.67 14.33 32 31.1 32H480c17.67 0 31.1-14.33 31.1-32C512 391.6 440.4 320 351.1 320z' />
          </svg>
        </div>
      ) : (
        <img src={profilePic} className='rounded-full object-contain' />
      )}
    </>
  );
};
export default ProfilePic;
