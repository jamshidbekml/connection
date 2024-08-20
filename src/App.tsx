import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Example usage:
// connectWebSocketExtension('ws://192.168.208.213:8888');
// sendMessageToWebSocketExtension('Hello WebSocket');

function App() {
    window.addEventListener('message', (event) => {
        if (event.data.type !== 'FROM_EXTENSION') {
            return;
        }

        alert(event.data.message);
    });
    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    window.postMessage(
                        {
                            type: 'FROM_PAGE',
                            command: 'connect',
                            url: formData.get('url'),
                        },
                        '*'
                    );
                }}
            >
                <div>
                    <input
                        name="url"
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter URL"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Connect
                </button>
            </form>
        </>
    );
}

export default App;
