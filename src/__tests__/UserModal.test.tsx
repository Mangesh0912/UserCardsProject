import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from 'react-modal';
import UserModal from '../components/UserModal';

Modal.setAppElement(document.createElement('div')); // Needed to avoid warning

const user = {
    id: 'user1',
    avatar: 'https://via.placeholder.com/150',
    firstname: 'Jane',
    lastname: 'Doe',
    role: 'Designer',
    join_date: '2022-02-01',
    description: 'A talented designer with a knack for user experience and interface design.'
  };

  describe('UserModal Component', () => {
    test('renders user information when open', () => {
      render(<UserModal isOpen={true} onRequestClose={jest.fn()} user={user} />);
  
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.getByAltText('Jane Doe')).toHaveAttribute('src', user.avatar);
      expect(screen.getByText('Designer')).toBeInTheDocument();
      expect(screen.getByText('2022-02-01')).toBeInTheDocument();
      expect(screen.getByText(user.description)).toBeInTheDocument();
    });
  
    test('does not render user information when closed', () => {
      render(<UserModal isOpen={false} onRequestClose={jest.fn()} user={user} />);
  
      expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
    });
  
    test('calls onRequestClose when the Close button is clicked', () => {
      const onRequestClose = jest.fn();
      render(<UserModal isOpen={true} onRequestClose={onRequestClose} user={user} />);
  
      fireEvent.click(screen.getByText('Close'));
  
      expect(onRequestClose).toHaveBeenCalledTimes(1);
    });
  });