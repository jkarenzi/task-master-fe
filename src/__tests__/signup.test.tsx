import { describe, it, expect } from "vitest";
import { screen, fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup from "../pages/auth/Signup";


describe('Signup Component Tests', () => {
    it('renders Signup component', () => {
        render(
            <MemoryRouter>
              <Signup />
            </MemoryRouter>
        );
    
        expect(screen.getByText('TaskMaster')).toBeInTheDocument();
        expect(screen.getByText('Sign into your TaskMaster account')).toBeInTheDocument();
        expect(screen.getByText('Full name')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Signup')).toBeInTheDocument();
    });

    it('shows validation error on empty submit', async() => {
        render(
            <MemoryRouter>
              <Signup />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Signup'));

        await waitFor(() => {
            expect(screen.getByText('Full name is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        })
    });
})
