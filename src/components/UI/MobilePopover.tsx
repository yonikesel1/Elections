"use client";
import * as Popover from "@radix-ui/react-popover";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function MobilePopover({
  content,
  children,
}: {
  content: ReactNode;
  children: ReactNode;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content side="bottom" align="center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="rounded-lg bg-neutral-800 px-3 py-1 text-sm text-white shadow-lg"
          >
            {content}
          </motion.div>
          <Popover.Arrow className="fill-neutral-800" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
