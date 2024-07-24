export const getSender = (loggedUser, users) => {
    if (!loggedUser || !loggedUser._id) {
        console.error("LoggedUser is invalid or undefined:", loggedUser);
        return "Unknown Sender";
    }

    if (!Array.isArray(users) || users.length < 2) {
        console.error("Users array is invalid or does not contain enough users:", users);
        return "Unknown Sender";
    }

    const sender = users[0]._id === loggedUser._id ? users[1] : users[0];

    if (!sender || typeof sender.name !== "string") {
        console.error("Sender or sender's name is invalid:", sender);
        return "Unknown Sender";
    }

    return sender.name; 
};

export const isSameSender = (message,m,i,userId)=>{
    return(
        i< message.length - 1 &&
        (message[i + 1].sender._id !== m.sender._id ||
            message[i + 1].sender._id === undefined) &&
            message[i].sender._id !== userId
    )
}

export const isLastMessage = (message,i,userId)=>{
    return(
        i === message.length - 1 &&
        message[message.length - 1].sender._id !== userId &&
        message[message.length - 1].sender._id
    )
}

export const isSameSenderMargin = (message,m,i,userId)=>{
    if(
        i < message.length - 1 &&
        message[i+1].sender._id !== m.sender._id &&
        message[i+1].sender._id !== userId
    )
    return 33
}
