import React, { useState } from "react";
import { User } from "./types/types";
import Filters from "./components/Filters/Filters";
import UserList from "./components/UserList/UserList";
import UserProfile from "./components/UserProfile/UserProfile";

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [filterCity, setFilterCity] = useState<string | null>(null);
  const [filterCompany, setFilterCompany] = useState<string | null>(null);

  const handleSort = (field: string, value?: string) => {
    if (field === "city") {
      setFilterCity(value || null);
    } else if (field === "company") {
      setFilterCompany(value || null);
    } else {
      setSortField(field);
    }
  };

  return (
    <div className="App">
      <div className="Filters">
        <Filters onSort={handleSort} />
      </div>
      <div className="UserList">
        <UserList
          onSelectUser={setSelectedUser}
          sortField={sortField}
          filterCity={filterCity}
          filterCompany={filterCompany}
        />
      </div>
      {selectedUser && (
        <div className="UserProfile">
          <UserProfile user={selectedUser} />
        </div>
      )}
    </div>
  );
};

export default App;
