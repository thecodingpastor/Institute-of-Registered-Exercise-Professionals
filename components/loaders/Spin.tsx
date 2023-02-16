import classes from "./Spin.module.scss";

interface IProps {
  style?: any;
  className?: any;
  white?: boolean;
}
const Spin: React.FC<IProps> = ({ className, style, white }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "1rem 0",
    }}
  >
    <div
      className={`${white ? classes.White : classes.Loader} ${
        className ? className : ""
      }`}
      style={style}
    ></div>
  </div>
);

export default Spin;
