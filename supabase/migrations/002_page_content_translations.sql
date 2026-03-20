-- Migration: add translations JSONB column to page_content
-- Run this in your Supabase SQL editor.

alter table public.page_content
  add column if not exists translations jsonb not null default '{}';
