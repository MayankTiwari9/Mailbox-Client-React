import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import dot from "../../images/icons8-blue-circle-16.png";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getDatabase, ref, set, remove } from "firebase/database";
import firebaseApp from "../../firebase";
import { useAlert } from "react-alert";

const AllEmails = () => {
  const navigate = useNavigate();
  const [allEmails, setAllEmails] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [prevEmail, setPrevEmails] = useState([]);
  const alert = useAlert();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");

    const getAllEmails = async () => {
      try {
        const response = await fetch(
          "https://mailbox-client-react-default-rtdb.firebaseio.com/mails.json"
        );
        const data = await response.json();

        const emailsWithId = Object.entries(data).map(([id, email]) => ({
          id,
          ...email,
        }));

        const filteredEmails = emailsWithId.filter(
          (email) => email.to === storedEmail
        );

        const newEmails = filteredEmails.filter(
          (email) => !prevEmail.some((prevEmail) => prevEmail.id === email.id)
        );

        if (newEmails.length > 0) {
          setAllEmails((prevEmail) => [...prevEmail, ...newEmails]);

          const unreadEmails = filteredEmails.filter(
            (email) => !email.messageRead
          );
          setUnreadCount((prevCount) => prevCount + unreadEmails.length);
        }

        setPrevEmails(filteredEmails);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    getAllEmails();

    const intervalId = setInterval(() => {
      getAllEmails();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [prevEmail]);

  const markAsRead = async (id) => {
    const updatedEmails = allEmails.map((email) =>
      email.id === id ? { ...email, messageRead: true } : email
    );
    setAllEmails(updatedEmails);

    const db = getDatabase(firebaseApp);
    const emailRef = ref(db, `mails/${id}/messageRead`);

    try {
      await set(emailRef, true);
    } catch (error) {
      console.error("Error updating messageRead in Firebase:", error);
    }
  };

  const deleteMail = async (id) => {
    const db = getDatabase(firebaseApp);
    const emailsRef = ref(db, `mails/${id}`);

    try {
      await remove(emailsRef, id);
      setAllEmails((prevEmails) =>
        prevEmails.filter((email) => email.id !== id)
      );
      alert.success("Mail Deleted");
    } catch (error) {
      console.log("Error deleting");
    }
  };

  return (
    <div>
      <h2>Your Inbox</h2>
      <p>Inbox {unreadCount} Unread</p>
      {allEmails.length > 0 ? (
        <ul className="list-group">
          {allEmails.map((email) => (
            <li key={email.id} className="list-group-item">
              {!email.messageRead && (
                <span>
                  <img src={dot} alt="blue dot" />
                </span>
              )}
              <div className="d-flex justify-content-evenly">
                <p>{email.from}</p>
                <p>{email.content}</p>
                <p>{new Date(email.timestamp).toLocaleString()}</p>
                <Link
                  onClick={() => markAsRead(email.id)}
                  to={`/email/${email.id}`}
                >
                  Read More
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteMail(email.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No emails found.</p>
      )}

      <button
        onClick={() => navigate("/compose")}
        className="btn btn-primary mt-3"
      >
        Compose Email
      </button>
    </div>
  );
};

export default AllEmails;
