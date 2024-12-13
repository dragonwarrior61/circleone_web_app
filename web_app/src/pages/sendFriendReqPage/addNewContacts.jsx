import "./addNewContacts.scss";

const AddNewContacts = () => {
  return (
    <div className="content_box">
      <div className="new_contacts_container">
        <div className="subtitles_new_contacts">
          <h5>Send Friend Requests</h5>
          <p>Send friend requests, by entering their username below</p>
        </div>
        <div className="input_new_contacts">
          <input type="text" placeholder="To:" />
          <button>Send Friend Request</button>
        </div>
      </div>
    </div>
  );
};

export default AddNewContacts;