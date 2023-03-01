import Transition from "../../components/general/Transition";
import ProtectedRoute from "../../components/layout/ProtectedRoute";
import CourseForm from "../../features/course/components/CourseForm";

const create = () => {
  return (
    <Transition mode="scale-out">
      <ProtectedRoute>
        <CourseForm />
      </ProtectedRoute>
    </Transition>
  );
};

export default create;
