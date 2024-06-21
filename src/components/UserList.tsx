import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import UserModal from "./UserModal";
import { TailSpin } from "react-loader-spinner";

export interface User {
    id: string;
    avatar: string;
    firstname: string;
    lastname: string;
    role: string;
    join_date: string;
    description: string;
}

const BUFFER_SIZE = 20; // number of items per scroll

const UserList1: React.FC = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [bufferedUsers, setBufferedUsers] = useState<User[]>();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const usersRef = useRef<User[]>([]);
    const bufferedUsersRef = useRef<User[]>([]);

    useEffect(() => {
        fetchUsers();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    useEffect(() => {
        if (bufferedUsers) {
            bufferedUsersRef.current = bufferedUsers;
        }
        usersRef.current = users;

    }, [users, bufferedUsers])

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 50 && !isLoadingMore) {
            loadMoreItems();
        }
    }

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                "https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users"
            );
            const users = response.data.data.users;
            setUsers(users);
            setBufferedUsers(users.slice(0, BUFFER_SIZE));
            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching users:", err);
            setIsLoading(false);
        }
    }

    const loadMoreItems = () => {
        const currentBufferedUsers = bufferedUsersRef.current;
        const currentUsers = usersRef.current;
        if (currentBufferedUsers) {
            if (currentBufferedUsers.length >= currentUsers.length) return;
            setIsLoadingMore(true);
            setBufferedUsers((prev) => {
                if (!prev) {
                    console.error("Buffered users don't exist");
                    return [];
                }
                const nextUsers = currentUsers.slice(prev.length, prev.length + BUFFER_SIZE);
                return [...prev, ...nextUsers];
            })
            setIsLoadingMore(false);
        }
    }

    const handleViewMore = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    if (isLoading) {
        return (
            <div className="spinner-container">
                <TailSpin color="#007bff" height={80} width={80} />
            </div>
        );
    }

    return (
        <div className="user-list" ref={listRef}>
            {bufferedUsers && bufferedUsers.map((user, index) => {
                return <UserCard key={user.id} user={user} onViewMore={() => handleViewMore(user)}></UserCard>
            })}
            {isLoadingMore && (
                <div className="spinner-container">
                    <TailSpin color="#007bff" height={40} width={40} />
                </div>
            )}
            <UserModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                user={selectedUser}
                data-testid="user-modal"
            ></UserModal>
        </div>
    )

}

export default UserList1;
