import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./helpers/Input";
import Button from "./helpers/Button";
import Spinner from "./helpers/Spinner";
import { login } from "../services/AuthService";
import Notify from "../utils/Notify";
import { useAppContext } from "../context/AppContext";
import { setUser, setLoading } from "../context/AppActions";

const Login: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await login(phoneNumber, password);
      localStorage.setItem("token", res.token);
      dispatch(setUser({ ...state.user, token: res.token }));

      navigate("/home");
    } catch (err: any) {
      err?.errors ? Notify.error(err.errors[0].msg) : Notify.error(err.error);
    }
    dispatch(setLoading(false));
  };

  return (
    <div className="flex h-full py-4 gap-16 md:py-20 flex-col items-center md:p-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-bold">Welcome back</h1>
        <p className="text-gray-500">
          Welcome back! Please enter your details.
        </p>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-2"
        >
          <Input
            field={phoneNumber}
            setField={setPhoneNumber}
            placeholder="Phone Number"
            type="tel"
            required
          />
          <Input
            field={password}
            setField={setPassword}
            placeholder="Password"
            type="password"
            required
          />
          <Button loading={state.loading} type="submit">
            {state.loading ? (
              <span className="flex items-center justify-center gap-2">
                Logging in
                <Spinner loading={state.loading} color="#F7F4E3" />
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <div className="flex items-center gap-2 justify-center text-xs">
          <p className="text-gray-500">Don't have an account?</p>
          <button
            className="text-brown hover:underline"
            onClick={() => navigate("/auth/register")}
          >
            sign up for free!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
