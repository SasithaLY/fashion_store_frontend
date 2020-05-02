import React, {Component} from 'react';
import API from '../../Utils/API'
import {getCategories, getProduct} from "../APIBridge/APIProduct";

class UploadCategories extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onchangeCategoryName = this.onchangeCategoryName.bind(this);
        this.getCategories = this.getCategories.bind(this);

        this.state = {
            categoryName: '',
            currentCategories: ''
        };

        this.getCategories() ;

    }

    getCategories(){
        getCategories().then(data => {
            if (data.error) {

            } else {
                console.log(data)
                this.setState({
                    currentCategories : data
                })
            }
        });
        
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {
            categoryName: this.state.categoryName
        };

        await API.post('categoriesRouter/addCategory', data).then(r => {
            console.log(r);
            alert('Category Created Successfully!');
            window.location = "/";
        }).catch(error => {
            console.log(error);
            alert(error);
        });

        this.setState({
            categoryName: ''
        });
    }

    onchangeCategoryName(e) {
        this.setState({
            categoryName: e.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        Add Category
                    </div>
                    <div className="m-4">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Category Name</label>
                                <input onChange={this.onchangeCategoryName} name="categoryName" type="text"
                                       className="form-control" placeholder="Enter Category Name.."
                                       value={this.state.categoryName} required/>
                                <small id="emailHelp" className="form-text text-muted">Existing categories cannot be
                                    entered!</small>
                            </div>

                            <button type="submit" className="btn btn-warning">Submit</button>
                        </form>
                    </div>
                </div>

                <a href="/" className="badge badge-warning mt-3" style={{float :'right'}}>Back to DashBoard</a>

            </div>
        );
    }
}

export default UploadCategories;