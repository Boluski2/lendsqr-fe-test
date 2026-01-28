import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalItems: 100,
    itemsPerPage: 10,
    onPageChange: vi.fn(),
    onItemsPerPageChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render pagination info correctly', () => {
    render(<Pagination {...defaultProps} />);
    
    expect(screen.getByText('Showing')).toBeInTheDocument();
    expect(screen.getByText('out of 100')).toBeInTheDocument();
  });

  it('should display items per page selector', () => {
    render(<Pagination {...defaultProps} />);
    
    const selector = screen.getByRole('combobox');
    expect(selector).toHaveValue('10');
  });

  it('should call onItemsPerPageChange when selector changes', () => {
    render(<Pagination {...defaultProps} />);
    
    const selector = screen.getByRole('combobox');
    fireEvent.change(selector, { target: { value: '25' } });
    
    expect(defaultProps.onItemsPerPageChange).toHaveBeenCalledWith(25);
  });

  it('should disable previous button on first page', () => {
    render(<Pagination {...defaultProps} />);
    
    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />);
    
    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });

  it('should call onPageChange when next button is clicked', () => {
    render(<Pagination {...defaultProps} />);
    
    const nextButton = screen.getByLabelText('Next page');
    fireEvent.click(nextButton);
    
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('should highlight current page', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    
    const page3Button = screen.getByText('3');
    expect(page3Button).toHaveClass('pagination__page--active');
  });

  it('should call onPageChange when page number is clicked', () => {
    render(<Pagination {...defaultProps} />);
    
    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);
    
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });
});
