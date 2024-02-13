"use client";

import DialogModal from "@components/modals/dialog-modal";
import { useSubscription } from "@hooks/use-subscription-modal";
import { FC } from "react";
import Image from "next/image";
import { DialogFooter, DialogHeader } from "@components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { SubscriptionButton } from "./subscription-button";

interface SubscriptionModalProps {
  isPro: boolean;
}

const SubscriptionModal: FC<SubscriptionModalProps> = ({ isPro }) => {
  const subscription = useSubscription();

  return (
    <DialogModal
      isOpen={subscription?.isOpen}
      onClose={subscription?.onClose}
      onOpen={subscription?.onOpen}
      className="p-0"
    >
      <Image
        src="/images/subscription.jpg"
        width={1000}
        height={1000}
        priority
        sizes="100vw"
        alt="subscription-modal"
        className="relative  inset-0 h-[90%] object-cover rounded-t-lg"
      />

      <div className="pb-4 px-8 space-y-4">
        <DialogHeader className="text-[1.4vw] font-semibold">
          Upgrade to writer Pro today!
        </DialogHeader>
        <DialogDescription className="space-y-4">
          <span className="font-semibold text-base">
            Explore the best of writer
          </span>
          <div className="flex items-start flex-col">
            <li>Unlimited workspace creation</li>
            <li>Unlimited notes creation</li>
            <li>And more!</li>
          </div>
        </DialogDescription>

        <DialogFooter>
          <SubscriptionButton isPro={isPro} />
        </DialogFooter>
      </div>
    </DialogModal>
  );
};

export default SubscriptionModal;
