import { createContext, useContext } from 'react';
import { Primitive } from '../Primitive';

// 임포트 경로 절대 경로로 바꾸기

interface FormType extends React.FormHTMLAttributes<HTMLFormElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

interface FieldType extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  name: string;
  children: React.ReactNode;
}

interface LabelType extends React.LabelHTMLAttributes<HTMLLabelElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

interface ControlType extends React.InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean;
  children?: React.ReactNode;
}

interface MessageType extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  children?: React.ReactNode;
  match: ValidityMatcher;
}

interface FieldContextType {
  name: string;
}

const validityMatchers = ['badInput', 'valueMissing', 'tooLong', 'tooShort', 'valid'] as const;

type ValidityMatcher = (typeof validityMatchers)[number];

const FieldContext = createContext<FieldContextType | null>(null);

const Form = ({ children, ...props }: FormType) => {
  return <Primitive.form {...props}>{children}</Primitive.form>;
};

const Field = ({ children, name, ...props }: FieldType) => {
  return (
    <FieldContext.Provider value={{ name: name }}>
      <Primitive.div {...props}>{children}</Primitive.div>
    </FieldContext.Provider>
  );
};

const Label = ({ children, ...props }: LabelType) => {
  const { name } = useContext(FieldContext) as FieldContextType;
  return (
    <Primitive.label {...props} htmlFor={name}>
      {children}
    </Primitive.label>
  );
};
const Control = ({ ...props }: ControlType) => {
  const { name } = useContext(FieldContext) as FieldContextType;
  return <Primitive.input {...props} name={name} />;
};

const Message = (props: MessageType) => {
  const { children, match, ...messageProps } = props;

  const DEFAULT_INVALID_MESSAGE = '유효하지 않은 값입니다.';
  const DEFAULT_BUILT_IN_MESSAGES: Record<ValidityMatcher, string | undefined> = {
    badInput: DEFAULT_INVALID_MESSAGE,
    tooLong: '입력값이 너무 깁니다.',
    tooShort: '입력값이 너무 짧습니다.',
    valid: undefined,
    valueMissing: '필수값 입니다.',
  };

  if (match) {
    const builtMessage = DEFAULT_BUILT_IN_MESSAGES[match];
    return <Primitive.span {...messageProps}>{children || builtMessage}</Primitive.span>;
  }

  return <Primitive.span {...messageProps}>{children ? children : DEFAULT_INVALID_MESSAGE}</Primitive.span>;
};

Form.Field = Field;
Form.Label = Label;
Form.Control = Control;
Form.Message = Message;

export default Form;
