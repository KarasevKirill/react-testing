import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
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

    // // fireEvent
    // test("change input value", async () => {
    //     render(<App />);

    //     // waiting for asynchronous operations in the component
    //     await screen.findByText(/logged in as/i);

    //     expect(screen.queryByText(/React/)).toBeNull();

    //     fireEvent.change(screen.getByRole("textbox"), {
    //         target: {value: "React"}
    //     });

    //     expect(screen.queryByText(/React/)).toBeInTheDocument();
    // });

    // it("input focus", () => {
    //     const { getByTestId } = render(
    //         <input type="text" data-testid="simple-input" />
    //     );

    //     const input = getByTestId("simple-input");

    //     expect(input).not.toHaveFocus();

    //     input.focus();

    //     expect(input).toHaveFocus();
    // });
    // // fireEvent

    // // userEvent (priority over fireSelect)
    // test("change input value", async () => {
    //     render(<App />);

    //     // waiting for asynchronous operations in the component
    //     await screen.findByText(/logged in as/i);

    //     expect(screen.queryByText(/React/)).toBeNull();

    //     userEvent.type(screen.getByRole("textbox"), "React");

    //     expect(screen.queryByText(/React/)).toBeInTheDocument();
    // });

    // it("checkbox click", () => {
    //     const { container } = render(<input type="checkbox" />);
    //     const checkbox = container.firstChild;

    //     expect(checkbox).not.toBeChecked();

    //     userEvent.click(checkbox);

    //     expect(checkbox).toBeChecked();
    // });

    // it("checkbox double click", () => {
    //     const onChange = jest.fn();
    //     const { container } = render(<input type="checkbox" onChange={onChange} />);
    //     const checkbox = container.firstChild;

    //     expect(checkbox).not.toBeChecked();

    //     userEvent.dblClick(checkbox);

    //     expect(onChange).toHaveBeenCalledTimes(2);

    //     expect(checkbox).not.toBeChecked();
    // });

    // it("focus with button Tab", () => {
    //     const { getAllByTestId } = render(
    //         <div>
    //             <input data-testid="element" type="checkbox" />
    //             <input data-testid="element" type="radio" />
    //             <input data-testid="element" type="text" />
    //         </div>
    //     );

    //     const [checkbox, radio, text] = getAllByTestId("element");

    //     userEvent.tab();
    //     expect(checkbox).toHaveFocus();

    //     userEvent.tab();
    //     expect(radio).toHaveFocus();

    //     userEvent.tab();
    //     expect(text).toHaveFocus();
    // });

    // it("select option", () => {
    //     const { selectOptions, getByRole, getByText } = render(
    //         <select>
    //             <option value="1">One</option>
    //             <option value="2">Two</option>
    //             <option value="3">Three</option>
    //         </select>
    //     );

    //     userEvent.selectOptions(getByRole("combobox"), "1");
    //     expect(getByText("One").selected).toBeTruthy(); // First element is selected

    //     userEvent.selectOptions(getByRole("combobox"), "2");
    //     expect(getByText("Two").selected).toBeTruthy();
    //     expect(getByText("One").selected).toBeFalsy(); // First element is no longer selected
    // });
    // // userEvent
});

jest.mock("axios");

const hits = [
    { objectID: "1", title: "Angular" },
    { objectID: "2", title: "React" },
    { objectID: "3", title: "Vue" }
];

describe("App", () => {
    it("fetches data from API", async () => {

        axios.get.mockImplementationOnce(() => Promise.resolve({ data: { hits } }));

        const { getByRole, findAllByRole } = render(<App />);

        userEvent.click(getByRole("button"));

        const items = await findAllByRole("listitem");

        expect(items).toHaveLength(3);
        expect(axios.get).toHaveBeenCalledTimes(1); // how many times was called
        expect(axios.get).toHaveBeenCalledWith("http://hn.algolia.com/api/v1/search?query=React"); // with what parameters it was called
    });

    it("fetches data from API with error", async () => {

        axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

        const { getByRole, findByText } = render(<App />);

        userEvent.click(getByRole("button"));

        const message = await findByText(/Something went wrong.../);

        expect(message).toBeInTheDocument();
    });

    it("fetches data from API with function act", async () => {

        const promise = Promise.resolve({ data: { hits } });

        axios.get.mockImplementationOnce(() => promise);

        const { getByRole, getAllByRole } = render(<App />);

        userEvent.click(getByRole("button"));

        await act(() => promise);

        expect(getAllByRole("listitem")).toHaveLength(3);
    });
});
