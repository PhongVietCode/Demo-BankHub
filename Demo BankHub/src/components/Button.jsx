// eslint-disable-next-line react/prop-types
const Button = ({ clickHandler, label, icon }) => {
  return (
    <button
      className="p-4 bg-[#e6b26a] rounded-xl  hover:shadow-xl text-2xl font-palanquin text-slate-100 flex justify-center items-center gap-2"
      onClick={clickHandler}
    >
      <div className="leading-1">{label}</div>
      {icon && icon}
    </button>
  );
};

export default Button;
