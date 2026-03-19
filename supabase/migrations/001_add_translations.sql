-- Migration: add translations JSONB column to content tables
-- Run this in your Supabase SQL editor.
-- English content stays in the original columns; translations holds NL and PAP overrides.

alter table public.events
  add column if not exists translations jsonb not null default '{}';

alter table public.news
  add column if not exists translations jsonb not null default '{}';

alter table public.training_sessions
  add column if not exists translations jsonb not null default '{}';
