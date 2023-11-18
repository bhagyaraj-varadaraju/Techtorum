const Login = (props) => {
  const SERVER_URL = props.api_url;
  const AUTH_URL = `${SERVER_URL}/auth/github`;

  return (
    <div className="Login">
      <h1 className="font-bold text-center text-3xl m-2 p-2">Techtorum</h1>
      <center>
        <a href={AUTH_URL}>
          <button className="headerBtn p-4 my-6 rounded-lg w-full bg-gray-700 text-white">
            {" "}
            🔒 Login via Github
          </button>
        </a>
      </center>
    </div>
  );
};

export default Login;
