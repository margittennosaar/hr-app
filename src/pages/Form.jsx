import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import "./Form.css";
import useAxiosRequest from "../services/useAxios";

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
    <>
      {!successMessage ? (
        <form
          onChange={changeHandler}
          onSubmit={submitHandler}
          className="formBase"
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
          <Button text="Add new" type="submit" role="primary-bg" />
        </form>
      ) : (
        <div>
          <p>{successMessage}</p>
          <Button
            text="Go to List"
            onClick={() => navigate("/")}
            role="primary-bg"
          />
          <Button
            text="Add Another Employee"
            role="primary-bg"
            onClick={() => setSuccessMessage(null)}
          />
        </div>
      )}
    </>
  );
};

export default Form;
