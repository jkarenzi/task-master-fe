import { describe, it, expect, beforeEach } from 'vitest';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import stickyReducer from '../redux/slices/stickySlice'
import userReducer from '../redux/slices/userSlice'
import { Store, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import StickyPage from '../pages/StickyPage';

const createTestStore = () =>
    configureStore({
        reducer: { 
            user: userReducer,
            stickyNote: stickyReducer      
        }
    });

let store:Store;


describe('Sticky note tests', () => {
    beforeEach(() => {
        store = createTestStore()
    })

    it('should render sticky page', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <StickyPage/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('My sticky notes')).toBeInTheDocument();
    });
});
