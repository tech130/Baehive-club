import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What do I get with the ₹2,500 lifetime membership?",
    answer:
      "Full access to the SNB Club community, all online sessions, sub-clubs, weekly challenges, member-only drops, and invitations to all chapter events. Individual offline events and special experiences are ticketed separately.",
  },
  {
    question: " Do I have to attend every event?",
    answer:
      " Absolutely not. Join the ones that excite you, skip the ones that don't. The membership never expires so there's no pressure — ever.",
  },
  {
    question: "I'm not in Chennai. Can I still join?",
    answer:
      "Yes! The online community and all virtual sessions are open to members across India. Offline chapters are expanding to more cities soon.",
  },
  {
    question: "How do I get added to the WhatsApp community after payment?",
    answer:
      "You'll receive a WhatsApp invite link on your registered email immediately after your payment is confirmed. If you don't receive it within 10 minutes, drop us a DM on Instagram.",
  },
   {
    question: "Can I join multiple sub-clubs?",
    answer:
      "Absolutely. Join as many as you want — book club, art studio, fitness, journaling, games — all included in your membership",
  },
   {
    question: "What if I want to attend an offline event?",
    answer:
      "Offline events like café meetups, workshops, and special experiences are ticketed individually. Members always get early access and member pricing.",
  },
  {
    question: "Is this only for Chennai women?",
    answer:
      "Not at all. The SNB Club is for women across India. We're starting events in Chennai and expanding city by city. Online sessions are open to everyone.",
  }
];

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="relative bg-bg-light py-24" id="faq">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* LEFT SIDE */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-manrope text-5xl font-light leading-tight text-text-dark">
                Frequently Asked
                <br />
                <span className="gradient-text1">Questions</span>
              </h2>
              <p className="font-manrope text-base text-text-dark">
                Visit our Frequently Asked Questions to find helpful information.
              </p>
            </div>

            {/* CONTACT BOX */}
            <div className="p-8 rounded-[20px] border border-text-dark/20 space-y-6">
              <div className="space-y-2">
                <h3 className="font-manrope text-2xl font-semibold">
                  Can't locate the answers you need?
                </h3>
                <p className="font-manrope text-lg font-semibold text-text-dark/50">
                  We're here to help with any questions you have!
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-manrope text-base font-semibold text-text-dark/50 block mb-2">
                    Ask Your Question
                  </label>
                  <input
                    type="text"
                    placeholder="Write here..."
                    className="w-full px-6 py-4 rounded-[10px] border border-text-dark/20 font-manrope text-base placeholder:text-text-dark/20 focus:outline-none"
                  />
                </div>

                <button className="px-8 py-4 rounded-[25px] bg-gradient-primary text-white font-manrope text-base font-semibold hover:opacity-90 transition">
                 <span className="gradient-text1">SEND NOW</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - ACCORDION */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-text-dark/30 pb-5"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-start gap-5 text-left"
                >
                  {/* ICON */}
                  <div className="w-5 h-5 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Plus
                      className={`w-3 h-3 text-white transition-transform duration-300 ${
                        openFaq === index ? "rotate-45" : "rotate-0"
                      }`}
                    />
                  </div>

                  {/* TEXT */}
                  <div className="flex-1">
                    <h3 className="font-manrope text-lg font-semibold text-black mb-3">
                      {faq.question}
                    </h3>

                    {openFaq === index && (
                      <p className="font-manrope text-sm text-black leading-relaxed animate-fade-in">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DECORATIVE BLUR */}
      <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-gradient-primary opacity-30 blur-3xl" />
    </section>
  );
}
