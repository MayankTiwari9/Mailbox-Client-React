import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getDatabase, ref, set, remove } from "firebase/database";
import firebaseApp from "../../firebase";

const SentMails = () => {
  const navigate = useNavigate();
  const [allEmails, setAllEmails] = useState([]);

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
          (email) => email.from === storedEmail
        );

        setAllEmails(filteredEmails);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    getAllEmails();
  }, []);

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

  const deleteMail = async(id) => {
    const db = getDatabase(firebaseApp);
    const emailsRef = ref(db, `mails/${id}`);

    try{
      await remove(emailsRef, id);
      setAllEmails((prevEmails) => prevEmails.filter((email) => email.id !== id));

    }
    catch (error) {
      console.log("Error deleting");
    }
  }

  return (
    <div>
      <h2>Sent Mails</h2>
      {allEmails.length > 0 ? (
        <ul className="list-group">
          {allEmails.map((email) => (
            <li key={email.id} className="list-group-item">
              <strong>Subject:</strong> {email.subject}
              <strong> From:</strong> {email.from}
              <strong> Content:</strong> {email.content}
              <strong> Timestamp:</strong>{" "}
              {new Date(email.timestamp).toLocaleString()}
              <Link onClick={() => markAsRead(email.id)} to={`/email/${email.id}`}>
                Read More
              </Link>
              <button className="btn btn-danger" onClick={() => deleteMail(email.id)}>Delete</button>
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

export default SentMails;

