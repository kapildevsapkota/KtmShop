import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "The quality of the handcrafted items I received was exceptional. Each piece tells a story and brings a piece of Nepal into my home. The shipping was fast and everything was carefully packaged.",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Toronto, Canada",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "I've ordered multiple times from Kathmandu Shop and have never been disappointed. The authenticity of their products is unmatched, and their customer service is excellent.",
  },
  {
    id: 3,
    name: "Emma Wilson",
    location: "London, UK",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4,
    text: "The Pashmina shawl I purchased is absolutely beautiful and exactly as described. The colors are vibrant and the material is so soft. Will definitely be ordering more items soon!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
            What Our Customers Say
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Dont just take our word for it - hear from some of our satisfied
            customers
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="mr-4 h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
