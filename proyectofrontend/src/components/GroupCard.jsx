import PropTypes from "prop-types";
import Logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import { CustomButton } from "../components/Button.jsx"; 

export const GroupCard = ({ data, onDelete }) => {
  const handleDelete = () => {
    onDelete(data.id);
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <img
        src={Logo}
        alt=""
        className="p-2 rounded-md w-[70px] mb-4"
        style={{ backgroundColor: data.color }}
      />
      <div className="flex flex-col justify-between w-full">
        <h2 className="font-bold">{data.name}</h2>
        <p className="font-bold mb-2">
          Debes: <span className="text-red-600">$12.000</span>
        </p>
        <div className="flex gap-2 justify-end">
          <Link to={`/groups/${data.id}`}>
            <CustomButton text="Edit" />
          </Link>
          <CustomButton text="Delete" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

GroupCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GroupCard;