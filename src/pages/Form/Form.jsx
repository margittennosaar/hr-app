import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosRequest from "../../services/useAxios";
import Button from "../../components/Button/Button";
import styles from "./Form.module.css";

const initialFormData = {
  name: "",
  role: "",
  department: "",
  startDate: "",
  location: "",
  email: "",
  phone: "",
  employmentType: "Full-Time",
  salary: "",
  skills: [],
  manager: "",
  status: "Active",
};

const Form = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const { create } = useAxiosRequest("http://localhost:3001/");

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "skills"
          ? value.split(",").map((skill) => skill.trim())
          : value,
    }));
  };

  const resetForm = () => setFormData(initialFormData);

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      create("persons", formData);
      setSuccessMessage("Employee added successfully!");
      resetForm();
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

          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />

          <label htmlFor="phone">Phone</label>
          <input type="tel" name="phone" required />

          <label htmlFor="employmentType">Employment Type</label>
          <select name="employmentType" required>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contractor">Contractor</option>
          </select>
          <label htmlFor="salary">Salary (€)</label>
          <input type="number" name="salary" min="0" step="10" required />

          <label htmlFor="skills">Skills (comma-separated)</label>
          <input
            type="text"
            name="skills"
            placeholder="e.g., Node.js, MongoDB"
            required
          />

          <label htmlFor="manager">Manager</label>
          <input type="text" name="manager" />

          <label htmlFor="status">Status</label>
          <select name="status" required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
          </select>
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
            role="primary-light"
            onClick={() => setSuccessMessage(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Form;
