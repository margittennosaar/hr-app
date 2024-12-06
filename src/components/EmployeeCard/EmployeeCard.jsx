import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosRequest from "../../services/useAxios";
import { getDepartmentClass } from "../../utilis/styleUtils";
import { useEmployeeStatus } from "../../hooks/useEmployeeStatus";
import Button from "../Button/Button";
import styles from "./EmployeeCard.module.css";

const EmployeeCard = ({ startDate, department, name, location, role, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [promotedRole, setPromotedRole] = useState(false);
  const [person, setPerson] = useState({ department, location, role });
  const navigate = useNavigate();
  const { error, update } = useAxiosRequest("http://localhost:3001/");
  const { yearsWorked, isProbation, isAnniversary } =
    useEmployeeStatus(startDate);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPerson((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEdit = () => {
    update(`persons/${id}`, person);
  };

  const renderEditableField = (value, name) => {
    const capitalizeWords = (text) =>
      text
        .toString()
        .replace(
          /\w\S*/g,
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );

    const displayValue = value ? capitalizeWords(value) : "N/A";

    return isEditing ? (
      <input value={value || ""} name={name} onChange={handleInputChange} />
    ) : (
      <p className={`${styles[name]}`}>{displayValue}</p>
    );
  };

  if (error) return <p>{error}</p>;

  return (
    <div
      className={`${styles.card} ${
        styles[getDepartmentClass(person.department)]
      }`}
    >
      <div className={styles.cardHeader}>
        <p className={styles.cardName}>{name}</p>
        <div className={styles.cardIcons}>
          {promotedRole && (
            <div>
              <span className="material-symbols-outlined promote">star</span>
              <p className={styles.cardIconMessage}>Team Lead</p>
            </div>
          )}
          {isAnniversary && (
            <div>
              <span className="material-symbols-outlined celebrate">
                celebration
              </span>
              <p className={styles.cardIconMessage}>
                Schedule recognition meeting for {yearsWorked} years of service!
              </p>
            </div>
          )}

          {isProbation && (
            <div>
              <span className="material-symbols-outlined notify">
                notifications
              </span>
              <p className={styles.cardIconMessage}>
                Schedule probation review. This employee has worked for less
                than 6 months.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardData}>
          {renderEditableField(person.role, "role")}
          {renderEditableField(person.department, "department")}
          {renderEditableField(person.location, "location")}
          <p className={styles.years}>
            {yearsWorked} <span className={styles.text}> years in school </span>
            <span className={styles.date}>({startDate})</span>
          </p>
        </div>
        <div className={styles.cardImage}>
          <img src={`https://api.multiavatar.com/${name}.svg`} alt={name} />
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.cardFooterActions}>
          <Button
            onClick={() => setPromotedRole((prev) => !prev)}
            text={promotedRole ? "Demote" : "Promote"}
            role="secondary"
          />
          <Button
            onClick={() => navigate(`/employee/${id}`)}
            text={"See details"}
            role="secondary"
          />
          <Button
            onClick={() => {
              if (isEditing) handleEdit();
              setIsEditing((prev) => !prev);
            }}
            text={isEditing ? "Save" : "Edit"}
            role={isEditing ? "primary" : "secondary"}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
