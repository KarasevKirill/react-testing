import { render, screen } from '@testing-library/react';
import App from './App';

describe("App", () => {
    it("Render App component", () => {
        render(<App />);
        screen.debug();

        expect(screen.getByText(/Search:/i)).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(screen.getByLabelText(/Search:/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("search...")).toBeInTheDocument();
        expect(screen.getByAltText("search image")).toBeInTheDocument(); // search image by alt tag
        expect(screen.getByDisplayValue("")).toBeInTheDocument(); // search value attribute. Checking form's default values

        expect(screen.queryByText(/Search for react/i)).toBeNull();
    });

    it("Async", async () => {
        render(<App />);

        expect(screen.queryByText(/Logged in as/i)).toBeNull();
        expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument();

        expect(screen.getByAltText("search image")).toHaveClass("my-class");

        expect(screen.getByLabelText(/search/i)).toBeRequired();
        //expect(screen.getByLabelText(/search/i)).not.toBeRequired();
        
        expect(screen.getByLabelText(/search/i)).toBeEmpty();
        expect(screen.getByLabelText(/search/i)).toHaveAttribute("id");
    });
});
