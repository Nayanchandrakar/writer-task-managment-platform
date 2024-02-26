import Link from "next/link";
import Image from "next/image";
import { ArrowRightCircle, Star } from "lucide-react";

import Container from "@components/ui/shared/container";
import CallToAction from "@components/ui/shared/call-to-action";

const HomePage = () => {
  const trial = [2, 2, 2, 2, 2];

  return (
    <>
      <Container className="">
        <section className="pb-40 pt-32 md:pt-16">
          <div className="absolute bottom-0 right-0 overflow-hidden">
            <img
              className="w-full h-auto origin-bottom-right transform scale-150 lg:w-auto lg:mx-auto lg:object-cover lg:scale-75"
              src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/background-pattern.png"
              alt=""
            />
          </div>

          <div className="relative ">
            <div className="grid grid-cols-1 gap-y-4 lg:items-center lg:grid-cols-2 xl:grid-cols-2">
              <div className="text-center xl:col-span-1 lg:text-left md:px-16 lg:px-0 xl:pr-20">
                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight bg-gradient-to-r from-fuchsia-600 to-pink-600 text-transparent bg-clip-text">
                  An tool that helps you to manage your tasks.
                </h1>
                <p className="mt-2 text-lg text-gray-600 sm:mt-6 font-inter">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vehicula massa in enim luctus. Rutrum arcu.
                </p>

                <Link
                  href="/workspace"
                  className="inline-flex px-8 py-4 mt-8 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded sm:mt-10 font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  role="button"
                >
                  Try writer tools
                </Link>

                <div className="mt-8 sm:mt-16">
                  <div className="flex items-center justify-center lg:justify-start">
                    {trial?.map((e) => (
                      <Star className="size-6 fill-yellow-400 stroke-none" />
                    ))}
                  </div>

                  <blockquote className="mt-6">
                    <p className="text-lg font-bold text-gray-900 font-pj">
                      Best task managment tool in market!
                    </p>
                    <p className="mt-3 text-base leading-7 text-gray-600 font-inter">
                      Consectetur adipiscing elit. Vehicula massa in enim
                      luctus. Rutrum arcu, aliquam nulla tincidunt gravida.
                      Cursus convallis dolor semper pretium ornare.
                    </p>
                  </blockquote>
                </div>
              </div>

              <div className="xl:col-span-1">
                <img
                  className="w-full mx-auto"
                  src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/illustration.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </Container>
      <CallToAction />
    </>
  );
};

export default HomePage;
