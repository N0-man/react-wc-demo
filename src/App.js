import logo from './logo.svg';
import './App.css';

function App() {
  function handleClick() {
    const modal = document.querySelector('bahmni-modal');
    modal.open();

    modal.addEventListener('confirm', () => {
      console.log('Confirmed...');
    });

    modal.addEventListener('cancel', (event) => {
      console.log('Cancelled...', event);
    });
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>Lets try loading a web component from Reeeee-act</p>
        <button
          style={{ borderRadius: '10%', width: '200px', height: '50px' }}
          onClick={handleClick}
        >
          Click me
        </button>
        <bahmni-modal>
          <h1 slot='title'>Welcome to Bahmni</h1>
          <p>This is build with Web Components ❤️</p>
        </bahmni-modal>
      </header>
    </div>
  );
}

export default App;
