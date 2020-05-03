import React, {useState, useEffect} from 'react';
import {getCategories, getProduct, updateProduct} from '../../Components/APIBridge/APIProduct'
import {useParams} from 'react-router-dom'

const UpdateProduct = ({match}) => {
    const params = useParams();
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        oldPrice: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: false,
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
    const [categories, setCategories] = useState([]);

    // const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        oldPrice,
        category,
        shipping,
        quantity,
        error,
        formData
    } = values;

    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    oldPrice: data.oldPrice,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                });
                // load categories
                initCategories();
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        init(params.productId);
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value});
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: '', loading: true});
        // , user._id, token,
        updateProduct(params.productId, formData).then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                alert('Product Updated Successfully!');
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    error: false,
                    category: '',
                    shipping: '',
                    redirectToProfile: true,
                    createdProduct: data.name
                });
                window.location.assign(`${process.env.REACT_APP_CLIENT_URL}/storeManager/allProducts`);
            }
        });
    };

    const displayError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );


    return (

        <div className="container">

            {displayError()}

            <div className="card">
                <div className="card-header">
                    Update Your Product!
                </div>

                <div className="p-3">
                    <form className="mb-3" onSubmit={clickSubmit}>

                        <div className="form-group">
                            <label className="text-warning">Name</label>
                            <input onChange={handleChange('name')} type="text" className="form-control"
                                   value={name}
                                   required/>
                        </div>

                        <div className="form-group">
                            <label className="text-warning">Description</label>
                            <textarea onChange={handleChange('description')} className="form-control"
                                      value={description} required/>
                        </div>

                        <div className="form-group">
                            <label className="text-warning">New Price</label>
                            <input onChange={handleChange('price')} type="number" className="form-control"
                                   value={price}
                                   required/>
                        </div>

                        <div className='row ml-1'>
                            <label className="text-danger"><b>Note : </b></label> <label>If you're throwing a discount, just update the Old Price..</label>
                        </div>
                        <div className="form-group">
                            <label className="text-warning">Old Price</label>
                            <input onChange={handleChange('oldPrice')} type="number" className="form-control"
                                   value={oldPrice} placeholder="If you're done with discount, just wipe this away.."/>
                        </div>

                        <div className="form-group">
                            <label className="text-warning">Category</label>
                            <select onChange={handleChange('category')} className="form-control">
                                <option>Please select</option>
                                {categories && categories.map((c, i) => (
                                    <option key={i} value={c._id} selected={category === c._id}>
                                        {c.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="text-warning">Shipping</label>
                            <select onChange={handleChange('shipping')} className="form-control">
                                <option>Please select</option>
                                <option value="1" selected={shipping === true}>Yes</option>
                                <option value="0" selected={shipping === false}>No</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="text-warning">Quantity</label>
                            <input onChange={handleChange('quantity')} type="number"
                                   className="form-control"
                                   value={quantity}/>
                        </div>

                        <div className="form-group">
                            <label className="text-warning">Display Image</label><br/>
                            <label className="btn btn-secondary">
                                <input onChange={handleChange('photo')} type="file" name="photo"
                                       accept="image/*"/>
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

export default UpdateProduct;