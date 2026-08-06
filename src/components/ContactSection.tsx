import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import {
  Mail,
  Send,
  Copy,
  Check,
  MapPin,
  Calendar,
  MessageSquare,
  Sparkles,
  Clock,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { user } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(user.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebration confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06B6D4', '#3B82F6', '#8B5CF6'],
      });

      // Reset form after delay
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitted(false);
      }, 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative px-4 sm:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-4"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Let's Build Something <span className="text-gradient-cyan">Exceptional</span>
          </motion.h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3">
            Have a project in mind, automation challenges, or technical queries? Drop a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column - Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Direct Email Card */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Mail className="w-6 h-6" />
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <span className="text-xs text-gray-400 font-medium block mb-1">Direct Email</span>
              <a
                href={`mailto:${user.email}`}
                className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors"
              >
                {user.email}
              </a>
            </div>

            {/* Location & Availability */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Base Location</span>
                  <span className="text-sm font-semibold text-white">{user.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Current Status</span>
                  <span className="text-sm font-semibold text-emerald-300">{user.availability}</span>
                </div>
              </div>
            </div>

            {/* Schedule Call Pill */}
            <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 text-center relative overflow-hidden">
              <Sparkles className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <h4 className="text-base font-bold text-white mb-1">Need Immediate Consultation?</h4>
              <p className="text-xs text-gray-400 mb-4">Book a 30-min technical discovery call directly.</p>
              <a
                href={`mailto:${user.email}?subject=Consultation%20Request`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/30 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a Meeting</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column - Glossy Glass Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-panel-glow p-8 rounded-3xl border border-white/10 shadow-2xl relative"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
                <p className="text-gray-300 text-sm max-w-md">
                  Thank you for getting in touch. I'll review your query and respond within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">
                      Your Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Hiring / Automation Project"
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, timeline, or objectives..."
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_45px_rgba(6,182,212,0.5)] hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
