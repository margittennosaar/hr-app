import { useState } from "react";
import Button from "../Button/Button";
import "./EmployeeCard.css";
import { calcYearsWorked } from "../../utilis/yearsCalc";

const EmployeeCard = ({ startDate, department, name, location, role }) => {
  const [promotedRole, setRole] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const yearsWorked = calcYearsWorked(startDate);
  const isProbation = yearsWorked < 0.5;
  const isAnniversary = yearsWorked > 0 && yearsWorked % 5 === 0;

  const clickHandler = () => {
    setRole((prevState) => !prevState);
  };

  const getDepartmentClass = (dept) => {
    switch (dept) {
      case "Web Development":
        return "web";
      case "Game Development":
        return "game";
      default:
        return "default";
    }
  };

  return (
    <div className={`card ${getDepartmentClass(department)}`}>
      <div className="card-header">
        <p className="name">{name}</p>
        <div className="card-icons">
          {promotedRole && (
            <div>
              <span className="material-symbols-outlined promote">star</span>
              <p className="card-icon-message">Team Lead</p>
            </div>
          )}
          {isAnniversary && (
            <div>
              <span className="material-symbols-outlined celebrate">
                celebration
              </span>
              <p className="card-icon-message">
                Schedule recognition meeting for {yearsWorked} years of service!
              </p>
            </div>
          )}

          {isProbation && (
            <div>
              <span className="material-symbols-outlined notify">
                notifications
              </span>
              <p className="card-icon-message">
                Schedule probation review. This employee has worked for less
                than 6 months.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="card-content">
        <div className="card-data">
          <p className="role">{role}</p>
          <p className="department">{department}</p>
          <p className="location">{location}</p>
        </div>
        <div className="card-image">
          <img src={`https://robohash.org/${name}?set=set5`} />
        </div>
      </div>
      <div className="card-footer">
        <div className="card-footer-actions">
          <Button
            onClick={clickHandler}
            text={promotedRole ? "Demote" : "Promote"}
          />
          <Button text={isEditing ? "Save" : "Edit"} role="secondary" />
        </div>
        <p className="years">
          {yearsWorked} <span className="text">years in school </span>
          <span className="date">({startDate})</span>
        </p>
      </div>
    </div>
  );
};

export default EmployeeCard;
