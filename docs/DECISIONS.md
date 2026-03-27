# Growonio — Key Decisions Log

## 1. Core Business Direction

- Brand: **Growonio**
- Tagline: **Business automation built for growth**
- Primary market: **Romania**
- Language strategy: Romanian default, English secondary
- Positioning: modern tech solutions studio for service businesses

## 2. Offer Focus

Growonio stays focused on:

- websites
- booking systems
- client management
- lead capture
- workflow automation

Mobile apps remain secondary, not the main homepage sales hook.

## 3. CMS Boundary

Use a hybrid CMS approach.

Database-driven content:

- services
- pricing
- work / portfolio
- articles
- FAQs
- company settings

Code-managed structure:

- layout system
- section order
- navigation
- SEO logic
- motion rules
- reusable card variants

## 4. Homepage Simplification

Decision:
**The homepage will be simplified into a shorter summary-first page.**

Reason:

- current homepage is too broad
- future detail should live on internal pages
- the homepage must explain Growonio quickly

## 5. Final Homepage Section Order

Locked order:

1. Hero
2. Services Preview
3. Featured Work Preview
4. Process Snapshot
5. Final CTA

## 6. Homepage Sections to Remove or Merge

- remove the standalone industries / solutions preview from the homepage
- remove the standalone proof / trust section from the homepage
- keep trust signals, but fold them into the hero, work preview, and CTA
- keep process, but in a compressed summary form

## 7. Homepage Data Source Strategy

Homepage sections that should use database content:

- services preview
- featured portfolio / work preview

Homepage decisions that remain hardcoded:

- homepage layout
- section structure
- card variants
- CTA placement
- motion behavior

## 8. Homepage Hero Strategy

Decision:
**The homepage hero uses fixed product-style visuals, not an abstract generated scene.**

Locked composition:

- left text block with headline, short support copy, CTAs, and trust chips
- one desktop dashboard image
- one mobile image
- one HTML/CSS automation card

Motion rule:

- desktop image stays fixed
- subtle motion only on the mobile image and automation card

## 9. Homepage Visual Direction

Decision:
**Shift the homepage palette away from soft pink/lavender toward deep violet and indigo.**

Locked direction:

- deep violet
- indigo
- graphite
- off-white
- more neutral whitespace
- more serious modern-tech feel

Avoid:

- pink-heavy feel
- playful visuals
- fake enterprise styling
- clutter

## 10. Homepage Content Rule

Decision:
**The homepage is a curated summary, not a detail-heavy brochure.**

Practical rule:

- explain what Growonio does fast
- show focused proof
- keep hierarchy strong
- push deeper service, niche, and explanation content into internal pages

## 11. Public Form Success Criteria

Decision:
**A public form submission counts as successful only when the Resend notification email is accepted for delivery.**

Reason:

- the business goal for this phase is inbox delivery, not only database persistence
- a Supabase-only write is not enough if Growonio never sees the inquiry
- users must not see a false-positive success state

## 12. Public Form Delivery Defaults

Decision:
**The shared public-form delivery path defaults to the current live mailbox setup unless env values intentionally override it.**

Current defaults:

- sender: `Growonio <hello@growonio.ro>`
- notification inbox: `growoniohq@gmail.com`
- public contact email: `hello@growonio.ro`

Reason:

- the active business setup is already known for this phase
- missing optional env values should not silently disable email delivery again

## 13. Public Form Storage Priority

Decision:
**Supabase storage remains best-effort secondary behavior for public forms in this phase.**

Reason:

- reliable email notification is the operational requirement right now
- storage/admin review can be expanded in the next phase without blocking form delivery
