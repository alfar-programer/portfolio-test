import React, { useEffect, useState } from 'react';
import emailjs from "@emailjs/browser";

const API_URL = 'http://localhost:8000/api/reviews';

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function Reviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      comment: "Absolutely amazing work! The attention to detail and modern design really impressed me. Highly recommend for anyone looking for quality development services.",
      approved: true,
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      name: "Michael Chen",
      comment: "Professional, responsive, and delivers exactly what you need. The portfolio showcases incredible talent and the projects speak for themselves.",
      approved: true,
      createdAt: "2024-01-12T14:20:00Z"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      comment: "Working with this developer was a fantastic experience. Clean code, on-time delivery, and excellent communication throughout the entire project.",
      approved: true,
      createdAt: "2024-01-10T09:15:00Z"
    },
    {
      id: 4,
      name: "David Thompson",
      comment: "Outstanding technical skills and creative problem-solving. The final product exceeded my expectations and the user experience is flawless.",
      approved: true,
      createdAt: "2024-01-08T16:45:00Z"
    }
  ]);
  const [form, setForm] = useState({ name: '', email: '', comment: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Comment out the API call for now to use fake data
    // fetch(API_URL)
    //   .then(res => res.json())
    //   .then(data => {
    //     setReviews(data);
    //     setLoading(false);
    //   })
    //   .catch(() => setLoading(false));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(data.message || 'Thank you for your review!');
      setForm({ name: '', email: '', comment: '' });
    } catch {
      setMessage('There was an error submitting your review.');
    }
    setSubmitting(false);
  };

  return (
    <section
      className="reviews min-h-screen flex items-center justify-center bg-transparent py-16 px-2"
      id="reviews"
    >
      <div className="w-full max-w-6xl mx-auto rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-6 md:p-10">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-white drop-shadow-lg tracking-tight">
          Customer Reviews
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Reviews Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">What People Say</h3>
            {loading ? (
              <p className="text-center text-white/80">Loading reviews...</p>
            ) : (
              <ul className="space-y-4">
                {reviews.length === 0 && (
                  <li className="text-center text-white/80">No reviews yet.</li>
                )}
                {reviews.map((r, i) => (
                  <li
                    key={r.id}
                    className="relative bg-white/20 border border-white/20 rounded-2xl px-4 py-4 flex flex-col shadow-lg animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.12 + 0.15}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-400 flex items-center justify-center font-bold text-sm text-white shadow-md border-2 border-white/30 flex-shrink-0">
                        {getInitials(r.name)}
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-white/90">{r.name}</span>
                        <p className="mt-1 text-white/80 text-sm">{r.comment}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Form Section */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-center text-white mb-2">Leave a Review</h3>
              <div className="relative">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="peer w-full py-3 px-4 rounded-lg bg-white/20 text-white placeholder-transparent outline-none border border-white/20 focus:border-blue-400 transition"
                  placeholder="Your name"
                />
                <label className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-base pointer-events-none transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-300 peer-not-empty:top-2 peer-not-empty:text-xs peer-not-empty:text-blue-300">
                  Your name
                </label>
              </div>
              <div className="relative">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  type="email"
                  className="peer w-full py-3 px-4 rounded-lg bg-white/20 text-white placeholder-transparent outline-none border border-white/20 focus:border-blue-400 transition"
                  placeholder="Your email"
                />
                <label className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-base pointer-events-none transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-300 peer-not-empty:top-2 peer-not-empty:text-xs peer-not-empty:text-blue-300">
                  Your email
                </label>
              </div>
              <div className="relative">
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="peer w-full py-3 px-4 rounded-lg bg-white/20 text-white placeholder-transparent outline-none border border-white/20 focus:border-blue-400 transition resize-vertical"
                  placeholder="Your review"
                />
                <label className="absolute left-4 top-4 text-white/60 text-base pointer-events-none transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-300 peer-not-empty:top-2 peer-not-empty:text-xs peer-not-empty:text-blue-300">
                  Your review
                </label>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="mt-2 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
              {message && <p className="text-center text-white/90 mt-2">{message}</p>}
            </form>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
} 