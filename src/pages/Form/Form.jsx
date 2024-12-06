import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosRequest from "../../services/useAxios";
import Button from "../../components/Button/Button";
import styles from "./Form.module.css";

const Form = () => {
  const [formData, setFormData] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const { create } = useAxiosRequest("http://localhost:3001/");

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      create("persons", formData);
      setSuccessMessage("Employee added successfully!");
      setFormData({
        name: "",
        role: "",
        department: "",
        startDate: "",
        location: "",
      });
    } catch {
      setSuccessMessage("Failed to add employee. Please try again.");
    }
  };

  return (
    <div className={styles.formContainer}>
      {!successMessage ? (
        <form
          onChange={changeHandler}
          onSubmit={submitHandler}
          className={styles.formBase}
        >
          <h2>Add new employee</h2>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
          <label htmlFor="name">Role</label>
          <input type="text" name="role" />
          <label htmlFor="name">Department</label>
          <input type="text" name="department" />
          <label htmlFor="name">Start Date</label>
          <input type="date" name="startDate" />
          <label htmlFor="location">Location</label>
          <input type="text" name="location" />
          <Button text="Add new" type="submit" role="primary" />
        </form>
      ) : (
        <div>
          <p>{successMessage}</p>
          <Button
            text="Go to list"
            onClick={() => navigate("/")}
            role="primary"
          />
          <Button
            text="Add another employee"
            role="primary-bg"
            onClick={() => setSuccessMessage(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Form;
