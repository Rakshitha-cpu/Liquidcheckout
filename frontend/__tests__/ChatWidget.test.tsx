// Basic Component Test Placeholder to satisfy CI constraints
import { render, screen } from '@testing-library/react';
import ChatWidget from '../components/ChatWidget';
import '@testing-library/jest-dom';

describe('ChatWidget Component', () => {
  it('renders the chat button initially', () => {
    render(<ChatWidget />);
    const button = screen.getByText('💬 Chat with AI Support');
    expect(button).toBeInTheDocument();
  });
});
