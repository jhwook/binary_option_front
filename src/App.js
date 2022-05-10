import './App.css';
import { GoogleLogin } from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
};

function App() {
  return (
    <GoogleLogin
      clientId="511516218336-9gbsps8s7q5kqvr4jrno5e9nemp5a14t.apps.googleusercontent.com"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
    />
  );
}

export default App;
