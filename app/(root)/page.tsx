import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-dotted-pattern bg-orange-50 bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Host, Connect and Celebrate Your Event with Nuevents!</h1>
            <p className="p-regular-20 md:p-regular-24">You can HOST your Event and connect with Customers, BOOK your favorite Event easily right here.</p>
            <Button size="lg" asChild className="bg-orange-600 rounded-lg hover:bg-orange-500 w-full sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>

          <Image
             src="/assets/images/hero.png" 
             alt="hero" 
             width={1000} 
             height={1000}
             className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
             >

             </Image>
        </div>

      </section>


      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 id="events" className="h2-bold">Trusted by <br /> Thousands of Events</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          Search
          CatagoryFilter
        </div>
      </section>
    </>
  );
}
