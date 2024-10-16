import { useState, useContext } from "react";
import { User } from "../../types/types";
import { UserContext } from "../../context/UserContext";

interface UserProfileProps {
  user: User;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onClose }) => {
  const { setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (editedUser.name.length < 2) {
      newErrors.name = "Введите имя не менее 2-х символов";
    }
    if (editedUser.username.length < 3) {
      newErrors.username = "Введите имя пользователя не менее 3-х символов";
    }
    if (editedUser.address.street.length < 4) {
      newErrors.street = "Введите название улицы не менее 4-х символов";
    }
    if (editedUser.address.suite.length < 0) {
      newErrors.suite = "Введите номер квартиры";
    }
    if (editedUser.address.city.length < 3) {
      newErrors.city = "Введите название города не менее 3-х символов";
    }
    if (editedUser.address.zipcode.length < 8) {
      newErrors.zipcode = "Введите zip-code не менее 8-х символов";
    }
    if (!editedUser.email.includes("@")) {
      newErrors.email = "Некорректный email";
    }
    if (!/^\+?\d{10,}$/.test(editedUser.phone)) {
      newErrors.phone = "Некорректный номер телефона";
    }
    return newErrors;
  };

  const handleEditClick = () => {
    if (isEditing) {
      const newErrors = validateFields();
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        setIsEditing(false);
        setUser(editedUser);
        console.log(editedUser);
        onClose();
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUser(user);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (
      name === "street" ||
      name === "suite" ||
      name === "city" ||
      name === "zipcode"
    ) {
      setEditedUser({
        ...editedUser,
        address: { ...editedUser.address, [name]: value },
      });
    } else {
      setEditedUser({ ...editedUser, [name]: value });
    }
  };

  return (
    <div className="p-5">
      {isEditing ? (
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            className="block w-full p-2 mb-2 border rounded"
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}

          <label className="block font-semibold">Username:</label>
          <input
            className="block w-full p-2 mb-2 border rounded"
            type="text"
            name="username"
            value={editedUser.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}

          <label className="block font-semibold">Email:</label>
          <input
            className="block w-full p-2 mb-2 border rounded"
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <label className="block font-semibold">Street:</label>
          <input
            className="block w-full p-2 mb-2 border rounded"
            type="text"
            name="street"
            value={editedUser.address.street}
            onChange={handleChange}
            required
          />
          {errors.street && <p className="text-red-500">{errors.street}</p>}

          <label className="block font-semibold">Suite:</label>
          <input
            className="block w-full p-2 mb-2 border rounded"
            type="text"
            name="suite"
            value={editedUser.address.suite}
            onChange={handleChange}
            required
          />
          {errors.suite && <p className="text-red-500">{errors.suite}</p>}

          <label className="block font-semibold">City:</label>
          <input
            className="block w-full p-2 mb-2 border rounded"
            type="text"
            name="city"
            value={editedUser.address.city}
            onChange={handleChange}
            required
          />
          {errors.city && <p className="text-red-500">{errors.city}</p>}

          <label className="block font-semibold">Zip code:</label>
          <input
            className="block w-full p-2 mb-2 border rounded"
            type="text"
            name="zipcode"
            value={editedUser.address.zipcode}
            onChange={handleChange}
            required
          />
          {errors.zipcode && <p className="text-red-500">{errors.zipcode}</p>}

          <label className="block font-semibold">Phone:</label>
          <input
            className="block w-full p-2 mb-2 border rounded"
            type="text"
            name="phone"
            value={editedUser.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}

          <label className="block font-semibold">Website:</label>
          <input
            className="block w-full p-2 mb-2 border rounded"
            type="text"
            name="website"
            value={editedUser.website}
            onChange={handleChange}
            required
          />

          <label className="block font-semibold">Comment:</label>
          <textarea
            className="block w-full p-2 mb-2 border-2 font-bold"
            name="comment"
            value={editedUser.comment}
            onChange={handleChange}
          />
          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
              onClick={handleEditClick}
            >
              Сохранить
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mt-2 hover:bg-gray-600"
              onClick={handleCancelClick}
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>
            <span className="font-semibold">Name:</span> {editedUser.name}
          </p>
          <p>
            <span className="font-semibold">Username:</span>{" "}
            {editedUser.username}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {editedUser.email}
          </p>
          <p>
            <span className="font-semibold">Street:</span>{" "}
            {editedUser.address.street}
          </p>
          <p>
            <span className="font-semibold">Suite:</span>{" "}
            {editedUser.address.suite}
          </p>
          <p>
            <span className="font-semibold">City:</span>{" "}
            {editedUser.address.city}
          </p>
          <p>
            <span className="font-semibold">Zip code:</span>{" "}
            {editedUser.address.zipcode}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {editedUser.phone}
          </p>
          <p>
            <span className="font-semibold">Website:</span> {editedUser.website}
          </p>
          <p>
            <span className="font-semibold">Comment:</span> {editedUser.comment}
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
            onClick={handleEditClick}
          >
            Редактировать
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
