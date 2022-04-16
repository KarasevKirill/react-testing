import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = "http://hn.algolia.com/api/v1/search";

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

    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

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

    const handleFetch = async () => {
        try {
            const result = await axios.get(`${URL}?query=React`);

            setNews(result.data.hits);
        } catch (error) {
            setError(error);
        }
    };
  
    return (
        <>
        <div>
            {user && <h2>Logged in as {user.name}</h2>}
            <img src="" alt="search image" className="my-class" />
            <Search value={search} onChange={handleChange}>
                Search:
            </Search>
            <p>Searches for {search ? search : "..."}</p>
        </div>
        <div>
            <button type="button" onClick={handleFetch}>
                Fetch news
            </button>

            <div className="fetch-news-error">
                {error && <span>Something went wrong...</span>}
            </div>

            <ul>
                {news.map(({ objectID, url, title }) => (
                    <li key={objectID}>
                        <a href={url}>{title}</a>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default App;
