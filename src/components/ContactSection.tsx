import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/personalInfo';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import {
  Mail,
  Send,
  Copy,
  Check,
  MapPin,
  MessageSquare,
  Sparkles,
  Phone,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
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
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebration confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#06B6D4', '#3B82F6', '#8B5CF6', '#10B981'],
      });

      // Construct mailto fallback
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Inquiry from ' + formData.name
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;

      // Reset form after delay
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="py-24 relative px-4 sm:px-8 z-10 border-t border-white/[0.04]"
    >
      {/* Subtle Ambient Glow Spotlights */}
      <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] bg-cyan-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[420px] h-[420px] bg-purple-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
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
            Let's Discuss <span className="text-gradient-cyan">Your Next Project</span>
          </motion.h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3">
            Open for full-time QA Automation, SDET, and Python Developer roles. Feel free to reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column - Contact Info Glass Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Direct Email Card with Copy Button */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
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
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <span className="text-xs text-gray-400 font-medium block mb-1">Email Address</span>
              <a
                href={personalInfo.socials.email}
                className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors block break-all"
              >
                {personalInfo.email}
              </a>
            </div>

            {/* Direct Phone Card */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Direct Line
                </span>
              </div>

              <span className="text-xs text-gray-400 font-medium block mb-1">Phone / WhatsApp</span>
              <a
                href={personalInfo.socials.phone}
                className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors block font-mono"
              >
                {personalInfo.phone}
              </a>
            </div>

            {/* Location & Availability Status */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Location</span>
                  <span className="text-sm font-semibold text-white">{personalInfo.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Current Status</span>
                  <span className="text-sm font-semibold text-cyan-300">{personalInfo.availability}</span>
                </div>
              </div>
            </div>

            {/* Social Handles Grid */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                className="glass-card p-4 rounded-2xl border border-white/10 hover:border-white/30 flex items-center gap-3 group transition-all"
              >
                <div className="p-2 rounded-xl bg-white/5 text-gray-300 group-hover:text-white">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">GitHub</span>
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    navin-19
                  </span>
                </div>
              </a>

              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="glass-card p-4 rounded-2xl border border-white/10 hover:border-cyan-500/40 flex items-center gap-3 group transition-all"
              >
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">LinkedIn</span>
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Naveenkumar
                  </span>
                </div>
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
                <h3 className="text-2xl font-bold text-white mb-2">Message Initiated!</h3>
                <p className="text-gray-300 text-sm max-w-md">
                  Your mail client has been opened with your inquiry. I will get back to you promptly!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider">
                    Send Direct Message
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
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

                  {/* Email */}
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

                {/* Subject */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="QA Automation / Python Development Opportunity"
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>

                {/* Message */}
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
                    placeholder="Describe your project, position requirements, or inquiry..."
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
                      <ArrowRight className="w-4 h-4" />
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
