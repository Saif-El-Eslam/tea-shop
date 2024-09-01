import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./helpers/Input";
import Button from "./helpers/Button";
import Notify from "../utils/Notify";
import Spinner from "./helpers/Spinner";
import { register } from "../services/AuthService";
import { useAppContext } from "../context/AppContext";
import { setLoading } from "../context/AppActions";

const Register: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      await register(name, phoneNumber, password, verifyPassword);

      Notify.success("Registered Successfully");
      navigate("/auth/login");
    } catch (err: any) {
      err?.errors ? Notify.error(err.errors[0].msg) : Notify.error(err.error);
    }
    dispatch(setLoading(false));
  };

  return (
    <div className="flex h-full py-4 gap-8 flex-col items-center md:p-4">
      <div className="flex flex-col items-start gap-4 min-w-80">
        <h1 className="text-5xl font-bold">Register</h1>
        <p className="text-gray-500">Steeped in tradition, brewed for today.</p>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-2"
        >
          <Input
            field={name}
            setField={setName}
            placeholder="Name"
            type="text"
            required
          />
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
          <Input
            field={verifyPassword}
            setField={setVerifyPassword}
            placeholder="Verify Password"
            type="password"
            required
          />

          <Button loading={state.loading} type="submit">
            {state.loading ? (
              <span className="flex items-center justify-center gap-2">
                Registering
                <Spinner loading={state.loading} color="#F7F4E3" />
              </span>
            ) : (
              "Register"
            )}
          </Button>
        </form>
        <div className="flex items-center gap-2 justify-center text-xs">
          <p className="text-gray-500">Already have an account?</p>
          <button
            className="text-brown hover:underline"
            onClick={() => navigate("/auth/login")}
          >
            log in!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
