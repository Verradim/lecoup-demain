
import { useState } from "react";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

interface AuthFormProps {
  onSuccess: () => void;
}

export const AuthForm = ({ onSuccess }: AuthFormProps) => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {isSignUp ? "Créer un compte" : "Se connecter"}
      </h2>
      
      {isSignUp ? (
        <SignUpForm onSignInClick={() => setIsSignUp(false)} />
      ) : (
        <SignInForm 
          onSuccess={onSuccess}
          onSignUpClick={() => setIsSignUp(true)}
        />
      )}
    </div>
  );
};
