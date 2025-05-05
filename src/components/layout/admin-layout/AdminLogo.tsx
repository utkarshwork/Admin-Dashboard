import Link from "next/link";
import React, { useEffect, useState } from "react";
import { StyledLogoBox } from "./style";
import Image from "next/image";

export default function AdminLogo() {
  const [logo, setLogo] = useState("/logo.png");

  console.log(logo);

  const setLogoItem = localStorage.getItem("settingsLogo");
  useEffect(() => {
    const updateSettings = () => {
      const settings = localStorage.getItem("settings");
      if (settings) {
        const parsedSettings = JSON.parse(settings);

        document.title = parsedSettings.title || "NYC 2025";

        const metaDescription = document.querySelector(
          "meta[name='description']",
        ) as HTMLMetaElement;
        if (metaDescription) {
          metaDescription.content = parsedSettings.description || "NYC 2025";
        } else {
          const newMetaDescription = document.createElement("meta");
          newMetaDescription.name = "description";
          newMetaDescription.content = parsedSettings.description || "NYC 2025";
          document.head.appendChild(newMetaDescription);
        }

        const favicon = document.querySelector(
          "link[rel*='icon']",
        ) as HTMLLinkElement;

        const faviconPath =
          process.env.NEXT_PUBLIC_API_PATH + parsedSettings.favicon ||
          process.env.NEXT_PUBLIC_API_PATH + "/logo.png";

        if (favicon) {
          favicon.href = faviconPath;
        } else {
          const newFavicon = document.createElement("link");
          newFavicon.rel = "icon";
          newFavicon.href = faviconPath;
          document.head.appendChild(newFavicon);
        }

        const logo = parsedSettings.logo;
        if (logo) {
          setLogo(logo);
        }
      }
      localStorage.setItem("settingsLogo", "false");
    };
    updateSettings();
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === "settings") {
        updateSettings();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setLogoItem]);
  return (
    <StyledLogoBox>
      <Link href="/admin/dashboard" passHref>
        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={80}
          height={60}
          style={{ cursor: "pointer" }}
        />
      </Link>
    </StyledLogoBox>
  );
}
