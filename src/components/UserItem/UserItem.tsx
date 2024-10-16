import React from "react";
import { User } from "../../types/types";

interface UserItemProps {
  user: User;
  onSelectUser: (user: User) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onSelectUser }) => {
  return (
    <div onClick={() => onSelectUser(user)}>
      <h2>{user.name}</h2>
      <p>{user.city}</p>
      <p>{user.company}</p>
      <button>Подробнее</button>
    </div>
  );
};

export default UserItem;
