import Avatar from '../Components/Avatar.jsx';

// eslint-disable-next-line react/prop-types
const ChatHeader = ({ selectedUserId,selectedUsername, isSelectedOnline, setSelectedUserId }) => {
    return (
        <div className="sticky top-0 flex items-center gap-1 w-full max-h-fit bg-[#313131] text-[#efe2a5] pl-2 py-2">
            <div onClick={() => setSelectedUserId(null)} className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clipRule="evenodd" />
                </svg>
            </div>
            <Avatar userId={selectedUserId} online={isSelectedOnline} username={selectedUsername} />
            <span>{selectedUsername}</span>
        </div>
    );
};

export default ChatHeader;
