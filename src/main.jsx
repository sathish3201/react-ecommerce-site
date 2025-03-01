import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from 'react-redux';
import Store from './redux/Store.jsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

// create query client
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
<QueryClientProvider client={queryClient}>
    <Provider store={Store}>
      <StrictMode> 
            <App />
        </StrictMode>
    </Provider>
</QueryClientProvider>
 
)
