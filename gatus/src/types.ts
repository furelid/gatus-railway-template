type Overrides<T> = {
  group: string
} & Omit<T, 'overrides'>

type DefaultAlert = {
  enabled?: boolean
  failureThreshold?: number
  successThreshold?: number
  sendOnResolved?: boolean
  description?: string
}

type BaseAlertConfig = {
  defaultAlert?: DefaultAlert
}

namespace AlertConfigProviders {
  export type AWSSES = BaseAlertConfig & {
    accessKeyId: string
    secretAccessKey: string
    region: string
    from: string
    to: string[]
    overrides?: Overrides<AWSSES>[]
  }
  export type ClickUp = BaseAlertConfig & {
    apiToken: string
    listId: string
    overrides?: Overrides<ClickUp>[]
  }
  export type Custom = BaseAlertConfig & {
    url: string
    method?: string
    body?: string
    headers?: Record<string, string>
    // client?: ClientConfig;
    placeholders?: Record<string, Record<string, string>>
    overrides?: Overrides<Custom>[]
  }
  export type Datadog = BaseAlertConfig & {
    apiKey: string
    appKey: string
    overrides?: Overrides<Datadog>[]
  }
  export type Discord = BaseAlertConfig & {
    webhookUrl: string
    overrides?: Overrides<Discord>[]
  }
  export type Email = BaseAlertConfig & {
    smtpHost: string
    smtpPort: number
    username: string
    password: string
    from: string
    to: string[]
    overrides?: Overrides<Email>[]
  }
  export type Gitea = BaseAlertConfig & {
    url: string
    token: string
    repository: string
    overrides?: Overrides<Gitea>[]
  }
  export type GitHub = BaseAlertConfig & {
    token: string
    repository: string
    overrides?: Overrides<GitHub>[]
  }
  export type PagerDuty = BaseAlertConfig & {
    integrationKey: string
    overrides?: Overrides<PagerDuty>[]
  }
  export type Generic = BaseAlertConfig & {
    // biome-ignore lint/suspicious/noExplicitAny: <ee>
    [key: string]: any
    overrides?: Overrides<Generic>[]
  }
}

type AlertConfigProvider =
  | AlertConfigProviders.AWSSES
  | AlertConfigProviders.ClickUp
  | AlertConfigProviders.Custom
  | AlertConfigProviders.Datadog
  | AlertConfigProviders.Discord
  | AlertConfigProviders.Email
  | AlertConfigProviders.Gitea
  | AlertConfigProviders.GitHub
  | AlertConfigProviders.PagerDuty
  | AlertConfigProviders.Generic

type AlertConfig = {
  [key: string]: AlertConfigProvider
}

type StorageConfig = {
  type: 'memory' | 'sqlite' | 'postgres'
  path?: string
  caching?: boolean
  'maximum-number-of-results'?: number
  'maximum-number-of-events'?: number
}

type ClientConfig = {
  insecure?: boolean
  ignoreRedirect?: boolean
  timeout?: string
  dnsResolver?: string
  oauth2?: {
    tokenUrl: string
    clientId: string
    clientSecret: string
    scopes: string[]
  }
  identityAwareProxy?: {
    audience: string
  }
  tls?: {
    certificateFile: string
    privateKeyFile: string
    renegotiation: 'never' | 'freely' | 'once'
  }
  network?: 'ip' | 'ip4' | 'ip6'
  tunnel?: string
}

type Endpoint = {
  name: string
  group?: string
  url: string
  method?: string
  conditions: string[]
  interval?: string
  graphql?: boolean
  body?: string
  headers?: Record<string, string>
  dns?: {
    queryType: string
    queryName: string
  }
  ssh?: {
    username: string
    password: string
  }
  alerts?: {
    type: string
    // biome-ignore lint/suspicious/noExplicitAny: <ee>
    [key: string]: any
  }[]
  maintenanceWindows?: {
    start: string // RFC3339 format
    end: string // RFC3339 format
  }[]
  client?: ClientConfig
  ui?: {
    hideConditions?: boolean
    hideHostname?: boolean
    hidePort?: boolean
    hideUrl?: boolean
    hideErrors?: boolean
    dontResolveFailedConditions?: boolean
    resolveSuccessfulConditions?: boolean
    badge?: {
      responseTime?: number[]
    }
  }
  extraLabels?: Record<string, string>
  alwaysRun?: boolean
  store?: Record<string, string>
}

type Announcement = {
  timestamp: string // RFC3339 format
  type: 'outage' | 'warning' | 'information' | 'operational' | 'none'
  message: string
  archived?: boolean
}

export interface Config {
  storage?: StorageConfig
  metrics?: boolean
  alerting?: AlertConfig
  announcements?: Announcement[]
  endpoints?: Endpoint[]
}
