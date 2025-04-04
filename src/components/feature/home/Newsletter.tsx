import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="bg-primary py-12 text-white md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-6 text-primary-foreground/90">
            Stay updated with our latest products, special offers, and stories
            from Nepal.
          </p>
          <form className="mx-auto flex max-w-md flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Input
              type="email"
              placeholder="Your email address"
              className="border-primary-foreground/20 bg-white/10 text-white placeholder:text-primary-foreground/60"
            />
            <Button variant="secondary" type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
