// tests/setup.js
import { config } from '@vue/test-utils';
import Vuetify from 'vuetify';
import { createVuetify } from 'vuetify';
import { jest } from '@jest/globals';

// Create a Vuetify instance
const vuetify = createVuetify();

// Mock Vuetify use
config.global.plugins = [vuetify];

// Optional: Add any global mocks, stubs, etc. for Vuetify components
jest.mock('vuetify');
