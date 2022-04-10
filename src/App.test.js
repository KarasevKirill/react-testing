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
    });
});
