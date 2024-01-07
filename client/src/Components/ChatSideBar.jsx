// ChatSidebar.jsx
import Contact from './Contact.jsx';
import Logo from './Logo.jsx';

// eslint-disable-next-line react/prop-types
const ChatSidebar = ({ username,logoutFunc ,onlinePeople, offlinePeople, selectedUserId, setSelectedUserId, setSelectedUsername, setIsSelectedOnline }) => {
    return (
        <div className="bg-[#1f1f1f] text-[#c2b585] flex flex-col lg:w-1/4 p-2">
            <div className="flex-grow">
                <Logo />
                {Object.keys(onlinePeople).map((userId) => (
                    <Contact key={userId} id={userId} online={true} username={onlinePeople[userId]} selected={userId === selectedUserId}
                        onClick={() => {
                            setSelectedUserId(userId);
                            setSelectedUsername(onlinePeople[userId]);
                            setIsSelectedOnline(true);
                        }}
                    />
                ))}
                {Object.keys(offlinePeople).map((userId) => (
                    // eslint-disable-next-line react/prop-types
                    <Contact key={userId} id={userId} online={false} username={offlinePeople[userId].username}
                             selected={userId === selectedUserId}
                             onClick={() => {
                                setSelectedUserId(userId);
                                // eslint-disable-next-line react/prop-types
                                setSelectedUsername(offlinePeople[userId].username);
                                setIsSelectedOnline(false);
                            }}
                    />
                ))}
            </div>
            <div className  ={'p-2 flex justify-center items-center gap-2 text-center'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
                {username}
                <button onClick={logoutFunc} className={'border-2 border-[#ebca97] text-sm rounded text-[#ebca97] bg-[#181818] py-1 px-2'}>Logout</button>
            </div>
        </div>
    );
};

export default ChatSidebar;
