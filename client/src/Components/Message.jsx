import DateTime from "./DateTime.jsx";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Message = ({message,id,iSender}) => {
    return(
        <>
            {/* eslint-disable-next-line react/prop-types */}
            <div style={{width:'80%'}} className={'text-left inline-block break-words px-2 py-1 m-2 rounded-md text-sm max-w-fit ' + (message.sender===id ? 'bg-[#222222] text-[#8d8d8d]' : 'bg-[#2f2f2f] text-[#828282]')}>
                {/* eslint-disable-next-line react/prop-types */}
                {message.text && (
                    message.text
                )}
                {
                    // eslint-disable-next-line react/prop-types
                    message.file && (
                        <>
                            {/* eslint-disable-next-line react/prop-types */}
                            <a target="_blank" className="flex items-center gap-1 border-b" href={axios.defaults.baseURL + '/uploads/' + message.file} rel="noreferrer">
                                {/* eslint-disable-next-line react/prop-types */}
                                {message.originalFileName}
                            </a>
                        </>
                    )
                }
                <div className={'flex items-center'}>
                {/* eslint-disable-next-line react/prop-types,no-undef */}
                <DateTime isSender={message.sender===id} timestamp={message.createdAt}/>
                    {
                        // eslint-disable-next-line react/prop-types
                        (iSender && message.delivered && !message.read) && (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24" id="single-check">
                                    <path fill="#dc2626" fillRule="evenodd" d="M19.5303 6.46967C19.8232 6.76256 19.8232 7.23744 19.5303 7.53033L9.53033 17.5303C9.38968 17.671 9.19891 17.75 9 17.75C8.80109 17.75 8.61032 17.671 8.46967 17.5303L4.46967 13.5303C4.17678 13.2374 4.17678 12.7626 4.46967 12.4697C4.76256 12.1768 5.23744 12.1768 5.53033 12.4697L9 15.9393L18.4697 6.46967C18.7626 6.17678 19.2374 6.17678 19.5303 6.46967Z" clipRule="evenodd"/>
                                </svg>
                            </>
                        )
                    }
                    {
                        // eslint-disable-next-line react/prop-types
                        (iSender && message.delivered && message.read) && (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="blue" viewBox="0 0 24 24" id="single-check">
                                    <path fill="#38bdf8" fillRule="evenodd" d="M19.5303 6.46967C19.8232 6.76256 19.8232 7.23744 19.5303 7.53033L9.53033 17.5303C9.38968 17.671 9.19891 17.75 9 17.75C8.80109 17.75 8.61032 17.671 8.46967 17.5303L4.46967 13.5303C4.17678 13.2374 4.17678 12.7626 4.46967 12.4697C4.76256 12.1768 5.23744 12.1768 5.53033 12.4697L9 15.9393L18.4697 6.46967C18.7626 6.17678 19.2374 6.17678 19.5303 6.46967Z" clipRule="evenodd"/>
                                </svg>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Message;