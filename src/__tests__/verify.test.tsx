import { describe, it, expect, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EmailVerification from "../pages/auth/EmailVerification";
import axios from "../api/axiosInstance";
vi.mock('../api/axiosInstance')

describe('Email Component Tests', () => {
    it('Successful verification', async() => {
        vi.spyOn(axios, 'post').mockResolvedValueOnce({data:{status:'success',message:'success'}})
    
        render(
            <MemoryRouter initialEntries={['/auth/verify/faketoken']}>
                <EmailVerification />
            </MemoryRouter>
        );
    
        await waitFor(() => {
            expect(screen.getByText('TaskMaster')).toBeInTheDocument();
            expect(screen.getByAltText('success')).toBeInTheDocument();
            expect(screen.getByText('Your email has been successfully verified')).toBeInTheDocument();
            expect(screen.getByText('Back to Login')).toBeInTheDocument();
        })
    });

    it('Failed verification', async() => {
        vi.spyOn(axios, 'post').mockResolvedValueOnce({data:{status:'error',message:'error'}})
        render(
            <MemoryRouter initialEntries={['/auth/verify/faketoken']}>
                <EmailVerification />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('TaskMaster')).toBeInTheDocument();
            expect(screen.getByAltText('fail')).toBeInTheDocument();
            expect(screen.getByText('Sorry, we were not able to verify your email because this link is expired. Please request a new link')).toBeInTheDocument();
            expect(screen.getByText('Back to Login')).toBeInTheDocument();
        })    
    });
})
