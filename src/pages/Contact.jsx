import React from 'react'
import { motion } from 'framer-motion'

export default function Contact(){
  return (
    <section className="grid md:grid-cols-2 gap-6">
      <motion.div className="glass-card">
        <h2 className="text-2xl font-bold">Get in touch</h2>
        <p className="text-slate-300 mt-2">Open to consulting, collaborations, and speaking at events.</p>

        <div className="mt-4">
          <div className="text-slate-400">Email</div>
          <a className="block mt-1 text-white font-semibold" href="mailto:youremail@example.com">youremail@example.com</a>

          <div className="text-slate-400 mt-4">Phone</div>
          <div className="mt-1">+1 763-202-0270</div>

          <div className="text-slate-400 mt-4">Location</div>
          <div className="mt-1">San Francisco, CA</div>
        </div>
      </motion.div>

      <motion.div className="glass-card">
        <h3 className="font-semibold">Message</h3>
        <form action="https://formspree.io/f/your-form-id" method="POST" className="mt-3 flex flex-col gap-3">
          <input name="name" placeholder="Name" className="p-2 rounded bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]" />
          <input name="email" placeholder="Email" className="p-2 rounded bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]" />
          <textarea name="message" rows="5" placeholder="Quick message" className="p-2 rounded bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]"></textarea>
          <button type="submit" className="bg-accent px-4 py-2 rounded text-slate-800 font-semibold">Send</button>
        </form>
        <div className="text-slate-400 text-xs mt-3">Tip: replace the Formspree action with your own or integrate an email / serverless function for leads.</div>
      </motion.div>
    </section>
  )
}
