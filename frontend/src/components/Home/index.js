import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { MdEdit } from 'react-icons/md';
import Cookies from 'js-cookie';
import { IoIosNotifications,IoMdTrash,IoIosLogOut} from 'react-icons/io';
import { CgProfile } from "react-icons/cg";
import { IoPersonAdd } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import './index.css'
import UserItem from '../UserItem'
const deleteUser=()=>(
    <div
    className="modal fade"
    id="deletemodal"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="deletemodalTitle"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header" style={{ background: "#ff3547" }}>
          <h5
            className="modal-title"
            id="deletemodalTitle"
            style={{ color: "#ffff" }}
          >
            {" "}
            Delete User{" "}
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-header flex-column">
            <div className="icon-box">
              <iconify-icon
                icon="ep:circle-close"
                style={{ color: "#ff3547" }}
                width={100}
                height={100}
              />
            </div>
            <h4 className="modal-title warning-text">Are you sure?</h4>
          </div>
          <div className="modal-body">
            <p>
              Do you really want to delete these records? This process
              cannot be undone.
            </p>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const editUser=()=>(
    <div
    className="modal fade"
    id="editmodal"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="editmodalTitle"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div
          className="modal-header"
          style={{
            background:
              "linear-gradient(89.93deg, #820263 0.05%, #D90368 99.94%)"
          }}
        >
          <h5
            className="modal-title"
            id="editmodalTitle"
            style={{ color: "#ffff" }}
          >
            {" "}
            Update User Details
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="exampleInputtext1">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputtext1"
                    aria-describedby="textHelp"
                    placeholder="First Name"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="exampleInputtext1">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputtext1"
                    aria-describedby="textHelp"
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputtext1">Gender</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputtext1"
                aria-describedby="textHelp"
                placeholder="Gender"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputtext1">Age</label>
              <input
                type="Number"
                className="form-control"
                id="exampleInputtext1"
                aria-describedby="textHelp"
                placeholder="Age"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">
                Upload Profile Picture
              </label>
              <img
                className="upload-image"
                src="image/2upload.png"
                alt="image upload"
                id="picture"
                width="100%"
              />
              <br />
              <br />
              <input
                id="fileinput"
                type="file"
                name="fileinput"
                style={{ display: "none" }}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button type="button" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
)

const addUser=() => (
  <Popup trigger={<button> Trigger</button>} position="right center">
    <div>Popup content here !!</div>
  </Popup>
);

const Index = () => {
    const onClickLogOut=()=>(
        Cookies.remove('jwt_token')
    )

    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [sortBy, setSortBy] = useState('name'); // 'name', 'lastModified', 'lastInserted'
    const [searchTerm, setSearchTerm] = useState('');
  
  
    const sortedUserList = userList.sort((a, b) => {
      const compareValue = (sortOrder === 'asc' ? 1 : -1);
  
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name) * compareValue;
      } else if (sortBy === 'lastModified') {
        // Implement logic for sorting by last modified timestamp
        return 0; // Replace with actual logic
      } else if (sortBy === 'lastInserted') {
        // Implement logic for sorting by last inserted timestamp
        return 0; // Replace with actual logic
      }
  
      return 0;
    });

    const filteredUserList = sortedUserList.filter((user) => {
        const searchFields = [user.name, user.email]; // Add more fields if needed
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return searchFields.some((field) => field.toLowerCase().includes(lowerCaseSearchTerm));
      });
  return (
    <>
    <div className="dashboard">
      <div className="dashboard-nav">
        <header style={{ backgroundColor: "#ffff" }}>

          <a href="#" className="brand-logo">
            <img src="https://mindfulgurukul.com/wp-content/uploads/2022/10/cropped-Untitled-1920-%C3%97-1080px-1000-%C3%97-350px.png" className="website-logo" style={{ width: "80%" }} alt="" />
          </a>
        </header>
        <nav className="dashboard-nav-list">
          <a href="#" className="dashboard-nav-item active">
          <FaUserAlt className="user-logo" size={25} />
            User List
          </a>
          <a
            href="#"
            className="dashboard-nav-item"
            style={{ display: "flex", marginTop: 200 }}
          >
            <IoIosLogOut onClick={onClickLogOut} size={20} />
            Logout
          </a>
        </nav>
      </div>
      <div className="dashboard-app">
        <header className="dashboard-toolbar">
          <div className="greeting-container">
            <div className="greeting-items">
              <div className="greeting-title">
            
                Welcome Back
              </div>
              <div className="greeting-name"> Hello User , Good Morning! </div>
            </div>
          </div>
        </header>
        <div className="dashboard-content">
          <div className="userlist-card">
            {/* mobileresponsive */}
            <div className="mobileresponsive">
              <div className="userlist-container ">
                <div className="row">
                  <div className="col-4">
                    <div className="userlist-items card-title">User List</div>
                  </div>
                  <div className="col-8">
                    <div className="userlist-items">
                      <div className="Adduser-button-flex">
                  
                        <button
                          className="Adduser-Button"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                          onClick={addUser}
                        >
                        <IoPersonAdd size={25} />
                          &nbsp; Add User
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="userlist-items search-bar-w">
                  <div className="search-bar">
                  <IoSearchOutline size={25} />
                    <input
                      type="search"
                      placeholder="Search for name, email..."
                    />
                  </div>
                </div>
              </div>
            </div>
            

            <div></div>
              </div>


            {/* mobileresponsive */}
            {/* desktopresponsive */}
            <div className="desktopresponsive">
            <div className="userlist-container">
        <div className="userlist-items card-title">User List</div>
        <div className="userlist-items search-bar-w">
          <div className="search-bar">
            <IoSearchOutline size={25} />
            <input
              type="search"
              placeholder="Search for name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="userlist-items">
          <div className="Adduser-button-flex">
            <button
              className="Adduser-Button"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              <IoPersonAdd size={25} />
              &nbsp; Add User
            </button>
          </div>
        </div>
        <div className="userlist-items">
          <label>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">A-Z</option>
            <option value="name">Z-A</option>
            <option value="lastModified">Last Modified</option>
            <option value="lastInserted">Last Inserted</option>
          </select>
        </div>
        <div className="userlist-items">
          <label>Sort Order:</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <ul className="user-list">
    <UserItem />

  </ul>
            </div>
            {/* desktopview */}
            <hr className="hr-line" />
            {/* User List */}
            <ul className="user-list">
     
    </ul>
            {/* User List */}
            {/* Add user modal */}
            {/* Add user modal */}
            {/* Edit user modal */}
            {/* Edit user modal */}
            {/* Delete User Modal */}
            {/* Delete User Modal */}
          </div>
        </div>
      </div>
    </div>
  </>
  
  )
}

export default Index
