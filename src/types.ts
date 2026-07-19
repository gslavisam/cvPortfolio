/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  company: string;
  role: string;
  period: string;
  description: string;
  longDescription: string;
  techStack: string[];
  metrics: { label: string; value: string; icon: string }[];
  accentColor: string;
}

export interface TimelineStep {
  id: number;
  title: string;
  titleEn?: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  actionType: 'search' | 'click' | 'code' | 'render' | 'system';
  description: string;
  descriptionEn?: string;
  timestamp: string;
  outputLog: string[];
  outputLogEn?: string[];
  screenshotUrl?: string;
  codeFiles?: { name: string; language: string; content: string }[];
}

export interface SystemProfile {
  name: string;
  email: string;
  location: string;
  title: string;
  bio: string;
  fullBio: string;
  skills: { category: string; list: string[] }[];
}

export interface ContactMessage {
  id: string;
  sender: string;
  email: string;
  message: string;
  timestamp: string;
}
