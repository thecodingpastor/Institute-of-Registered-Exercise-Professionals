import { InputAction, InputActionCases, InputStateType } from "./type";
import { validate } from "./validator";

const InputReducer = (
  state: InputStateType,
  action: InputAction
): InputStateType => {
  switch (action.type) {
    case InputActionCases.CHANGE:
      return {
        ...state,
        value: action.val,
        // action validators can be undefined sometimes, hence the []
        isValid: validate(action.val, action.validators || []),
      };
    case InputActionCases.TOUCH:
      return {
        ...state,
        isPristine: false,
      };
    default:
      return state;
  }
};

export default InputReducer;
