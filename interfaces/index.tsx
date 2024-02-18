interface I_User {
  _id: string;
  name: string;
  avatar: string;
  __v: number;
  totalFriends: number;
}
interface I_Relationship {
  isFriend: boolean;
  friendRequestSentBy?: string;
}
