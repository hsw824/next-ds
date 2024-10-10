import { forwardRef, useState } from 'react';
import { Primitive } from '../Primitive';

import createContext from '../../utils/createContext';
interface BaseComponentType {
  asChild?: boolean;
}

interface WithChildrenProps {
  children: React.ReactNode;
}

interface WithOptionalChildrenProps {
  children?: React.ReactNode;
}

type FormType = BaseComponentType & WithChildrenProps & React.FormHTMLAttributes<HTMLFormElement>;

type FieldType = BaseComponentType &
  WithChildrenProps &
  React.HTMLAttributes<HTMLDivElement> & {
    name: string;
  };

type LabelType = BaseComponentType & WithChildrenProps & React.LabelHTMLAttributes<HTMLLabelElement>;

type ControlType = BaseComponentType & WithOptionalChildrenProps & React.InputHTMLAttributes<HTMLInputElement>;

type MessageType = BaseComponentType &
  WithOptionalChildrenProps &
  React.HTMLAttributes<HTMLSpanElement> & {
    match: ValidityMatcher;
  };

type FormComponent = React.ForwardRefExoticComponent<FormType & React.RefAttributes<HTMLFormElement>> & {
  Field: React.ForwardRefExoticComponent<FieldType & React.RefAttributes<HTMLDivElement>>;
  Label: React.ForwardRefExoticComponent<LabelType & React.RefAttributes<HTMLLabelElement>>;
  Control: React.ForwardRefExoticComponent<ControlType & React.RefAttributes<HTMLInputElement>>;
  Message: React.ForwardRefExoticComponent<MessageType & React.RefAttributes<HTMLSpanElement>>;
  Button: React.ForwardRefExoticComponent<ButtonType & React.RefAttributes<HTMLButtonElement>>;
};

type ButtonType = BaseComponentType & WithChildrenProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
interface FieldContextType {
  name: string;
  validityObj: ValidityState;
  setValidityObj: React.Dispatch<React.SetStateAction<ValidityState>>;
}

const validityMatchers = [
  'badInput',
  'customError',
  'patternMismatch',
  'rangeOverflow',
  'rangeUnderflow',
  'stepMismatch',
  'tooLong',
  'tooShort',
  'typeMismatch',
  'valueMissing',
  'valid',
] as const;

type ValidityMatcher = (typeof validityMatchers)[number];

const [Provider, useContext] = createContext<FieldContextType>('form-field');

const Form = forwardRef<HTMLFormElement, FormType>(({ children, onSubmit, ...props }, ref) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const isValid = form.checkValidity();

    if (!isValid) return;

    if (onSubmit) {
      onSubmit(event);
    }
  };
  return (
    <Primitive.form ref={ref} {...props} onSubmit={handleSubmit}>
      {children}
    </Primitive.form>
  );
}) as FormComponent;

const Field = forwardRef<HTMLDivElement, FieldType>(({ children, name, ...props }, ref) => {
  const [validityObj, setValidityObj] = useState<ValidityState>({
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valueMissing: true,
    valid: false,
  });
  return (
    <Provider contextValue={{ name, validityObj, setValidityObj }}>
      <Primitive.div ref={ref} {...props}>
        {children}
      </Primitive.div>
    </Provider>
  );
});

const Label = forwardRef<HTMLLabelElement, LabelType>(({ children, ...props }, ref) => {
  const { name } = useContext();
  return (
    <Primitive.label ref={ref} {...props} htmlFor={name}>
      {children}
    </Primitive.label>
  );
});

const Control = forwardRef<HTMLInputElement, ControlType>((props, ref) => {
  const { name, setValidityObj } = useContext();
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const currentTarget = e.currentTarget;

    const updateValidity = validityMatchers.reduce(
      (prevValidityState, key) => {
        prevValidityState[key] = currentTarget.validity[key];
        return prevValidityState;
      },
      {} as Record<ValidityMatcher, boolean>,
    );

    setValidityObj((prevState) => ({
      ...prevState,
      ...updateValidity,
    }));
  };

  return <Primitive.input {...props} name={name} ref={ref} onInput={handleInput} />;
});

const Message = forwardRef<HTMLSpanElement, MessageType>((props, ref) => {
  const { children, match, ...messageProps } = props;
  const { validityObj } = useContext();

  const DEFAULT_INVALID_MESSAGE = '유효하지 않은 값입니다.';
  const DEFAULT_BUILT_IN_MESSAGES: Record<ValidityMatcher, string | undefined> = {
    badInput: DEFAULT_INVALID_MESSAGE,
    customError: '',
    patternMismatch: '패턴이 맞지 않습니다.',
    rangeOverflow: '값이 기준값보다 크면 안됩니다.',
    rangeUnderflow: '값이 기준값보다 작으면 안됩니다.',
    stepMismatch: '유효한 값으로 맞춰주세요.',
    tooLong: '입력값이 너무 깁니다.',
    tooShort: '입력값이 너무 짧습니다.',
    valid: undefined,
    valueMissing: '필수값 입니다.',
    typeMismatch: '형식에 맞게 작성해 주세요.',
  };
  if (match && validityObj[match]) {
    const builtMessage = DEFAULT_BUILT_IN_MESSAGES[match];
    return (
      <Primitive.span ref={ref} {...messageProps}>
        {children || builtMessage}
      </Primitive.span>
    );
  }
  if (match === 'valid') {
    return (
      <Primitive.span ref={ref} {...messageProps}>
        {children ? children : DEFAULT_INVALID_MESSAGE}
      </Primitive.span>
    );
  }
  return null;
});

const Button = forwardRef<HTMLButtonElement, ButtonType>(({ children, ...props }, ref) => {
  return (
    <Primitive.button {...props} ref={ref}>
      {children}
    </Primitive.button>
  );
});

Form.Field = Field;
Form.Label = Label;
Form.Control = Control;
Form.Message = Message;
Form.Button = Button;

export default Form;
