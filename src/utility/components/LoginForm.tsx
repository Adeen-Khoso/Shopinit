"use client";

import { useState } from "react";
import { Button, Input, Label } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { BiLogoGoogle } from "react-icons/bi";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Props = {
  logo: ImageProps;
  signUpText: string;
  signUpLink: {
    text: string;
    url: string;
  };
  title: string;
  description: string;
  logInButton: ButtonProps;
  logInWithGoogleButton: ButtonProps;
  forgotPassword: {
    text: string;
    url: string;
  };
  footerText: string;
};

export type Login3Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Login3 = (props: Login3Props) => {
  const {
    logo,
    signUpText,
    signUpLink,
    title,
    description,
    logInButton,
    logInWithGoogleButton,
    forgotPassword,
    footerText,
  } = {
    ...Login3Defaults,
    ...props,
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ email, password });
  };

  return (
    <section id="relume" className="px-[5%]">
      <div className="relative flex min-h-svh flex-col justify-center overflow-auto py-24 lg:py-20">
        <div className="absolute left-0 right-0 top-0 flex h-16 items-center justify-center md:h-18">
          <a href={logo.url}>
            <img src={logo.src} alt={logo.alt} />
          </a>
        </div>
        <div className="mx-auto w-full max-w-sm border border-border-primary px-6 py-8 sm:px-8 md:p-12">
          <div className="mb-6 text-center md:mb-8">
            <h1 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="md:text-md">{description}</p>
          </div>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid">
              <Label htmlFor="email" className="mb-2">
                Email*
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid">
              <div className="flex justify-between">
                <Label htmlFor="password" className="mb-2">
                  Password*
                </Label>
                <a href={forgotPassword.url} className="underline">
                  {forgotPassword.text}
                </a>
              </div>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-4">
              <Button
                variant={logInButton.variant}
                size={logInButton.size}
                iconLeft={logInButton.iconLeft}
                iconRight={logInButton.iconRight}
              >
                {logInButton.title}
              </Button>
              <Button
                variant={logInWithGoogleButton.variant}
                size={logInWithGoogleButton.size}
                iconLeft={logInWithGoogleButton.iconLeft}
                iconRight={logInWithGoogleButton.iconRight}
                className="gap-x-3"
              >
                {logInWithGoogleButton.title}
              </Button>
            </div>
          </form>
          <div className="mt-5 flex justify-center gap-x-1 text-center md:mt-6">
            <p>{signUpText}</p>
            <a href={signUpLink.url} className="underline">
              {signUpLink.text}
            </a>
          </div>
        </div>
        <footer className="absolute bottom-0 left-0 right-0 flex h-16 w-full items-center justify-center md:h-18">
          <p className="text-sm">{footerText}</p>
        </footer>
      </div>
    </section>
  );
};

export const Login3Defaults: Props = {
  logo: {
    url: "#",
    src: "https://d22po4pjz3o32e.cloudfront.net/logo-image.svg",
    alt: "Logo text",
  },
  signUpText: "Don't have an account?",
  signUpLink: {
    text: "Sign up",
    url: "/signup",
  },
  title: "Log In",
  description: "Lorem ipsum dolor sit amet adipiscing elit.",
  logInButton: {
    title: "Log in",
  },
  logInWithGoogleButton: {
    variant: "secondary",
    title: "Log in with Google",
    iconLeft: <BiLogoGoogle className="size-6" />,
  },
  forgotPassword: {
    text: "Forgot your password?",
    url: "#",
  },
  footerText: "© 2025 Shopinit",
};
