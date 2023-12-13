import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllEmails = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [allEmails, setAllEmails] = useState([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setUserEmail(storedEmail);

    const getAllEmails = async () => {
      try {
        const response = await fetch(
          "https://mailbox-client-react-default-rtdb.firebaseio.com/mails.json"
        );
        const data = await response.json();

        const filteredEmails = Object.values(data).filter(
          (email) => email.to === storedEmail
        );

        setAllEmails(filteredEmails);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    getAllEmails();
  }, []);

  return (
    <div>
      <h2>Your Inbox</h2>
      {allEmails.length > 0 ? (
        <ul className="list-group">
          {allEmails.map((email) => (
            <li key={email.timestamp} className="list-group-item">
              <strong>Subject:</strong> {email.subject}
              <br />
              <strong>From:</strong> {email.from}
              <br />
              <strong>Content:</strong> {email.content}
              <br />
              <strong>Timestamp:</strong>{" "}
              {new Date(email.timestamp).toLocaleString()}
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
