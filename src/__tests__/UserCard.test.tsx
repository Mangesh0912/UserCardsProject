import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from '../components/UserCard';

const mockUser = {
    id: '12345',
    avatar: 'avatar1.png',
    firstname: 'John',
    lastname: 'Doe',
    role: 'Developer',
    join_date: '2020-01-01',
    description: 'A developer'
  };


  describe('UserCard Component', () => {
    test('renders user information correctly', () => {
      render(<UserCard user={mockUser} onViewMore={jest.fn()} />);
  
      expect(screen.getByAltText('John Doe')).toHaveAttribute('src', mockUser.avatar);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText(mockUser.description)).toBeInTheDocument();
    });
  
    test('calls onViewMore when the button is clicked', () => {
      const onViewMore = jest.fn();
      render(<UserCard user={mockUser} onViewMore={onViewMore} />);
  
      const button = screen.getByText('View More');
      fireEvent.click(button);
  
      expect(onViewMore).toHaveBeenCalledTimes(1);
    });
  });