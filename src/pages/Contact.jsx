import { useState } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  Plus,
} from 'lucide-react';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import './Contact.css';

const FAQS = [
  {
    question: 'How do I place an order?',
    answer:
      'Browse the products in the Shop section, open a product to view its details, add it to your cart, and continue to checkout when you are ready.',
  },
  {
    question: 'Can I view my previous orders?',
    answer:
      'Yes. Open the Orders section from the navigation bar to view your previous orders and open an individual order to see its details.',
  },
  {
    question: 'How can I find a specific product?',
    answer:
      'Use the search option in the navigation bar or the search field on the Shop page. You can also filter products by category.',
  },
  {
    question: 'Are all products shown on NEXORA technology products?',
    answer:
      'NEXORA currently focuses its catalog on smartphones, laptops, tablets, and mobile accessories.',
  },
  {
    question: 'Can I change the quantity of an item in my cart?',
    answer:
      'Yes. You can adjust product quantities directly from the cart before proceeding to checkout. Quantities are also limited by the available product stock.',
  },
  {
    question: 'What should I do if I have a question about my order?',
    answer:
      'You can contact the NEXORA support team using the contact form above. Include your order information and a clear description of your question so we can assist you.',
  },
];

function Contact() {
  const [submitted, setSubmitted] =
    useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);
  }

  return (
    <main className="contact">
      <Section>
        <div className="contact__header">
          <span className="contact__eyebrow">
            CONTACT NEXORA
          </span>

          <h1>
            How can we help?
          </h1>

          <p>
            Have a question about our products
            or your order? Send us a message.
          </p>
        </div>

        <div className="contact__layout">
          <div className="contact__info">
            <div>
              <Mail size={20} />

              <div>
                <h2>Email</h2>

                <span>
                  support@nexora.store
                </span>
              </div>
            </div>

            <div>
              <Phone size={20} />

              <div>
                <h2>Phone</h2>

                <span>
                  +92 300 0000000
                </span>
              </div>
            </div>

            <div>
              <MapPin size={20} />

              <div>
                <h2>Location</h2>

                <span>
                  Pakistan
                </span>
              </div>
            </div>
          </div>

          <form
            className="contact__form"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name">
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                required
                rows="6"
                placeholder="How can we help?"
              />
            </div>

            <Button type="submit">
              Send message
            </Button>

            {submitted && (
              <p className="contact__success">
                Thanks. Your message has been
                received.
              </p>
            )}
          </form>
        </div>

        <section className="contact__faq">
          <div className="contact__faq-header">
            <span className="contact__eyebrow">
              FREQUENTLY ASKED QUESTIONS
            </span>

            <h2>
              Common questions, answered.
            </h2>

            <p>
              Find quick answers to common
              questions about shopping and
              using NEXORA.
            </p>
          </div>

          <div className="contact__faq-list">
            {FAQS.map((faq) => (
              <details
                className="contact__faq-item"
                key={faq.question}
              >
                <summary>
                  <span>
                    {faq.question}
                  </span>

                  <Plus
                    size={20}
                    className="contact__faq-icon"
                  />
                </summary>

                <div className="contact__faq-answer">
                  <p>
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </Section>
    </main>
  );
}

export default Contact;