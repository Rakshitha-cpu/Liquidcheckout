import { render, screen, fireEvent } from '@testing-library/react';
import ChatWidget from '../components/ChatWidget';

describe('ChatWidget Component', () => {
  it('renders the chat widget button by default', () => {
    render(<ChatWidget />);
    const openButton = screen.getByText('dY’'); // Chat icon fallback
    expect(openButton).toBeInTheDocument();
  });

  it('opens the chat window when clicked', () => {
    render(<ChatWidget />);
    const openButton = screen.getByText('dY’');
    fireEvent.click(openButton);
    
    expect(screen.getByText('AI Recovery Assistant')).toBeInTheDocument();
  });
});
