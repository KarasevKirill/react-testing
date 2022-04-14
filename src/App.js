import './App.css';
import { useEffect, useState } from 'react';

const getUser = () => Promise.resolve({id: 1, name: "Alex"});

const Search = ({value, onChange, children}) => (
    <div>
        <label htmlFor="search">{children}</label>
        <input 
            id="search" 
            type="text" 
            value={value} 
            onChange={onChange} 
            placeholder="search..."
            required
        />
    </div>
);

const App = () => {

    const [search, setSearch] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const user = await getUser();

            setUser(user);
        };

        loadUser();
    }, []);

    const handleChange = ({target}) => {
        setSearch(target.value);
    };
  
    return (
        <div>
            {user && <h2>Logged in as {user.name}</h2>}
            <img src="" alt="search image" className="my-class" />
            <Search value={search} onChange={handleChange}>
                Search:
            </Search>
            <p>Searches for {search ? search : "..."}</p>
        </div>
    );
}

export default App;
