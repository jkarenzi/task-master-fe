import { describe, it, expect, beforeEach } from "vitest";
import { screen, fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TwoFactorAuth from "../pages/auth/TwoFactorAuth";
import { Provider } from "react-redux";
import { Store, configureStore } from "@reduxjs/toolkit";
import userReducer from '../redux/slices/userSlice'


const createTestStore = () =>
  configureStore({ reducer: { user: userReducer } });
let store: Store;

describe('2FA Component Tests', () => {
  beforeEach(() => {
    store = createTestStore()
  })

  it('renders 2FA component', () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/auth/2fa?id=1&&email=test@gmail.com']}>
            <TwoFactorAuth />
          </MemoryRouter>
        </Provider>
      );
  
      expect(screen.getByText('Two Factor Authentication')).toBeInTheDocument();
      expect(screen.getByText('Request new code')).toBeInTheDocument();
      expect(screen.getByText(/^[A-Za-z\s.]{1,}test@gmail.com$/g)).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('shows validation error on empty submit', async() => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/auth/2fa?id=1&&email=test@gmail.com']}>
          <TwoFactorAuth />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Two factor code is required')).toBeInTheDocument();
    })
});
})
