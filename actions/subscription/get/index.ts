import { auth } from "@clerk/nextjs";
import { DAY_IN_MS } from "@constants";
import prismadb from "@lib/prismadb";

export const getSubscription = async () => {
  try {
    const { userId } = auth();
    if (!userId) {
      return {
        isPro: false,
      };
    }

    const subscription = await prismadb?.subscriptions?.findFirst({
      where: {
        userId,
      },
    });

    if (!subscription) {
      return {
        isPro: false,
      };
    }

    const hasSubscription =
      subscription?.stripePriceId &&
      subscription?.stripeCurrentPeriodEnd?.getTime()! * DAY_IN_MS >
        Date.now() &&
      subscription?.stripeCustomerId &&
      subscription?.stripeSubscriptionId;

    return {
      isPro: !!hasSubscription,
    };
  } catch (error) {
    return {
      isPro: false,
    };
  }
};
