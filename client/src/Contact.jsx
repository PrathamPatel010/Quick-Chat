import Avatar from "./Avatar.jsx";

// eslint-disable-next-line react/prop-types
export const Contact = ({onClick,id,username,selected,online}) => {
    return(
        <div onClick={()=>onClick(id)} key={id}
             className={
                 "flex items-center cursor-pointer gap-2 border-2 border-gray-300 p-2 " + (selected ? 'bg-blue-400 rounded-r-md pl-5' : '')}>
            <Avatar online={online} username={username} userId={id}/>
            {username}
        </div>
    )
}