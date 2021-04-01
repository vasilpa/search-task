import './App.css';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import useDebounce from "./debounce";
import SimpleCard from "./SimpleCard"
import SearchResultsTable from "./SearchResultsTable";



function App() {

  const [searchValue, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [autocomplete, setAutocomplete] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [displaySelectedCountry, setDisplaySelectedCountry] = useState([]);
  const debouncedSearchTerm = useDebounce(searchValue, 800);
  let [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch(`https://restcountries.eu/rest/v2/all`)
      .then(response => response.json())
      .then(data => setResults(data));
  }, []);

  useEffect(() => {
    if (counter) {
      const timeout = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [counter]);

  useEffect(() => {
      if (debouncedSearchTerm.trim()) {
        fetch(`https://restcountries.eu/rest/v2/name/${debouncedSearchTerm}`)
          .then(response => response.json())
          .then(data => {
            setAutocomplete(data.slice(0, 10));
            setShowAutocomplete(true);
          });
      } else {
        setAutocomplete([]);
      }
    }, [debouncedSearchTerm]);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://restcountries.eu/rest/v2/name/${selectedCountry}`)
        .then(response => response.json())
        .then(data => {
          setDisplaySelectedCountry(data);
          setCounter(0);
        });
    }
  }, [selectedCountry]);

  return (
    <div className="App">
      <Container maxWidth="lg">
        <form noValidate autoComplete="off">
          <div className="custom-search-results">
            <TextField
              id="standard-basic"
              value={searchValue}
              onChange={e => setValue(e.target.value)}
              onFocus={() => setShowAutocomplete(true)}
              label="Search Country" />
            {autocomplete.length > 0 && showAutocomplete && <ul>
              {autocomplete.map((country, i) => {
                return (
                  <li key={`${country.numericCode}`} onClick={() => {
                    setSelectedCountry(country.name);
                    setShowAutocomplete(false);
                  }}>
                    {country.name}
                  </li>
                )
              })}
            </ul>}
          </div>
        </form>
        <div className="card-wrapper">
          {(displaySelectedCountry.length > 0 || counter > 0) && <SimpleCard counter={counter} displaySelectedCountry={displaySelectedCountry} />}
        </div>
        {results.length > 0 && <SearchResultsTable results={results} setCounter={setCounter} setSelectedCountry={setSelectedCountry}/> }
      </Container>
    </div>
  );
}

export default App;
