// src/components/common/Button.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const baseMotion = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
};

export default function Button({
  children,
  as,
  to,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  ...rest
}) {
  const classes = `btn-${variant} ${className}`;
  const anchorProps = rest;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...anchorProps}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onClick={onClick}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const Comp = as || motion.button;
  const isMotion = Comp === motion.button;

  return (
    <Comp
      type={type}
      onClick={onClick}
      className={classes}
      {...(isMotion ? baseMotion : {})}
      {...anchorProps}
    >
      {children}
    </Comp>
  );
}