import React, { useState, useEffect } from "react";
import { User } from "../../types/types";
import UserItem from "../UserItem/UserItem";

interface UserListProps {
  onSelectUser: (user: User) => void;
  sortField: string | null;
  filterCity: string | null;
  filterCompany: string | null;
}

const UserList: React.FC<UserListProps> = ({
  onSelectUser,
  sortField,
  filterCity,
  filterCompany,
}) => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Иван Иванов",
      city: "Москва",
      company: "Компания А",
      email: "ivan@example.com",
      street: "Улица 1",
      zipCode: "12345",
      phone: "+1234567890",
      website: "example.com",
      comment: "",
    },
    // Другие пользователи
  ]);

  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  useEffect(() => {
    let sortedUsers = [...users];

    if (filterCity) {
      sortedUsers = sortedUsers.filter((user) => user.city === filterCity);
    }

    if (filterCompany) {
      sortedUsers = sortedUsers.filter(
        (user) => user.company === filterCompany
      );
    }

    if (sortField) {
      sortedUsers.sort((a, b) => a[sortField].localeCompare(b[sortField]));
    }

    setFilteredUsers(sortedUsers);
  }, [sortField, filterCity, filterCompany, users]);

  return (
    <div>
      {filteredUsers.map((user) => (
        <UserItem key={user.id} user={user} onSelectUser={onSelectUser} />
      ))}
    </div>
  );
};

export default UserList;
