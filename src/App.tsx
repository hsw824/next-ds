import Popover from './components/Popover';
import './App.css';
function App() {
  const portal = document.getElementById('portal');
  return (
    <Popover style={{ width: '60px' }}>
      <Popover.Trigger>트리거</Popover.Trigger>
      <Popover.Portal container={portal}>
        <Popover.Content style={{ width: '50%', height: '200px', border: '1px solid #000', position: 'absolute' }}>
          테스트
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}

export default App;
