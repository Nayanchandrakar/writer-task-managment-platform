import { auth } from "@clerk/nextjs";
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
      subscription.stripeCustomerId !== null &&
      subscription.stripePaymentId !== null &&
      subscription.price !== null;

    return {
      isPro: !!hasSubscription,
    };
  } catch (error) {
    return {
      isPro: false,
    };
  }
};
