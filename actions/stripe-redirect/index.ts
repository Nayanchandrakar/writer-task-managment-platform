"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import prismadb from "../../lib/prismadb";
import { actionHandler } from "../../types/action-types";

import { StripeRedirect } from "./schema";
import { InputType, ReturnType } from "./type";

import { absoluteUrl } from "../../lib/utils";
import { stripe } from "../../lib/stripe";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    return {
      error: "Unauthorized",
    };
  }

  const settingsUrl = absoluteUrl(`/workspace`);

  let url = "";

  try {
    const userSubscription = await prismadb.subscriptions.findUnique({
      where: {
        userId,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Writer Pro",
                description:
                  "Unlimited workspace creation for mantaining your tasks",
              },
              unit_amount: 2000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId,
        },
      });

      url = stripeSession.url || "";
    }
  } catch {
    return {
      error: "Something went wrong!",
    };
  }

  revalidatePath(`/workspace`);
  return { data: url };
};

export const stripeRedirect = actionHandler(StripeRedirect, handler);
