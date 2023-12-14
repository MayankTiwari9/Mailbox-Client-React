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
        <ul className="list-group w-75 mx-auto mt-5">
          <li key={emailDetails.id} className="list-group-item">
            <div>
              <strong>Subject:</strong> {emailDetails.subject}
            </div>
            <div className="d-flex justify-content-between">
              <p><strong> From:</strong> {emailDetails.from}</p>
              {new Date(emailDetails.timestamp).toLocaleString()}
            </div>
            <div>
              {emailDetails.content}
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default EmailDetails;
