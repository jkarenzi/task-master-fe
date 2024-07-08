import { describe, it, expect, beforeEach } from 'vitest';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userReducer, { InitUserState } from '../redux/slices/userSlice'
import { Store, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Drawer from '../components/Drawer';

const createTestStore = () =>
  configureStore({ reducer: { user: userReducer } });
let store: Store;

describe('Drawer tests', () => {
    beforeEach(() => {
        store = createTestStore()
    })

    it('should render drawer', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Drawer/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByTitle('home')).toBeInTheDocument()
        expect(screen.getByTitle('tasks')).toBeInTheDocument()
        expect(screen.getByTitle('notes')).toBeInTheDocument()
        expect(screen.getByTitle('settings')).toBeInTheDocument()
        expect(screen.getByAltText('profile')).toBeInTheDocument()
    });

    it('Should display correct profile image', () => {
        const store = configureStore({
            reducer:{
                user: userReducer
            },
            preloadedState:{
                user:{
                    token:'fake token',
                    userInfo:{
                        _id:'id',
                        fullName: 'fake user',
                        email: 'email@gmail.com',
                        password: 'fake pass',
                        role: 'user',
                        isVerified: false,
                        twoFactorAuth: {
                            isEnabled: false,
                            code: null,
                        },
                        createdAt: 'fakedate',
                        updatedAt: 'fakedate',
                        __v: 0,
                        profileImg: {
                            publicId:'default',
                            url:'http://example.png'
                        }
                    },
                    imageStatus: "idle",
                    isLoadingImage: false,
                    isLoadingName: false,
                    isLoadingPassword: false,
                    status: "idle",
                } as InitUserState
            }})
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Drawer/>
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByAltText('profile')).toHaveAttribute('src','http://example.png')      
    })
});
