import { Paper, UnstyledButton } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";

/**
 * Renders a context menu component.
 *
 * @prop {Array} controls - An array of control objects representing menu items. Each control object has an `onClick` function and a `label` string.
 * @prop {string} menuItemStyles - The CSS styles for the menu items.
 * @return {React.ReactElement} The rendered context menu component.
 */
export default function ContextMenu({
  controls,
  menuItemStyles,
}: {
  controls: {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    label: string;
  }[];
  menuItemStyles: string;
}): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Paper shadow="md" className="flex flex-col p-1 z-50">
      {controls.map((control, index) => (
        <UnstyledButton
          key={index}
          onClick={control.onClick}
          className={`${menuItemStyles} ${
            index === controls.length - 1 ? "text-red-600" : ""
          }`}
        >
          {t(control.label)}
        </UnstyledButton>
      ))}
    </Paper>
  );
}
