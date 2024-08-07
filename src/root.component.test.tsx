import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App2 from "./root.component";


// Mock the @verint/utils module
jest.mock('@verint/utils', () => {
  const { Subject } = require('rxjs');
  const mockSubject = new Subject();

  return {
    sendMessage: jest.fn(),
    getMessage: jest.fn(() => mockSubject.asObservable()),
    mockSubject,
  };
});

describe('App2 Component', () => {
  let utils: any;

  beforeEach(() => {
    utils = require('@verint/utils');
    utils.mockSubject.next();
  });

  it('renders without crashing', () => {
    render(<App2 name="App2" />);
    expect(screen.getByText('App2')).toBeInTheDocument();
    expect(screen.getByText('App2 is mounted!')).toBeInTheDocument();
    expect(screen.getByText('Send Message to app1')).toBeInTheDocument();
    expect(screen.getByText('Messages from app1:')).toBeInTheDocument();
  });

  it('displays messages from App2', async () => {
    render(<App2 name="App2" />);

    // Simulate a message from App2
    const mockMessage = {
      from: 'App1',
      text: 'Hello from App1',
    };

    act(() => {
      utils.mockSubject.next(mockMessage);
    });


    // Wait for the message to appear in the DOM
    await waitFor(() => {
      expect(screen.getByText('Hello from App1')).toBeInTheDocument();
    });
  });

  it('sends a message when the button is clicked', () => {
    const { sendMessage } = utils;
    render(<App2 name="App2" />);

    // Click the button to send a message to App2
    fireEvent.click(screen.getByText('Send Message to app1'));

    expect(sendMessage).toHaveBeenCalledWith(expect.objectContaining({ from: 'App2', text: expect.any(String) }));
  });
});
