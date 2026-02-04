import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer id="contact" className="w-full py-20 px-4 border-t border-white/5 bg-background text-center relative z-10">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">Let's create something together.</h2>
          <p className="text-white/50">Available for freelance projects worldwide.</p>
        </motion.div>
        
        <motion.a 
          href="mailto:hello@joshpopov.com"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-block text-lg font-medium text-white hover:text-white/80 transition-colors border-b border-white/20 pb-1 hover:border-white"
        >
          hello@joshpopov.com
        </motion.a>
        
        <div className="pt-12 text-[10px] text-white/20 tracking-[0.2em]">
          designed by josh popov
        </div>
      </div>
    </footer>
  );
}
