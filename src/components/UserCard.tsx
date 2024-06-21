import React from "react";

interface UserCardProps {
  user: {
    avatar: string;
    firstname: string;
    lastname: string;
    role: string;
    join_date: string;
    description: string;
  };
  onViewMore: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onViewMore }) => {

  return (
    <div className="user-card">
      <div className="top-section">
        <div className="avatar-container">
          <img src={user.avatar} alt={`${user.firstname} ${user.lastname}`} />
        </div>
      </div>
      <h3>
        {user.firstname} {user.lastname}
      </h3>
      <p className="user-description">{user.description}</p>
      <button onClick={onViewMore}>View More</button>
    </div>
  );
};

export default UserCard;
