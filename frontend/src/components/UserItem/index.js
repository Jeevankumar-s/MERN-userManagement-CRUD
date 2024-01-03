import {Link} from 'react-router-dom'
import React, { Component } from 'react';
import { MdEdit } from 'react-icons/md';
import { IoIosNotifications,IoMdTrash,IoIosLogOut} from 'react-icons/io';



class UserItem extends Component {
  state = {
    userList: [],
  };

  componentDidMount() {
    this.gettingTheList();
  }

  gettingTheList = async () => {
    try {
      const response = await fetch("http://localhost:3303/users/");
      const data = await response.json();
      console.log(data)
      this.setState({ userList: data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  onDelete = (id) => {
    const { userList } = this.state;
    const updatedList = userList.filter((each) => each.id !== id);
    this.setState({ userList: updatedList });
  };

  render() {
    const { userList } = this.state;
    return (
      <div>
        <h1>User List</h1>
        {userList.map((user, index) => (
            <Link to={`userdetails/${user.id}`}>
        <li key={user.id} className="user-item">
          <div className="profile-items">
            <div className="Notification-user">
              <div className="Card_message">
              <div
              className="Custormize-serial"
            >
              {index + 1}.
            </div>
                <div className="User_name">{user.name}</div>
                <div className="User-title">{user.email}</div>
                <div className="User-title">{user.phone}</div>
              </div>
            </div>
          </div>
          <div className="icons-row">
            <div
              className="Custormize-edit"
              data-toggle="modal"
              data-target="#editmodal"
            >
              {/* Edit icon */}
              <MdEdit className="edit-icon" size={30} />
            </div>
            <div
              className="Custormize-delete"
              data-toggle="modal"
              data-target="#deletemodal"
            >
              {/* Delete icon */}
              <IoMdTrash className="delete-icon" size={30} />
            </div>
          </div>
        </li>
        </Link>
      ))}
      </div>
    );
  }
}

export default UserItem;
