import React, {useState, useEffect} from "react";
import RadioSelector from "./RadioSelector";
import {getProductsByAdmin} from "../APIBridge/APIProduct";
import ProductCard from "./productCard";
import {prices} from "./Prices";
import {useParams} from "react-router-dom";
import {isAuthenticated} from "../../auth/auth";

const ProductsByAdmin = () => {

    const { user, token } = isAuthenticated();

    // const params = useParams();
    // console.log('jkhkjhkjh' ,params.categoryId);

    const [customFilters, setCustomFilters] = useState({
        filters: {storeMgrID: [], price: []}
    });
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(4);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);


    const loadFilteredResults = newFilters => {
        let price = newFilters.price;
        newFilters = {
            storeMgrID: [user._id],
            price : price
        };
        getProductsByAdmin(skip, limit, newFilters).then(data => {
            setFilteredResults(data.data);
            setSize(data.size);
            setSkip(0);

        });
    };

    const loadMoreData = () => {
        let needToSkip = skip + limit;
        getProductsByAdmin(needToSkip, limit, customFilters.filters).then(data => {
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
                <button onClick={loadMoreData} className="btn btn-primary mb-5">
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

    return (
        <div className="container-fluid">
            <div className="card fixed-top mb-2">
                <div className="card-body d-flex justify-content-center">
                    <label>Store Manager</label>
                </div>
            </div> <br/>
            <p className='mt-5'>
                <a class="badge badge-warning" data-toggle="collapse" href="#collapseExample" role="button"
                   aria-expanded="false" aria-controls="collapseExample">
                    More Filters
                </a>
            </p>
            <div className="collapse" id="collapseExample" >
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


            <div>
                <div className="row mt-4 m-5 d-flex justify-content-center">
                    {filteredResults.map((product, i) => (
                        <div key={i} className="row m-2 ">
                            <ProductCard Product={product} Admin={true}/>
                        </div>
                    ))}
                </div>
                <hr/>
                <div className="d-flex justify-content-center">
                    {LoadMore()}
                </div>
            </div>
        </div>
    );
};


export default ProductsByAdmin;
