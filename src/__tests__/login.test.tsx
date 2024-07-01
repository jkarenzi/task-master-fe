import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import { Store, configureStore } from "@reduxjs/toolkit";
import userReducer, { logout } from '../redux/slices/userSlice'
import { login } from "../redux/slices/userSlice";

const createTestStore = () =>
  configureStore({ reducer: { user: userReducer } });
let store: Store;

vi.mock('jwt-decode', () => ({
    jwtDecode: () => ({
      user: {
        _id:'fakeid',
        fullName: 'test user',
        email: 'test@gmail.com',
        password: 'testpassword',
        role: 'user',
        profileImg: {
            publicId: 'default',
            url: 'http://fake.png'
        },
        isVerified: 'true',
        twoFactorAuth: {
            isEnabled: 'false',
            code: null,
        },
        createdAt: 'fakedate',
        updatedAt: 'fakedate',
        __v: 0
      },
    }),
}));


describe('Login Component Tests', () => {
    beforeEach(() => {
        store = createTestStore()
    })

    it('renders Login component', () => {
        render(
          <Provider store={store}>
            <MemoryRouter>
              <Login />
            </MemoryRouter>
          </Provider>
        );
    
        expect(screen.getByText('TaskMaster')).toBeInTheDocument();
        expect(screen.getByText('Signin to continue')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('shows validation error on empty submit', async() => {
        render(
            <Provider store={store}>
              <MemoryRouter>
                <Login />
              </MemoryRouter>
            </Provider>
        );

        console.log(screen.getByText('Login'))

        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        })
    });

    it('should display correct initial state', () => {
        const { user } = store.getState();
        expect(user).toEqual({
            token: null,
            userInfo: null
        })
    })

    it('should update state correctly upon login', async () => {
        const state = userReducer(undefined, {type:login.type, payload:'faketoken'})
        expect(state).toEqual({
            token: 'faketoken',
            userInfo: {
                _id:'fakeid',
                fullName: 'test user',
                email: 'test@gmail.com',
                password: 'testpassword',
                role: 'user',
                profileImg: {
                    publicId: 'default',
                    url: 'http://fake.png'
                },
                isVerified: 'true',
                twoFactorAuth: {
                    isEnabled: 'false',
                    code: null,
                },
                createdAt: 'fakedate',
                updatedAt: 'fakedate',
                __v: 0
            }
        })
    })

    it('should update state correctly upon logout', () => {
        const loggedInState = userReducer(undefined, {type:login.type, payload:'faketoken'})
        expect(loggedInState).toEqual({
            token: 'faketoken',
            userInfo: {
                _id:'fakeid',
                fullName: 'test user',
                email: 'test@gmail.com',
                password: 'testpassword',
                role: 'user',
                profileImg: {
                    publicId: 'default',
                    url: 'http://fake.png'
                },
                isVerified: 'true',
                twoFactorAuth: {
                    isEnabled: 'false',
                    code: null,
                },
                createdAt: 'fakedate',
                updatedAt: 'fakedate',
                __v: 0
            }
        })
        const loggedOutState = userReducer(undefined, {type:logout.type})
        expect(loggedOutState).toEqual({
            token: null,
            userInfo: null
        })
        
    })
})