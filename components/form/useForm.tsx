import { useReducer, useCallback } from "react";

const useForm = (InitialState: any, InitialValidity: boolean) => {
  const Reducer = (state: any, action: any) => {
    switch (action.type) {
      case "INPUT_CHANGE":
        let formIsValid = true;

        for (const inputId in state.inputs) {
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: {
              value: action.value,
              isValid: action.isValid,
            },
          },
          formIsValid: formIsValid,
        };
      case "RESET_FORM":
        let newState: any = { ...state };
        for (const inputId in state.inputs) {
          newState.inputs[inputId] = {
            isValid: false,
            value: "",
            test: "dance",
          };
        }
        console.log(newState);
        return {
          state: newState,
          formIsValid: false,
        };
      default:
        return state;
    }
  };

  const [FormState, dispatch] = useReducer(Reducer, {
    inputs: InitialState,
    formIsValid: InitialValidity,
  });

  const onInputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({ type: "INPUT_CHANGE", value, isValid, inputId: id });
    },
    []
  );

  const ResetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  return { FormState, onInputHandler, ResetForm };
};

export default useForm;
