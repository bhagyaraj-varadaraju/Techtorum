const Login = (props) => {
  const SERVER_URL = "http://localhost:3001";
  const AUTH_URL = `${SERVER_URL}/auth/github`;

  return (
    <div className="Login">
      <h1>Techtorum</h1>
      <center>
        <a href={AUTH_URL}>
          <button className="headerBtn"> 🔒 Login via Github</button>
        </a>
      </center>
    </div>
  );
};

export default Login;
