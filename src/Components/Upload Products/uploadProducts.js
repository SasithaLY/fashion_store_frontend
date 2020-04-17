import React, {useState, useEffect} from 'react';
import {createProduct, getCategories} from '../../Components/APIBridge/APIProduct'

const UploadProducts = () => {

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
        formData: ''
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        formData
    } = values;

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            console.log('cat ', data);
            setValues({
                ...values,
                categories: data,
                formData: new FormData()
            });
        }).catch(error => {
            setValues({...values, error: error});
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

        createProduct(formData).then(data => {
            alert('Product Created Successfully!');
            setValues({
                ...values,
                name: '',
                description: '',
                photo: '',
                price: '',
                quantity: '',
                category: '',
                shipping: ''
            });

        }).catch(error => {
            alert('Error in Product Upload!');
            console.log(error);
        });
    };


    return (
        <div title="Add a new product">
            <div className="row">
                <div className="col-md-8 offset-md-2">

                    <form className="mb-3" onSubmit={clickSubmit}>
                        <h4>Post Photo</h4>
                        <div className="form-group">
                            <label className="btn btn-secondary">
                                <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" required/>
                            </label>
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Name</label>
                            <input onChange={handleChange('name')} type="text" className="form-control" value={name} required/>
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Description</label>
                            <textarea onChange={handleChange('description')} className="form-control" value={description} required/>
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Price</label>
                            <input onChange={handleChange('price')} type="number" className="form-control" value={price} required/>
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Category</label>
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
                            <label className="text-muted">Shipping</label>
                            <select onChange={handleChange('shipping')} className="form-control">
                                <option>Please select</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Quantity</label>
                            <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity}/>
                        </div>

                        <button className="btn btn-outline-primary">Create Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadProducts;
