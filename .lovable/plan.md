

# ATA Seattle Website Rebuild

## Overview
A modern rebuild of the American Telangana Association of Seattle website with cultural warmth (gold/orange/saffron tones), featuring event management, membership, and an admin dashboard. Uses Lovable Cloud (Supabase) for backend.

## Pages & Features

### 1. Public Pages

**Home Page**
- Hero section with image carousel showcasing recent events
- About ATA-Seattle section
- Upcoming events preview (next 3 events)
- Recent announcements ticker/cards
- Quick links to membership, donate, contact
- Footer with social links (Facebook, Instagram), contact info

**Events Page**
- Tabs: "Upcoming" and "Past Events"
- Event cards with image, date, title, description, location
- RSVP button for free events, "Get Tickets" placeholder for paid events
- Past events shown as a gallery/grid with photos and descriptions

**Membership Page**
- Three tiers displayed as pricing cards: Individual, Family, Lifetime
- Benefits comparison
- "Join Now" button leading to enrollment form
- Enrollment form: name, email, phone, address, tier selection, family member details (for family tier)
- Mock payment placeholder for paid tiers

**Leadership Team Page**
- Grid of leadership members with photos, names, titles

**Contact Page**
- Contact form (name, email, message)
- Organization email and social links

### 2. Member Portal (after login)
- View membership status and tier
- See RSVP'd events
- Update profile info

### 3. Admin Dashboard (protected)
- **Events Management**: Create/edit/delete events, mark as free or paid, set ticket price, upload event images
- **Announcements**: Create/edit/delete announcements
- **Membership Management**: View all members, filter by tier, approve/manage memberships
- **Gallery Management**: Upload photos to past events

## Database (Lovable Cloud / Supabase)
- `events` — title, description, date, location, image, is_free, ticket_price, status
- `event_rsvps` — event_id, user_id, created_at
- `announcements` — title, content, published_at
- `membership_tiers` — name, price, benefits, duration
- `memberships` — user_id, tier_id, status, start_date, end_date
- `leadership` — name, title, photo, order
- `gallery_images` — event_id, image_url, caption
- `profiles` — user_id, full_name, phone, address
- `user_roles` — user_id, role (admin/user)

## Authentication
- Email/password sign up and login
- Role-based access: admin vs regular member

## Design
- Warm cultural theme: saffron/gold gradient header, ornamental accents
- Modern card-based layouts with clean typography
- Fully responsive (mobile-first)
- shadcn/ui components throughout

