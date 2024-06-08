// eslint-disable-next-line react/prop-types
const Avatar = ({ username, userId, online }) => {
    const colors = [
        'bg-red-200',
        'bg-green-200',
        'bg-purple-200',
        'bg-blue-200',
        'bg-yellow-200',
        'bg-teal-200'
    ];

    const userIdBase10 = parseInt(userId, 16);
    const colorIndex = userIdBase10 % colors.length;
    const color = colors[colorIndex];

    return (
        <>
            <div className={`relative w-7 h-7 rounded-full flex items-center ${color}`}>
                <span className={`text-[#121718] text-center w-full opacity-60`}>{username[0]}</span>
                <div className={"absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white " + (online ? 'bg-green-500' : 'bg-gray-600')}></div>
            </div>
        </>
    );
};

export default Avatar;
