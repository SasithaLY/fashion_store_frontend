import React, {useState, useEffect} from 'react';
import {createProduct, getCategories} from '../../Components/APIBridge/APIProduct'
import {isAuthenticated} from "../../auth/auth";

const UploadProducts = () => {

    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        storeMgrID: '',
        oldPrice: '',
        ratings: '',
        reviews: [],
        formData: ''
    });
    const [LoadingResult, setLoadingResult] = useState(true);

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        error,
        ratings,
        reviews,
        formData
    } = values;

    // load categories and set form data
    const init = () => {

        getCategories().then(data => {
            // console.log('cat ', data);
            setValues({
                ...values,
                categories: data,
                formData: new FormData()
            });
            setLoadingResult(false);
        }).catch(error => {
            setValues({...values, error: error});
        });

        setValues({
            storeMgrID: user._id
        });

    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value});
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: '', loading: true});
        formData.set('storeMgrID', user._id);
        formData.set('oldPrice', '');

        // console.log(user._id)
        createProduct(formData).then(data => {

            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                alert('Product Created Successfully!');
                setValues({
                    ...values,
                    error: '',
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    category: '',
                    shipping: ''
                });
                window.location.assign(`${process.env.REACT_APP_CLIENT_URL}/storeManager/allProducts`);
            }
        }).catch(error => {
            alert('Error in Product Upload!');
            console.log(error);
        });
    };

    const displayError = () => (
        <div className="alert border-danger alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showLoading = () => {
        return (
            LoadingResult && (
                <div className='container d-flex justify-content-center mt-5'>
                    <div className="spinner-grow text-warning" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        );
    };

    return (
        <div className="container">
            {showLoading()}
            {displayError()}

            <div className="card">
                <div className="card-header">
                    You're about to Create a Product!
                </div>

                <div className="p-3">
                    <form className="mb-3" onSubmit={clickSubmit}>

                        <div className="form-group">
                            <label className="text-warning">Name</label>
                            <input onChange={handleChange('name')} type="text" className="form-control" value={name}
                                   required/>
                        </div>

                        <div className="form-group">
                            <label className="text-warning">Description</label>
                            <textarea onChange={handleChange('description')} className="form-control"
                                      value={description} required/>
                        </div>

                        <div className="form-group">
                            <label className="text-warning">Price</label>
                            <input onChange={handleChange('price')} type="number" className="form-control" value={price}
                                   required/>
                        </div>

                        <div className="form-group">
                            <label className="text-warning">Category</label>
                            <select onChange={handleChange('category')} className="form-control">
                                <option>Please select</option>
                                {categories && categories.map((c, i) => (
                                    <option key={i} value={c._id}>
                                        {c.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="text-warning">Shipping</label>
                            <select onChange={handleChange('shipping')} className="form-control">
                                <option>Please select</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="text-warning">Quantity</label>
                            <input onChange={handleChange('quantity')} type="number" className="form-control"
                                   value={quantity}/>
                        </div>

                        <div className="form-group">
                            <label className="text-warning">Display Image</label><br/>
                            <label className="btn btn-secondary">
                                <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*"
                                       required/>
                            </label>
                        </div>

                        <button className="btn btn-warning">Submit</button>
                    </form>
                </div>
            </div><br/>

            {displayError()}
        </div>
    );
};

export default UploadProducts;
