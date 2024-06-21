import React from 'react';
import axios from 'axios';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import UserList1, { User } from '../components/UserList';
import userEvent from '@testing-library/user-event';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockUsers = [
    { id: 'user1', avatar: 'avatar1.png', firstname: 'John', lastname: 'Doe', role: 'Developer', joinDate: '2020-01-01', description: 'A developer' },
    { id: 'user2', avatar: 'avatar2.png', firstname: 'Jane', lastname: 'Doe', role: 'Designer', joinDate: '2021-02-01', description: 'A designer' },
];

jest.mock('../components/UserCard', () => ({ user, onViewMore }: { user: User, onViewMore: () => void }) => (
     <div data-testid="user-card" onClick={onViewMore}>{user.firstname} {user.lastname}</div>
 ));

 jest.mock('../components/UserModal', () => ({ isOpen, onRequestClose, user }: { isOpen: boolean, onRequestClose: () => void, user: User | null }) => (
     isOpen ? <div data-testid="user-modal"><button onClick={onRequestClose}>Close</button><div>{user?.firstname} {user?.lastname}</div></div> : null
 ));
 

describe('UserList', () => {
     beforeEach(() => {
         jest.clearAllMocks();
     })

     it('should fetch and display users after loading', async() => {
          mockedAxios.get.mockResolvedValueOnce({ data: { data: { users: mockUsers } } });
          render(<UserList1/>)
          await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
     })

     it('should load more users on the scroll', async() => {
          mockedAxios.get.mockResolvedValueOnce({ data: { data: { users: mockUsers.concat(mockUsers) } } });
          render(<UserList1/>)
          fireEvent.scroll(window, {targetY: {scrollY: 1000}})
          await waitFor(() => expect(screen.getAllByText('John Doe').length).toBeGreaterThan(1));
     })

     it('should open and close modal on view more click', async() => {
          mockedAxios.get.mockResolvedValueOnce({ data: { data: { users: mockUsers } } });
          render(<UserList1/>);
          await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
          expect(screen.getByText('John Doe')).toBeInTheDocument();

          //Open Modal
          const userCard = screen.getAllByTestId('user-card')[0];
          fireEvent.click(userCard);
          expect(screen.getByTestId('user-modal')).toBeInTheDocument();

          //Close Modal
          fireEvent.click(screen.getByText('Close'));
          expect(screen.queryByTestId('user-modal')).not.toBeInTheDocument();

     })
})