import { GetMessagesFromChat, SendMessageToChat, DeleteMessage } from "./messages"
import {GetUserGroups, CreateGroup, GetTextChannels} from './groups' 
import {AddFriend, GetFriends, CreateDirectMessage, GetDirectMessages, getUser} from './user' 
import {UpdateUsersEvents} from './events'

export {GetMessagesFromChat, SendMessageToChat, GetUserGroups, AddFriend, 
        GetFriends, CreateGroup, CreateDirectMessage, GetDirectMessages, GetTextChannels, getUser,
        DeleteMessage, UpdateUsersEvents}