import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from '../app/dashboard/page';

// Mock the global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      sessions: [
        { id: "U101", amount: 50000, method: "factoring", recovered: 47500, status: "success", timestamp: "2026-08-27T12:00:00" }
      ]
    })
  })
) as jest.Mock;

describe('Dashboard Integration', () => {
  it('fetches live stats from backend and renders them', async () => {
    render(<Dashboard />);
    
    // Wait for the mock backend data to populate
    await waitFor(() => {
      expect(screen.getByText('Command Center')).toBeInTheDocument();
      expect(screen.getByText('₹50,000')).toBeInTheDocument(); // Failed
      expect(screen.getByText('₹47,500')).toBeInTheDocument(); // Recovered
    });
  });
});
