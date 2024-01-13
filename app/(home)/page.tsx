import Link from "next/link";
import Image from "next/image";
import { ArrowRightCircle } from "lucide-react";

import Container from "@components/ui/shared/container";
import CallToAction from "@components/ui/shared/call-to-action";

const HomePage = () => {
  return (
    <>
      <Container className="bg-gray-100/60">
        <section className=" bg-opacity-30 py-10 sm:py-14 lg:py-20">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="text-base font-semibold tracking-wider text-blue-700 uppercase">
                A Platform for Managers
              </p>
              <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                Write & manage your task.
              </h1>
              <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                Grow your career fast with writer.
              </p>
              <p className="mt-5 text-gray-600">
                Already joined us?{" "}
                <Link
                  href="/sign-in"
                  className="text-black transition-all duration-200 hover:underline"
                >
                  Log in
                </Link>
              </p>

              <span
                className="inline-flex items-center px-6 py-4 mt-6  font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-8 hover:bg-yellow-400 focus:bg-yellow-400"
                role="button"
              >
                Get writer for free
                <ArrowRightCircle className="w-6 h-6 ml-8 -mr-2" />
              </span>
            </div>

            <div>
              <Image
                width={100}
                height={100}
                sizes="100vw"
                priority
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
                alt="image-not-found"
              />
            </div>
          </div>
        </section>
      </Container>
      <CallToAction />
    </>
  );
};

export default HomePage;
