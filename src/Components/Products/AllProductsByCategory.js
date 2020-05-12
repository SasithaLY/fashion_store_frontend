import React, {useState, useEffect} from "react";
import RadioSelector from "./RadioSelector";
import {getFilteredProducts} from "../APIBridge/APIProduct";
import ProductCard from "./productCard";
import {prices} from "./Prices";
import {useParams} from "react-router-dom";

const AllProductsByCategory = () => {

    const params = useParams();
    // console.log('jkhkjhkjh' ,params.categoryId);

    const [customFilters, setCustomFilters] = useState({
        filters: {category: [params.categoryId], price: []}
    });
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(4);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(1);
    const [filteredResults, setFilteredResults] = useState([]);
    const [LoadingResult, setLoadingResult] = useState(true);


    const loadFilteredResults = newFilters => {
        setLoadingResult(true);
        let price = newFilters.price;
        newFilters = {
            category: [params.categoryId],
            price: price
        };
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
                setLoadingResult(false);
            }
        });
    };

    const loadMoreData = () => {
        let needToSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(needToSkip, limit, customFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(needToSkip);
            }
        });
    };

    const LoadMore = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMoreData} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        loadFilteredResults(skip, limit, customFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilter = {...customFilters};
        newFilter.filters[filterBy] = filters;

        if (filterBy === "price") {
            let price_values = handlePrice(filters);
            newFilter.filters[filterBy] = price_values;
        }
        loadFilteredResults(customFilters.filters);
        setCustomFilters(newFilter);
    };

    const handlePrice = value => {
        const data_prices = prices;
        let array_prices = [];

        for (let index in data_prices) {
            if (data_prices[index]._id === parseInt(value)) {
                array_prices = data_prices[index].array;
            }
        }
        return array_prices;
    };

    const showAlertEmpty = () => {
        return (
            size === 0 && (
                <div className='container'>
                    <div className="alert bg-danger d-flex justify-content-center" role="alert">
                        Oops.. No Results!
                    </div>
                </div>
            )
        );
    };

    const showLoading = () => {
        return (
            LoadingResult && (
                <div className='container d-flex justify-content-center'>
                    <div className="spinner-grow text-warning" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        );
    };

    return (
        <div className="container-fluid">
            <p>
                <a className="badge badge-warning" data-toggle="collapse" href="#collapseExample" role="button"
                   aria-expanded="false" aria-controls="collapseExample">
                    More Filters
                </a>
            </p>
            <div className="collapse" id="collapseExample">
                <div className="bg-dark rounded d-flex justify-content-center">
                    <div className="row h-25">
                        <RadioSelector
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }
                        />
                    </div>
                </div>
            </div>
            {showLoading()}


            <div>
                <div className="row mt-4 m-5 d-flex justify-content-center">
                    {filteredResults.map((product, i) => (
                        <div key={i} className="row m-2 ">
                            <ProductCard Product={product}/>
                        </div>
                    ))}
                </div>
                <hr/>
                <div className="d-flex justify-content-center">
                    {LoadMore()}
                </div>
                {showAlertEmpty()}
            </div>
        </div>
    );
};


export default AllProductsByCategory;