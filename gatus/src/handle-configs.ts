/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: Gatus handles subst */
import fs from 'node:fs'
import path from 'node:path'
import { stringify } from 'yaml'
import type { Config } from './types'

const data: Config = {}

data.storage = {
  type: 'postgres',
  path: '${DATABASE_URL}?sslmode=disable',
}

data.metrics = true

data.alerting = {
  slack: {
    'webhook-url': '${SLACK_WEBHOOK_URL}',
    title: 'Gatus Alert',
    'default-alert': {
      description: 'health check failed',
      'send-on-resolved': true,
      'failure-threshold': 5,
      'success-threshold': 5,
    },
  },
}

data.endpoints = [
  {
    name: 'website',
    url: 'https://twin.sh/health',
    interval: '5m',
    conditions: ['[STATUS] == 200'],
    alerts: [{ type: 'slack' }],
  },
  {
    name: 'freshology',
    url: 'https://freshology.com/',
    interval: '10s',
    conditions: ['[STATUS] == 200', '[RESPONSE_TIME] < 1100'],
    alerts: [{ type: 'slack' }],
  },
  {
    name: 'github',
    url: 'https://api.github.com/healthz',
    interval: '5m',
    conditions: ['[STATUS] == 200'],
    alerts: [{ type: 'slack' }],
  },
  {
    name: 'check-domain-expiration',
    url: 'https://freshology.com/',
    interval: '1h',
    conditions: ['[DOMAIN_EXPIRATION] > 720h'],
    alerts: [{ type: 'slack' }],
  },
]

const yaml = stringify(data)

// const dir = __dirname;
const dir = process.cwd()
const configpath = path.join(dir, 'config.yaml')
fs.writeFileSync(configpath, yaml)

console.log(`Config file created at ${configpath}`)
