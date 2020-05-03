import React, {Component} from 'react';
import API from '../../Utils/API'
import {deleteCategory, getCategories, getProduct, updateCategory, updateProduct} from "../APIBridge/APIProduct";

class UploadCategories extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.onchangeCategoryName = this.onchangeCategoryName.bind(this);
        this.onchangeUpdateCategoryName = this.onchangeUpdateCategoryName.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.updateName = this.updateName.bind(this);

        this.state = {
            categoryName: '',
            currentCategories: [] = [],
            updateCategoryName: '',
            selectedCategoryName: '',
            selectedCategoryId: ''
        };

        this.getCategories();

    }

    getCategories() {
        getCategories().then(data => {
            if (data.error) {

            } else {
                console.log('asd', data)
                this.setState({
                    currentCategories: data
                })
            }
            console.log(this.state.currentCategories)
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
            // window.location = "/";
            this.getCategories();
        }).catch(error => {
            console.log(error);
            alert(error);
        });

        this.setState({
            categoryName: ''
        });
    }

    async handleUpdateSubmit(event) {
        event.preventDefault();
        console.log('called!', this.state.updateCategoryName);
        const category = {
            categoryName: this.state.updateCategoryName
        };

        updateCategory(this.state.selectedCategoryId, category).then(data => {
            if (data.error) {

                alert(data.error);
            } else {
                this.getCategories();
                alert('Successfully Update!')
            }
        }).catch(reason => {
            console.log(reason)
        });

        this.setState({
            categoryName: '',
            updateCategoryName: '',
            selectedCategoryName: ''
        });
    }

    deleteCategory(){
        deleteCategory(this.state.selectedCategoryId).then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                this.getCategories();
                this.setState({
                    updateCategoryName: '',
                    selectedCategoryName: ''
                });
                alert('Successfully Deleted!')
            }
        }).catch(reason => {
            console.log(reason)
        });
    }

    onchangeCategoryName(e) {
        this.setState({
            categoryName: e.target.value
        })
    }

    onchangeUpdateCategoryName(e) {
        this.setState({
            updateCategoryName: e.target.value
        })
    }

    updateName(id, name) {
        console.log(id, name)
        this.setState({
            updateCategoryName: name,
            selectedCategoryName: name,
            selectedCategoryId: id
        })
    }

    deleteButton = () =>{
        return(
            this.state.selectedCategoryName !== '' &&
            (<button type='button' onClick={this.deleteCategory} className="btn btn-danger ml-3">Delete</button>)
        )
    }

    render() {
        return (
            <div className="container">
                <a href="/" className="badge badge-warning mt-3" style={{float: 'right'}}>Back to DashBoard</a><br/><br/>
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

{/*//CATEGORY LIST*/}
                <div className="card mt-5">
                    <div className="card-header">
                        Current Categories
                    </div>
                    <small id="emailHelp" className="form-text text-muted mt-2 ml-4">Click on the Category you need to
                        update from Here!</small>
                    <div className="m-2 mb-3 row">
                        {this.state.currentCategories.map((c, i) => (
                            <button key={i} className="btn btn-outline-warning text-white ml-3 mt-3" value={c.categoryName}
                                    onClick={() => this.updateName(c._id, c.categoryName)}>{c.categoryName}</button>
                        ))}
                    </div>
                </div>
{/*//UPDATE CATEGORY*/}
                <div className="card mt-5">
                    <div className="card-header">
                        Update Category
                    </div>
                    <div className="m-4">
                        <form onSubmit={this.handleUpdateSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Category Name</label>
                                <small className="form-text text-muted">Click on the Category you need to
                                    update from <b>Current Categories!</b></small>
                                <input name="categoryName" type="text"
                                       className="form-control mt-1" placeholder="Select Category Name from Current Categories.."
                                       value={this.state.selectedCategoryName} disabled/>

                                <input onChange={this.onchangeUpdateCategoryName} name="categoryName" type="text"
                                       className="form-control mt-3" placeholder="Enter Category Name.."
                                       value={this.state.updateCategoryName} required/>
                            </div>

                            <button type="submit" className="btn btn-warning">Update</button>
                            {this.deleteButton()}
                        </form>
                    </div>
                </div>


            </div>
        );
    }
}

export default UploadCategories;