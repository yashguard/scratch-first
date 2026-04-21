import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { toast } from 'sonner';
import SectionTitle from './SectionTitle';

const rsvpSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Please enter a valid email').max(255),
  phone: z.string().trim().min(10, 'Please enter a valid phone number').max(15),
  attendance: z.enum(['accept', 'decline']),
});

type RSVPData = z.infer<typeof rsvpSchema>;

// ── Shared input style ────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  borderBottom: '1px solid rgba(184,134,11,0.35)',
  outline: 'none',
  padding: '0.75rem 0',
  fontFamily: 'inherit',
  fontSize: '1rem',
  color: '#2D0808',
  transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'inherit',
  fontSize: '0.7rem',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color: 'rgba(180,135,10,0.9)',
  marginBottom: '0.5rem',
};

const RSVPForm = () => {
  const [form, setForm] = useState<RSVPData>({
    name: '', email: '', phone: '', attendance: 'accept',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RSVPData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof RSVPData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = rsvpSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RSVPData, string>> = {};
      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0] as keyof RSVPData] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    console.log('RSVP submitted:', result.data);
    setSubmitted(true);
    toast.success('Thank you for your RSVP!', {
      description: form.attendance === 'accept'
        ? 'We are delighted that you will be joining us.'
        : 'We will miss you. Thank you for letting us know.',
    });
  };

  const sectionStyle: React.CSSProperties = {
    background: 'linear-gradient(160deg, #FAF3E0 0%, #F0E6C8 50%, #FAF3E0 100%)',
  };

  if (submitted) {
    return (
      <section
        className="relative py-24 md:py-32 px-4 overflow-hidden"
        style={sectionStyle}
      >
        {/* Mehndi dot texture */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, #B8860B 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center relative z-10"
        >
          {/* Gold ornament */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span style={{ flex: 1, maxWidth: '5rem', height: '1px', background: '#B8860B', display: 'block' }} />
            <span className="font-body text-xs" style={{ color: '#B8860B' }}>✦</span>
            <span style={{ flex: 1, maxWidth: '5rem', height: '1px', background: '#B8860B', display: 'block' }} />
          </div>
          <h2 className="font-heading mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#2D0808' }}>
            Response Received
          </h2>
          <p className="font-body" style={{ fontSize: '1.1rem', color: 'rgba(45,8,8,0.65)', lineHeight: 1.7 }}>
            {form.attendance === 'accept'
              ? 'We are overjoyed and look forward to celebrating with you!'
              : 'We understand and will miss your presence dearly.'}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      style={sectionStyle}
    >
      {/* Mehndi dot texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #B8860B 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-xl mx-auto relative z-10">

        {/* Section title */}
        <div className="text-center">
          <SectionTitle
            label="Pratiksha"
            heading="RSVP"
            description="Please let us know if you will be joining us to celebrate our union"
            dark={false}
          />
        </div>

        {/* ── Form card ─────────────────────────────────────────────────────── */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.8 }}
          style={{
            background: 'rgba(255,255,255,0.55)',
            border: '1px solid rgba(184,134,11,0.25)',
            borderRadius: '16px',
            padding: 'clamp(2rem, 5vw, 3rem)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Name */}
            <div>
              <label style={labelStyle}>Your Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="Full Name"
                style={inputStyle}
                className="font-body placeholder:text-[rgba(45,8,8,0.5)] focus:border-b-[#B8860B]"
              />
              {errors.name && (
                <p className="font-body text-xs mt-1" style={{ color: '#8B0000' }}>{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="your@email.com"
                style={inputStyle}
                className="font-body placeholder:text-[rgba(45,8,8,0.5)]"
              />
              {errors.email && (
                <p className="font-body text-xs mt-1" style={{ color: '#8B0000' }}>{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => handleChange('phone', e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                style={inputStyle}
                className="font-body placeholder:text-[rgba(45,8,8,0.5)]"
              />
              {errors.phone && (
                <p className="font-body text-xs mt-1" style={{ color: '#8B0000' }}>{errors.phone}</p>
              )}
            </div>

            {/* Attendance */}
            <div>
              <label style={labelStyle}>Will You Be Joining Us?</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {/* Joyfully Accept */}
                <button
                  type="button"
                  onClick={() => handleChange('attendance', 'accept')}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    border: form.attendance === 'accept'
                      ? '1.5px solid rgba(184,134,11,0.75)'
                      : '1.5px solid rgba(184,134,11,0.25)',
                    borderRadius: '10px',
                    background: form.attendance === 'accept'
                      ? 'rgba(184,134,11,0.1)'
                      : 'transparent',
                    color: form.attendance === 'accept' ? '#2D0808' : 'rgba(45,8,8,0.45)',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    letterSpacing: '0.04em',
                  }}
                  className="font-body"
                >
                  Joyfully Accept
                </button>

                {/* Regretfully Decline */}
                <button
                  type="button"
                  onClick={() => handleChange('attendance', 'decline')}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    border: form.attendance === 'decline'
                      ? '1.5px solid rgba(139,0,0,0.55)'
                      : '1.5px solid rgba(184,134,11,0.25)',
                    borderRadius: '10px',
                    background: form.attendance === 'decline'
                      ? 'rgba(139,0,0,0.07)'
                      : 'transparent',
                    color: form.attendance === 'decline' ? '#2D0808' : 'rgba(45,8,8,0.45)',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    letterSpacing: '0.04em',
                  }}
                  className="font-body"
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="font-body uppercase"
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #3A0C0C 0%, #2D0808 100%)',
                color: '#FFFFFF',
                border: '1px solid rgba(212,175,55,0.35)',
                borderRadius: '100px',
                fontSize: '0.78rem',
                letterSpacing: '0.22em',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
            >
              Send Response
            </motion.button>

          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVPForm;
