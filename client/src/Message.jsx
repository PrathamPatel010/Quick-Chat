import DateTime from "./DateTime.jsx";

// eslint-disable-next-line react/prop-types
const Message = ({message,id}) => {
    return(
        <>
            {/* eslint-disable-next-line react/prop-types */}
            <div style={{width:'50%'}} className={'text-left inline-block break-words px-2 py-1 m-2 rounded-md text-sm max-w-fit ' + (message.sender===id ? 'bg-green-500 text-black-700' : 'bg-white text-black-700')}>
                {/* eslint-disable-next-line react/prop-types */}
                {message.text}<br/>
                <div className={'flex items-center'}>
                {/* eslint-disable-next-line react/prop-types,no-undef */}
                <DateTime isSender={message.sender===id} timestamp={message.createdAt}/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </>
    )
}

export default Message;