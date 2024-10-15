import Form from './components/Form';

function App() {
  return (
    <div>
      <Form noValidate>
        <Form.Field name="email">
          <Form.Label>이메일</Form.Label>
          <Form.Control asChild>
            <input type="text" required pattern="[0-9]{8}" />
          </Form.Control>
          <Form.Message match="valueMissing" />
          <Form.Message match="patternMismatch">형식이 맞지 않습니다. 생년월일 8자로 적어주세요 yyyymmdd</Form.Message>
        </Form.Field>
        <Form.Field name="password">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control asChild>
            <input type="number" step={0.5} required min={10} max={100} />
          </Form.Control>
          <Form.Message match="valueMissing" />
          <Form.Message match="stepMismatch">유효한 값은 0.5 단위입니다.</Form.Message>
          <Form.Message match="rangeUnderflow">10보다 작으면 안됩니다.</Form.Message>
          <Form.Message match="rangeOverflow">100보다 크면 안됩니다.</Form.Message>
        </Form.Field>
        <Form.Button>클릭</Form.Button>
      </Form>
    </div>
  );
}

export default App;
