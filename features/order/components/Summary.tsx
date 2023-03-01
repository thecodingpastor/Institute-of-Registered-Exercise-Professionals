import Spin from "../../../components/loaders/Spin";
import classes from "./Summary.module.scss";

const Summary = ({ total }) => {
  return (
    <div className={classes.Container}>
      <h3>Summary</h3>
      {!total?.total ? (
        <Spin white />
      ) : (
        <div>
          {Object.keys(total).map((item) => (
            <section key={item}>
              <b>{item}: </b> {total[item]}
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summary;
