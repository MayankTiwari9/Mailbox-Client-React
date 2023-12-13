import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import dot from "../../images/icons8-blue-circle-16.png";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getDatabase, ref, set } from "firebase/database";
import firebaseApp from "../../firebase";

const AllEmails = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [allEmails, setAllEmails] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

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

        setAllEmails(filteredEmails);

        // Calculate unread count
        const unreadEmails = filteredEmails.filter((email) => !email.messageRead);
        setUnreadCount(unreadEmails.length);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    getAllEmails();
  }, []);

  const markAsRead = async (id) => {
    // Update the local state
    const updatedEmails = allEmails.map((email) =>
      email.id === id ? { ...email, messageRead: true } : email
    );
    setAllEmails(updatedEmails);

    // Update Firebase to mark the email as read
    const db = getDatabase(firebaseApp);
    const emailRef = ref(db, `mails/${id}/messageRead`);

    try {
      await set(emailRef, true);
    } catch (error) {
      console.error("Error updating messageRead in Firebase:", error);
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
              <strong>Subject:</strong> {email.subject}
              <strong> From:</strong> {email.from}
              <strong> Content:</strong> {email.content}
              <strong> Timestamp:</strong>{" "}
              {new Date(email.timestamp).toLocaleString()}
              <Link onClick={() => markAsRead(email.id)} to={`/email/${email.id}`}>
                Read More
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No emails found.</p>
      )}

      <button onClick={() => navigate("/compose")} className="btn btn-primary mt-3">
        Compose Email
      </button>
    </div>
  );
};

export default AllEmails;
