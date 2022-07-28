import {SearchForm} from "./components/SearchForm/SearchForm";
import {useState} from "react";


function SimpleSearchPage() {
    const [isSearchLoading, setSearchLoading] = useState(false);
    const [resultData, setResultData] = useState([]);
    const [fetchError, setFetchError] = useState(false);

    function onSearch(data: any) {
        setFetchError(false)
        setSearchLoading(true);
        try {
            const result = await fetch(`http://${}${}${}`);
            const res = result.json();

            setResultData(res);
        } catch (error) {
            setFetchError(true);
        }
            setSearchLoading(false);
    }

    return (
        <div>
            <SearchForm onSearch={onSearch} isDisabled={isSearchLoading} />
            {isSearchLoading ? <h1>Loading...</h1> : !fetchError && resultData.length && resultData.map((item) => <div>{item.name}</div>)}
            {fetchError && <h1>Sorry, something went wrong...</h1>}
        </div>
    )

}
