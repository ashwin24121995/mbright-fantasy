# MBRIGHT Fantasy Cricket - Project TODO

## Authentication System
- [x] Custom user registration with email/password
- [x] Custom login system (no OAuth)
- [x] Password reset functionality
- [x] Age verification (18+ only)
- [x] State restriction check (block restricted states)
- [x] Session management

## Public Pages
- [x] Homepage with hero section and features
- [x] About Us page
- [x] How To Play guide
- [x] FAQ page
- [x] Terms and Conditions
- [x] Privacy Policy
- [x] Fair Play Policy
- [x] Responsible Gaming page
- [x] Blog page
- [x] Contact Us page

## User Dashboard
- [x] User dashboard with stats
- [x] Profile page
- [x] Settings page
- [x] My Teams section

## Fantasy Cricket Features
- [x] Match listing and selection
- [x] Player database with stats
- [x] Team builder interface
- [x] Player selection (11 players)
- [x] Captain and Vice-Captain selection
- [x] Team validation rules
- [x] Final team submission

## Leaderboard System
- [x] Global leaderboard
- [x] Match-specific leaderboard
- [x] Points calculation system
- [x] Ranking display

## UI/UX Requirements
- [x] Navigation header with logo and badges
- [x] Footer with legal disclaimer
- [x] 18+ badge display
- [x] Fair Play badge display
- [x] Responsive design
- [x] Cricket green and gold theme

## Compliance
- [x] Restricted states: Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim, Telangana
- [x] 18+ age requirement enforcement
- [x] Legal disclaimer in footer
- [x] No real money messaging


## Updates & Improvements
- [x] Complete website redesign with modern UI
- [x] New color scheme and typography
- [x] Modern header with glassmorphism effect
- [x] Modern footer with multi-column layout
- [x] Redesigned homepage with animations
- [x] Updated authentication pages
- [x] Modern dashboard and feature pages

- [x] Change hero section image to new design

- [x] Generate 5 hero image samples for user selection
- [x] Apply Sample 2 (Action Shot) as hero image

- [x] Create new professional logo for MBRIGHT Fantasy (Championship badge style)

- [x] Fix footer logo visibility issue

- [x] Remove fake statistics and placeholder data from homepage

- [x] Prepare website for Railway deployment
- [x] Push code to GitHub repository
- [x] Create Railway deployment configuration

- [x] Fix Railway deployment errors (Invalid URL issue)
- [x] Remove Manus-specific dependencies for Railway compatibility
- [x] Create Railway environment setup guide

## Cricket API Integration
- [x] Request CRICKET_API_KEY from user
- [x] Create Cricket API service (server/_core/cricketApi.ts)
- [x] Add Cricket API functions (getCurrentMatches, getLiveMatches, etc.)
- [x] Test Cricket API connection
- [x] Create matches tRPC router
- [x] Update database schema for real matches and players (TypeScript errors fixed)
- [x] Update SelectMatch page to fetch real matches
- [x] Update BuildTeam page (simplified version, full Cricket API integration pending)
- [x] Implement live score auto-refresh (30 second interval on SelectMatch page)
- [ ] Update Leaderboard with real match results
- [ ] Add fantasy points calculation from API data
- [x] Test Cricket API integration (all tests passing)

## New Features - Phase 2
- [x] Add upcoming matches section to homepage
- [x] Add live matches section to homepage
- [x] Update BuildTeam page (simplified version, full Cricket API integration pending)
- [ ] Implement player selection with fantasy points display
- [ ] Create fantasy points calculation system
- [ ] Update Leaderboard to show real rankings based on Cricket API data
- [ ] Test all new features

## Team Builder - Full Cricket API Integration
- [x] Study fantasy points API endpoint structure and response format
- [x] Update Cricket API service to fetch player data from match_squad endpoint
- [x] Create player data transformation functions
- [x] Update tRPC routers to expose player selection endpoints
- [ ] Rebuild BuildTeam page with real player cards
- [ ] Implement player filtering by role (batsman, bowler, all-rounder, wicket-keeper)
- [ ] Add credit system (100 credits budget)
- [ ] Implement team validation (11 players, max 7 from one team)
- [ ] Add captain/vice-captain selection with point multipliers
- [ ] Test team builder with live match data

## Authentication Gate
- [ ] Add authentication check to all protected pages
- [ ] Redirect unauthenticated users to login/register form
- [ ] Show login/register modal when clicking on protected features

## Homepage Enhancement
- [x] Add detailed content sections (How It Works, Features, Why Choose Us)
- [x] Improve upcoming matches section with better cards and match details
- [x] Improve live matches section with live scores and auto-refresh
- [x] Add testimonials or user benefits section
- [x] Enhance visual design with animations and better spacing
