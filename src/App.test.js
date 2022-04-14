import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe("App", () => {
    // it("Render App component", () => {
    //     render(<App />);
    //     screen.debug();

    //     expect(screen.getByText(/Search:/i)).toBeInTheDocument();
    //     expect(screen.getByRole("textbox")).toBeInTheDocument();
    //     expect(screen.getByLabelText(/Search:/i)).toBeInTheDocument();
    //     expect(screen.getByPlaceholderText("search...")).toBeInTheDocument();
    //     expect(screen.getByAltText("search image")).toBeInTheDocument(); // search image by alt tag
    //     expect(screen.getByDisplayValue("")).toBeInTheDocument(); // search value attribute. Checking form's default values

    //     expect(screen.queryByText(/Search for react/i)).toBeNull();
    // });

    // it("Async", async () => {
    //     render(<App />);

    //     expect(screen.queryByText(/Logged in as/i)).toBeNull();
    //     expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument();

    //     expect(screen.getByAltText("search image")).toHaveClass("my-class");

    //     expect(screen.getByLabelText(/search/i)).toBeRequired();
    //     //expect(screen.getByLabelText(/search/i)).not.toBeRequired();

    //     expect(screen.getByLabelText(/search/i)).toBeEmptyDOMElement();
    //     expect(screen.getByLabelText(/search/i)).toHaveAttribute("id");
    // });   
});

describe("Events", () => {
    test("change input value", async () => {
        render(<App />);

        // waiting for asynchronous operations in the component
        await screen.findByText(/logged in as/i);

        expect(screen.queryByText(/React/)).toBeNull();

        fireEvent.change(screen.getByRole("textbox"), {
            target: {value: "React"}
        });

        expect(screen.queryByText(/React/)).toBeInTheDocument();
    });

    it("input focus", () => {
        const { getByTestId } = render(
            <input type="text" data-testid="simple-input" />
        );

        const input = getByTestId("simple-input");

        expect(input).not.toHaveFocus();

        input.focus();

        expect(input).toHaveFocus();
    });
});
