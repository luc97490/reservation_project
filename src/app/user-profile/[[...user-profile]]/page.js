import { UserProfile } from "@clerk/nextjs";
import "./style.css";
import React from "react";

export default function page() {
  return (
    <div className="flex mt-4 justify-center">
      <UserProfile
        appearance={{
          elements: {
            modalBackdrop: "dark:bg-white",
            card: "dark:bg-transparent",
            scrollBox: "dark:bg-secondary-dark",
            navbar: "dark:bg-primary-dark  dark:rounded-2xl",
            navbarButton: "dark:text-white",
            headerTitle: "dark:text-white",
            headerSubtitle: "dark:text-white",
            profileSectionTitleText: "dark:text-white",
            userPreviewMainIdentifier: "dark:text-yellow-300",
            accordionTriggerButton: "dark:text-yellow-300",
            accordionContent: "dark:text-white",
            breadcrumbsItem: "dark:text-white",
            formFieldLabel: "dark:text-white",
          },
        }}
        path="/user-profile"
        routing="path"
      />
    </div>
  );
}
