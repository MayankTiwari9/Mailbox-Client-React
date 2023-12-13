import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmailDetails = () => {
  const [emailDetails, getEmailDetails] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getAllEmails = async () => {
      try {
        const response = await fetch(
          `https://mailbox-client-react-default-rtdb.firebaseio.com/mails/${id}.json`
        );
        const data = await response.json();

        getEmailDetails(data);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    getAllEmails();
  }, []);

  return (
    <div>
      {emailDetails && (
        <ul className="list-group">
          <li key={emailDetails.id} className="list-group-item">
            <strong>Subject:</strong> {emailDetails.subject}
            <strong> From:</strong> {emailDetails.from}
            <strong> Content:</strong> {emailDetails.content}
            <strong> Timestamp:</strong>{" "}
            {new Date(emailDetails.timestamp).toLocaleString()}
          </li>
        </ul>
      )}
    </div>
  );
};

export default EmailDetails;
