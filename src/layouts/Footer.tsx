"use client";

import { useRouter } from "next/navigation";

export const Footer = () => {
  const router = useRouter();

  const switchLanguage = (language: string) => {
    router.push(language);
  };
  return (
    <footer>
      <div>
        <button onClick={() => switchLanguage("en")}>English</button>
        <button onClick={() => switchLanguage("vi")}>Vietnamese</button>
      </div>
    </footer>
  );
};
