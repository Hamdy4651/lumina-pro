/*
# Create Lumina appointments (single-tenant, no sign-in)

1. New Tables
- `lumina_appointments`
- `id` (uuid, primary key)
- `service` (text, selected treatment)
- `doctor` (text, selected doctor preference)
- `appointment_date` (date, requested date)
- `appointment_time` (text, requested time)
- `duration` (text, service duration)
- `price` (text, starting price)
- `name` (text, visitor name)
- `phone` (text, visitor phone)
- `email` (text, visitor email)
- `note` (text, optional visitor note)
- `created_at` (timestamp)
2. Security
- Enable row level security.
- Allow anonymous and authenticated visitors to submit and read appointments for this single-branch booking experience.
- Separate policies are provided for all four CRUD operations.
3. Important Notes
- No account or personal ownership is required for this public appointment request flow.
- The frontend only writes the fields needed to confirm a requested appointment.
*/

CREATE TABLE IF NOT EXISTS public.lumina_appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service text NOT NULL,
  doctor text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  duration text NOT NULL,
  price text NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.lumina_appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read lumina appointments" ON public.lumina_appointments;
CREATE POLICY "Public can read lumina appointments"
  ON public.lumina_appointments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can create lumina appointments" ON public.lumina_appointments;
CREATE POLICY "Public can create lumina appointments"
  ON public.lumina_appointments FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update lumina appointments" ON public.lumina_appointments;
CREATE POLICY "Public can update lumina appointments"
  ON public.lumina_appointments FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public can delete lumina appointments" ON public.lumina_appointments;
CREATE POLICY "Public can delete lumina appointments"
  ON public.lumina_appointments FOR DELETE
  TO anon, authenticated USING (true);