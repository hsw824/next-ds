import './App.css';
import Label from './components/Label';

function App() {
  return (
    <div>
      <Label.Root htmlFor="food">하하!</Label.Root>
      <input id="food" />
    </div>
  );
}

export default App;
