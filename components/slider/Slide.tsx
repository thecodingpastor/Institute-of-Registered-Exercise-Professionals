import classes from "./Slide.module.scss";
import useSlider from "./useSlider";

interface IProps {
  img: string;
  index: number;
}

// interface EventType = React.TouchEvent<HTMLDivElement>
//       | React.MouseEvent<HTMLDivElement, MouseEvent>

const Slide: React.FC<IProps> = ({ img, index }) => {
  // const [IsDragging, setIsDragging] = useState(false);
  // const [StartPosition, setStartPosition] = useState(0);
  // const [CurrentTranslate, setCurrentTranslate] = useState(0);
  // const [PrevTranslate, setPrevTranslate] = useState(0);
  // const [AnimationID, setAnimationID] = useState(0);
  // const [CurrentIndex, setCurrentIndex] = useState(0);

  const { TouchStart, TouchEnd, TouchMove } = useSlider();

  // const TouchStart = (
  //   e:
  //     | React.TouchEvent<HTMLDivElement>
  //     | React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   index: number
  // ) => {
  //   console.log(index);
  // };

  // const TouchEnd = () => {
  //   console.log("end");
  // };

  // const TouchMove = (
  //   e:
  //     | React.TouchEvent<HTMLDivElement>
  //     | React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   index: number
  // ) => {
  //   console.log(index);
  // };

  return (
    <div
      className={classes.Container}
      // Touch
      // onTouchStart={(e) => TouchStart(e, index)}
      // onTouchEnd={TouchEnd}
      // onTouchMove={(e) => TouchMove(e, index)}
      // Mouse Event
      onMouseDown={(e) => TouchStart(e, index)}
      onMouseUp={TouchEnd}
      onMouseLeave={TouchEnd}
      onMouseMove={(e) => TouchMove(e, index)}
      // Context Menu - for unnecessary pop-ups on desktops
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }}
    >
      <img
        src={img}
        alt="Project Image"
        onDragStart={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default Slide;
