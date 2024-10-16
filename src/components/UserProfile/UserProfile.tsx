// components/UserProfile.tsx
import React, { useState, useContext } from "react";
import { User } from "../../types/types";
import { UserContext } from "../../context/UserContext";

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const { setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleEditClick = () => {
    if (isEditing) {
      // Валидация
      const newErrors: { [key: string]: string } = {};
      if (!editedUser.email.includes("@")) {
        newErrors.email = "Invalid email address";
      }
      if (!/^\d{5}$/.test(editedUser.zipCode)) {
        newErrors.zipCode = "Invalid zip code";
      }
      if (!/^\+?\d{10,}$/.test(editedUser.phone)) {
        newErrors.phone = "Invalid phone number";
      }
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        setIsEditing(false);
        setUser(editedUser); // Сохранение данных в контексте
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Street:</label>
          <input
            type="text"
            name="street"
            value={editedUser.street}
            onChange={handleChange}
          />

          <label>City:</label>
          <input
            type="text"
            name="city"
            value={editedUser.city}
            onChange={handleChange}
          />

          <label>Zip code:</label>
          <input
            type="text"
            name="zipCode"
            value={editedUser.zipCode}
            onChange={handleChange}
          />
          {errors.zipCode && <p className="error">{errors.zipCode}</p>}

          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={editedUser.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <label>Website:</label>
          <input
            type="text"
            name="website"
            value={editedUser.website}
            onChange={handleChange}
          />

          <label>Comment:</label>
          <textarea
            name="comment"
            value={editedUser.comment}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div>
          <p>Name: {editedUser.name}</p>
          <p>Email: {editedUser.email}</p>
          <p>Street: {editedUser.street}</p>
          <p>City: {editedUser.city}</p>
          <p>Zip code: {editedUser.zipCode}</p>
          <p>Phone: {editedUser.phone}</p>
          <p>Website: {editedUser.website}</p>
          <p>Comment: {editedUser.comment}</p>
        </div>
      )}
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </div>
  );
};

export default UserProfile;
