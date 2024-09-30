import './App.css';
import Label from './components/Label/Label';

function App() {
  return (
    <div>
      <Label.Root htmlFor="food" style={{ color: 'tomato' }}>
        하하!
      </Label.Root>
      <input id="food" />
    </div>
  );
}

export default App;
