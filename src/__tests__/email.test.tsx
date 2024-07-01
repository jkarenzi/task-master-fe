import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Email from "../pages/auth/Email";

describe('Email Component Tests', () => {
    it('renders Email component', () => {
        render(
            <MemoryRouter initialEntries={['/auth/email?email=test@example.com']}>
                <Email />
            </MemoryRouter>
        );
    
        expect(screen.getByText('TaskMaster')).toBeInTheDocument();
        expect(screen.getByText('Verify your email address')).toBeInTheDocument();
        expect(screen.getByText('test@example.com')).toBeInTheDocument();
        expect(screen.getByText('Back to Login')).toBeInTheDocument();
    });
})
