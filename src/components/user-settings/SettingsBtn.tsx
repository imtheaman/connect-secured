const SettingsBtn: React.FC<{ btnName: string; btnAction: () => any }> = ({
  btnName,
  btnAction,
}) => {
  return (
    <button
      className="flex w-full justify-between items-center"
      onClick={btnAction}
    >
      <p className="text-base">{btnName}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

export default SettingsBtn;
