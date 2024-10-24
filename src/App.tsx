import './App.css';
import Tooltip from './components/Tooltip';
function App() {
  const portal = document.getElementById('portal');
  return (
    <Tooltip
      style={{ width: '100%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}
    >
      <Tooltip.Trigger delayDuration={100}>툴팁 트리거</Tooltip.Trigger>
      <Tooltip.Portal container={portal}>
        <Tooltip.Content style={{ width: '200px', position: 'absolute', border: '1px solid #000' }}>
          툴팁 컨텐츠
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip>
  );
}

export default App;
