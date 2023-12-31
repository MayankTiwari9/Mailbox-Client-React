import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Mails.css";
import { getDatabase, ref, push, serverTimestamp } from "firebase/database";
import firebaseApp from "../../firebase";
import { useAlert } from "react-alert";


const Mails = () => {
  const [email, setEmail] = useState("");
  const [test, setTest] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const alert = useAlert();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setUserEmail(storedEmail);
  }, []);

  const submitEmail = async (e) => {
    e.preventDefault();

    const db = getDatabase(firebaseApp);
    const emailsRef = ref(db, "mails");

    const newEmail = {
      to: email,
      subject: test,
      from: userEmail,
      content: editorState.getCurrentContent().getPlainText(),
      timestamp: serverTimestamp(),
      messageRead: false,
    };

    await push(emailsRef, newEmail);

    alert.success("Mail Sent");

    setEmail("");
    setTest("");
    setEditorState(EditorState.createEmpty());
  };

  return (
    <form onSubmit={submitEmail} className="m-4">
      <div>
        <label>To:- </label>
        <input
          className="w-100 border border-bottom "
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Test main:- </label>
        <input
          className="w-100 border border-bottom "
          type="text"
          value={test}
          onChange={(e) => setTest(e.target.value)}
        />
      </div>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <button type="submit" className="btn btn-primary mt-3">
        Send
      </button>
    </form>
  );
};

export default Mails;
