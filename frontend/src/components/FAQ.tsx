import { homepageFaqs } from "@/lib/seo";

const FAQ = () => {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-12 lg:py-24 px-6 bg-surface relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8 lg:mb-12">
          <h2 id="faq-heading" className="text-2xl md:text-5xl font-bold mb-4 font-syncopate">
            Frequently Asked Questions
          </h2>
          <div className="w-16 lg:w-20 h-1.5 bg-primary rounded-full mb-4 lg:mb-6" />
          <p className="text-muted max-w-2xl text-sm lg:text-base font-rajdhani">
            Answers for businesses comparing software development, AI product engineering, cloud infrastructure, and digital product partners.
          </p>
        </div>

        <div className="space-y-4">
          {homepageFaqs.map((entry) => (
            <article key={entry.question} className="glass border-line p-5 lg:p-6">
              <h3 className="text-base lg:text-xl font-bold text-foreground font-syncopate">
                {entry.question}
              </h3>
              <p className="mt-3 text-sm lg:text-base leading-relaxed text-muted font-rajdhani">
                {entry.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
