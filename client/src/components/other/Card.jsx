// IMPORTS: icon
import PersonIcon from "../../resources/images/PersonIcon.svg";

// MAIN COMPONENT
export default function Card({ name }) {
  return (
    <div className="person-card card">
      <div>
        <img src={PersonIcon} />
      </div>
      <p>Hola {name}!</p>
    </div>
  );
}
