import Root from './components/Accordion/index';

const data = [
  {
    id: '1',
    title: 'title1',
    content:
      't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ',
  },
  {
    id: '2',
    title: 'title2',
    content:
      't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ',
  },
  {
    id: '3',
    title: 'title3',
    content:
      't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ',
  },
  {
    id: '4',
    title: 'title4',
    content:
      't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ',
  },
  {
    id: '5',
    title: 'title5',
    content:
      't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ',
  },
  {
    id: '6',
    title: 'title6',
    content:
      't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ',
  },
];

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Root type="single">
        {data.map((item) => {
          return (
            <Root.Item key={item.id}>
              <Root.Trigger id={item.id}>{item.title}</Root.Trigger>
              <Root.Content id={item.id}>{item.content}</Root.Content>
            </Root.Item>
          );
        })}
      </Root>

      <Root type="multiple" style={{ marginLeft: '20px' }}>
        {data.map((item) => {
          return (
            <Root.Item key={item.id}>
              <Root.Trigger id={item.id}>{item.title}</Root.Trigger>
              <Root.Content id={item.id} className="aa">
                {item.content}
              </Root.Content>
            </Root.Item>
          );
        })}
      </Root>
    </div>
  );
}

export default App;
