import React, { useState } from 'react';
import { User } from './types/types';
import Layout from './components/Layout/Layout';
import Filters from './components/Filters/Filters';
import UserList from './components/UserList/UserList';
import Modal from './components/Modal/Modal';
import UserProfile from './components/UserProfile/UserProfile';


const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [filterCity, setFilterCity] = useState<string | null>(null);
  const [filterCompany, setFilterCompany] = useState<string | null>(null);

  const handleSort = (field: string) => {
    setSortField(field);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <Layout>
      <div className="flex flex-row items-top justify-center p-5">
        <div className="w-1/4 max-w-lg bg-gray-500 p-5 rounded shadow-md mt-5">
          <Filters onSort={handleSort} />
        </div>
        <div className="w-full max-w-lg bg-white p-5 rounded shadow-md mt-5">
          <UserList 
            onSelectUser={setSelectedUser} 
            sortField={sortField} 
            filterCity={filterCity} 
            filterCompany={filterCompany} 
          />
        </div>
      </div>
      <Modal isOpen={!!selectedUser} onClose={handleCloseModal}>
        {selectedUser && <UserProfile user={selectedUser} onClose={handleCloseModal} />}
      </Modal>
    </Layout>
  );
};

export default App;

