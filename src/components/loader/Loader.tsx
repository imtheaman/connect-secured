const Loader: React.FC<{height?: string}> = ({height = 'h-6'}) => {
    return (
      <div className={`border-2 rounded-full border-gray-400 ${height} border-t-white aspect-square animate-spin`}></div>
    );
}

export default Loader