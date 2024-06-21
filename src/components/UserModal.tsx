import React from "react";
import Modal from "react-modal";

interface UserModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    user: {
        avatar: string;
        firstname: string;
        lastname: string;
        role: string;
        join_date: string;
        description: string;
    } | null;
}

const UserModal: React.FC<UserModalProps> = ({
    isOpen,
    onRequestClose,
    user,
}) => {

    return (
         <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                },
                content: {
                  borderRadius: '8px',
                  padding: '20px',
                  backgroundColor: 'white',
                  maxWidth: '500px',
                  margin: 'auto'
                }
              }}
        >
            <h2>
                {user?.firstname} {user?.lastname}
            </h2>
            <img src={user?.avatar} alt={`${user?.firstname} ${user?.lastname}`} />
            <p>
                <strong>Role:</strong>
                {user?.role}
            </p>
            <p>
                <strong>Join Date:</strong> {user?.join_date}
            </p>
            <p>{user?.description}</p>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default UserModal;
