import { format } from 'date-fns';

// eslint-disable-next-line react/prop-types
const MessageDate = ({ timestamp,isSender}) => {
    const date = new Date(timestamp);
    const options = { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric'};
    const localTimeString = date.toLocaleTimeString('en-US', options);

    const localDateString = format(date, 'dd/MM/yyyy');
    return (
        <div className={'flex text-[0.7rem] gap-1.5 ' + (isSender ? 'text-purple-700' : 'text-gray-400')}>
            <span>{localDateString}</span>
            <span>{localTimeString}</span>
        </div>
    );
};

export default MessageDate;