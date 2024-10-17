import Popover from './components/Popover';

function App() {
  const portal = document.getElementById('portal');
  return (
    <Popover>
      <Popover.Trigger>트리거</Popover.Trigger>
      <Popover.Portal container={portal}>
        <Popover.Content style={{ width: '50%', height: '200px', border: '1px solid #000' }}>이얏!</Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}

export default App;
