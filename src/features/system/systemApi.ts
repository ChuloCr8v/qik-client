import { baseApi } from '../api/baseApi';

type IntegrationStatus = {
  configured: boolean;
  missing: string[];
};

export type HealthStatus = {
  ok: boolean;
  environment: string;
  productionReady: boolean;
  integrations: {
    api: IntegrationStatus;
    google: IntegrationStatus;
    mail: IntegrationStatus;
    ai: IntegrationStatus;
    stripe: IntegrationStatus;
  };
};

export function isIntegrationConfigured(
  health: HealthStatus | undefined,
  integration: keyof HealthStatus['integrations'],
) {
  return health?.integrations[integration].configured ?? true;
}

export const systemApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getHealth: builder.query<HealthStatus, void>({
      query: () => '/health',
    }),
  }),
});

export const { useGetHealthQuery } = systemApi;
