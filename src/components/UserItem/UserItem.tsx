
import { User } from '../../types/types';

interface UserItemProps {
  user: User;
  onSelectUser: (user: User) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onSelectUser }) => {
  return (
    <div 
      className="border-b py-2 cursor-pointer hover:bg-gray-100" 
      onClick={() => onSelectUser(user)}
    >
      <p>ФИО: <h3 className='font-semibold'>{user.name}</h3></p>
      <p>Город: <h3 className='font-semibold'>{user.address.city}</h3> </p>
      <p>Компания: <h3 className='font-semibold'>{user.company.name}</h3></p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-800">
        Подробнее
      </button>
    </div>
  );
}

export default UserItem;
