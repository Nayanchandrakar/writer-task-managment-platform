"use client";

import { toast } from "sonner";

import { useAction } from "../../hooks/useAction";
import { Button } from "../../components/ui/button";
import { stripeRedirect } from "../../actions/stripe-redirect/index";
import { useSubscription } from "../../hooks/use-subscription-modal";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const proModal = useSubscription();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    if (!isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  };

  return (
    <Button className="w-full" onClick={onClick} disabled={isLoading}>
      {isPro ? "Manage subscription" : "Upgrade to pro"}
    </Button>
  );
};
