import { useState, useEffect } from 'react';
import { User } from '../../types/types';
import { fetchUsers } from '../../api/api';
import UserItem from '../UserItem/UserItem';

interface UserListProps {
  onSelectUser: (user: User) => void;
  sortField: string | null;
  filterCity: string | null;
  filterCompany: string | null;
}

const UserList: React.FC<UserListProps> = ({ onSelectUser, sortField, filterCity, filterCompany }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    let sortedUsers = [...users];

    if (filterCity) {
      sortedUsers = sortedUsers.filter(user => user.address.city === filterCity);
    }

    if (filterCompany) {
      sortedUsers = sortedUsers.filter(user => user.company.name === filterCompany);
    }

    if (sortField) {
      if (sortField === 'city') {
        sortedUsers.sort((a, b) => a.address.city.localeCompare(b.address.city));
      } else if (sortField === 'company') {
        sortedUsers.sort((a, b) => a.company.name.localeCompare(b.company.name));
      }
    }

    setFilteredUsers(sortedUsers);
  }, [sortField, filterCity, filterCompany, users]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Список пользователей</h2>
      {filteredUsers.map(user => (
        <UserItem key={user.id} user={user} onSelectUser={onSelectUser} />
      ))}
    </div>
  );
}

export default UserList;


